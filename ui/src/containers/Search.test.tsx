import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FormEvent } from "react";
import Search from "./Search";
import { useConceptSearch } from "../hooks/useConceptSearch";

// ----------------------------------------------------------------------
// Mocks: Search is tested on its own, so its children are replaced with
// minimal stand-ins that expose the props Search passes to them.

vi.mock("../hooks/useConceptSearch", () => ({
  useConceptSearch: vi.fn(),
}));

vi.mock("../components/Searchbar", () => ({
  default: ({
    id,
    name,
    value,
    onChange,
    onSearch,
  }: {
    id: string;
    name: string;
    value: string;
    onChange: (v: string) => void;
    onSearch: (v: string) => void;
  }) => (
    <form
      id={id}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSearch(value);
      }}
    >
      <input
        aria-label="Search concepts"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  ),
}));

vi.mock("../components/Button", () => ({
  PrimaryButton: ({
    children,
    formId,
  }: {
    children: React.ReactNode;
    formId?: string;
  }) => (
    <button type="submit" form={formId}>
      {children}
    </button>
  ),
}));

vi.mock("../components/ConceptCard", () => ({
  default: ({
    concept,
    isFirst,
    isLast,
  }: {
    concept: { id: string; label: string };
    isFirst: boolean;
    isLast: boolean;
  }) => (
    <div
      data-testid="concept-card"
      data-first={String(isFirst)}
      data-last={String(isLast)}
    >
      {concept.label}
    </div>
  ),
}));

vi.mock("../components/Notification", () => ({
  default: ({ open, message }: { open: boolean; message?: string }) =>
    open ? <div role="alert">{message}</div> : null,
}));

// ----------------------------------------------------------------------

type HookResult = ReturnType<typeof useConceptSearch>;
const mockedHook = vi.mocked(useConceptSearch);

const idle = {
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
} as unknown as HookResult;

const withResults = (items: { id: string; label: string }[]) =>
  ({ ...idle, data: { items } }) as unknown as HookResult;

const ITEMS = [
  { id: "HP:0000822", label: "Hypertension" },
  { id: "MONDO:0001134", label: "Essential hypertension" },
  { id: "MONDO:0005152", label: "Secondary hypertension" },
];

const input = () => screen.getByRole("textbox", { name: "Search concepts" });
const searchButton = () => screen.getByRole("button", { name: "Search" });

// Returns results only once something has been submitted, like the real hook.
const resultsAfterSubmit = (items = ITEMS) =>
  mockedHook.mockImplementation((q: string) => (q ? withResults(items) : idle));

// ----------------------------------------------------------------------

describe("Search", () => {
  beforeEach(() => {
    mockedHook.mockReset();
    mockedHook.mockReturnValue(idle);
  });

  afterEach(() => {
    cleanup();
  });

  describe("searching", () => {
    it("starts with an empty query", () => {
      render(<Search />);

      expect(input()).toHaveValue("");
      expect(mockedHook).toHaveBeenLastCalledWith("");
    });

    it("updates the input as the user types without searching", async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hyp");

      expect(input()).toHaveValue("hyp");
      expect(mockedHook).not.toHaveBeenCalledWith("hyp");
      expect(mockedHook).toHaveBeenLastCalledWith("");
    });

    it("searches when Enter is pressed", async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hypertension{Enter}");

      expect(mockedHook).toHaveBeenLastCalledWith("hypertension");
    });

    it("searches when the Search button is clicked", async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hypertension");
      await user.click(searchButton());

      expect(mockedHook).toHaveBeenLastCalledWith("hypertension");
    });

    it("searches with the latest value on a second search", async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hyp{Enter}");
      await user.clear(input());
      await user.type(input(), "diabetes{Enter}");

      expect(mockedHook).toHaveBeenLastCalledWith("diabetes");
    });
  });

  describe("loading", () => {
    it("shows a loading message in place of the search bar", () => {
      mockedHook.mockReturnValue({ ...idle, isLoading: true } as HookResult);
      render(<Search />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(
        screen.queryByRole("textbox", { name: "Search concepts" }),
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("concept-card")).not.toBeInTheDocument();
    });

    it("keeps the typed value after loading finishes", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Search />);
      await user.type(input(), "hyp");

      mockedHook.mockReturnValue({ ...idle, isLoading: true } as HookResult);
      rerender(<Search />);
      mockedHook.mockReturnValue(idle);
      rerender(<Search />);

      expect(input()).toHaveValue("hyp");
    });
  });

  describe("results", () => {
    it("shows no results before searching", () => {
      render(<Search />);

      expect(screen.queryByTestId("concept-card")).not.toBeInTheDocument();
      expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
    });

    it("shows a card for each concept", async () => {
      resultsAfterSubmit();
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hypertension{Enter}");

      const cards = screen.getAllByTestId("concept-card");
      expect(cards).toHaveLength(3);
      expect(cards.map((c) => c.textContent)).toEqual([
        "Hypertension",
        "Essential hypertension",
        "Secondary hypertension",
      ]);
    });

    it("shows the result count and the submitted query", async () => {
      resultsAfterSubmit();
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hypertension{Enter}");

      expect(screen.getByText(/Showing 3 concepts matching/)).toHaveTextContent(
        'Showing 3 concepts matching "hypertension"',
      );
    });

    it("keeps the summary on the submitted query while the user keeps typing", async () => {
      resultsAfterSubmit();
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hypertension{Enter}");
      await user.type(input(), " type 2");

      expect(screen.getByText(/Showing/)).toHaveTextContent('"hypertension"');
    });

    it("marks only the first and last cards for rounded corners", async () => {
      resultsAfterSubmit();
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hypertension{Enter}");

      const [first, middle, last] = screen.getAllByTestId("concept-card");
      expect(first).toHaveAttribute("data-first", "true");
      expect(first).toHaveAttribute("data-last", "false");
      expect(middle).toHaveAttribute("data-first", "false");
      expect(middle).toHaveAttribute("data-last", "false");
      expect(last).toHaveAttribute("data-first", "false");
      expect(last).toHaveAttribute("data-last", "true");
    });

    it("marks a single result as both first and last", async () => {
      resultsAfterSubmit([ITEMS[0]]);
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "hypertension{Enter}");

      const card = screen.getByTestId("concept-card");
      expect(card).toHaveAttribute("data-first", "true");
      expect(card).toHaveAttribute("data-last", "true");
    });

    it("shows no summary or cards when nothing matches", async () => {
      resultsAfterSubmit([]);
      const user = userEvent.setup();
      render(<Search />);

      await user.type(input(), "zzz{Enter}");

      expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
      expect(screen.queryByTestId("concept-card")).not.toBeInTheDocument();
    });
  });

  describe("errors", () => {
    it("does not show a notification when there is no error", () => {
      render(<Search />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("shows the error message in a notification", () => {
      mockedHook.mockReturnValue({
        ...idle,
        isError: true,
        error: new Error("Network request failed"),
      } as HookResult);
      render(<Search />);

      expect(screen.getByRole("alert")).toHaveTextContent(
        "Network request failed",
      );
    });

    it("still shows the search bar so the user can retry", () => {
      mockedHook.mockReturnValue({
        ...idle,
        isError: true,
        error: new Error("Network request failed"),
      } as HookResult);
      render(<Search />);

      expect(input()).toBeInTheDocument();
      expect(searchButton()).toBeInTheDocument();
    });
  });
});
