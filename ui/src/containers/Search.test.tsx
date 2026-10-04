import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { useConceptSearch } from "../hooks/useConceptSearch";
import { Term } from "../api/graphql/queries/resolveTerms";

// ----------------------------------------------------------------------

/* Mocks */

vi.mock("../hooks/useConceptSearch", () => ({
  useConceptSearch: vi.fn(),
}));

// Stub so these tests don't depend on Notification's internals
vi.mock("../components/Notification", () => ({
  default: ({
    open,
    severity,
    message,
  }: {
    open: boolean;
    severity: string;
    message?: string;
  }) =>
    open ? (
      <div role="alert" data-severity={severity}>
        {message}
      </div>
    ) : null,
}));

const mockedUseConceptSearch = vi.mocked(useConceptSearch);

type SearchResult = ReturnType<typeof useConceptSearch>;

/** Only the fields Search reads; the rest of UseQueryResult is irrelevant here. */
type SearchState = {
  data: Pick<NonNullable<SearchResult["data"]>, "items"> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

const idle: SearchState = {
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
};

/**
 * Returns `state` for any non-empty term and `idle` for "",
 * mirroring a hook that only fetches once something is submitted.
 */
function mockSearch(state: Partial<SearchState>) {
  mockedUseConceptSearch.mockImplementation(
    (term: string) =>
      // Cast once here instead of faking every UseQueryResult field
      (term ? { ...idle, ...state } : idle) as unknown as SearchResult,
  );
}

// ----------------------------------------------------------------------

/* Fixtures & helpers */

const makeTerm = (id: string, label: string): Term => ({
  id,
  label,
  category: "Disease or Syndrome",
  description: null,
  synonyms: null,
});

const asthma = makeTerm("C0004096", "Asthma");
const childhoodAsthma = makeTerm("C0264408", "Childhood asthma");

const getInput = () => screen.getByRole("searchbox", { name: "Search" });
const getSearchButton = () => screen.getByRole("button", { name: "Search" });
const getStatus = () => screen.getByRole("status");
const lastSearchedTerm = () => mockedUseConceptSearch.mock.lastCall?.[0];

async function searchFor(term: string) {
  const user = userEvent.setup();
  await user.type(getInput(), `${term}{Enter}`);
  return user;
}

beforeEach(() => {
  mockedUseConceptSearch.mockReset();
  mockSearch({});
});

// ----------------------------------------------------------------------

describe("Search", () => {
  describe("initial state", () => {
    it("renders the search box and Search button", () => {
      render(<Search />);
      expect(getInput()).toBeInTheDocument();
      expect(getSearchButton()).toBeInTheDocument();
    });

    it("does not search before anything is submitted", () => {
      render(<Search />);
      expect(lastSearchedTerm()).toBe("");
    });

    it("shows no progress, summary, or results", () => {
      render(<Search />);
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(getStatus()).toBeEmptyDOMElement();
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("keeps the status live region mounted even when empty", () => {
      render(<Search />);
      expect(getStatus()).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("submitting", () => {
    it("does not search while typing", async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(getInput(), "asthma");

      expect(lastSearchedTerm()).toBe("");
    });

    it("searches with the trimmed term on Enter", async () => {
      render(<Search />);

      await searchFor("  asthma  ");

      expect(lastSearchedTerm()).toBe("asthma");
    });

    it("searches when the Search button is clicked", async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(getInput(), "asthma");
      await user.click(getSearchButton());

      expect(lastSearchedTerm()).toBe("asthma");
    });

    it("links the Search button to the search form", () => {
      render(<Search />);
      const formId = screen.getByRole("search").getAttribute("id");
      expect(formId).toBeTruthy();
      expect(getSearchButton()).toHaveAttribute("form", formId);
    });

    it("keeps the typed value after searching", async () => {
      mockSearch({ data: { items: [asthma] } });
      render(<Search />);

      await searchFor("asthma");

      expect(getInput()).toHaveValue("asthma");
    });
  });

  describe("loading", () => {
    beforeEach(() => mockSearch({ isLoading: true }));

    it("shows an accessible progress indicator", async () => {
      render(<Search />);
      await searchFor("asthma");

      expect(
        screen.getByRole("progressbar", { name: "Searching concepts" }),
      ).toBeInTheDocument();
    });

    it("keeps the search controls mounted, enabled, and focused", async () => {
      render(<Search />);
      await searchFor("asthma");

      expect(getInput()).toHaveValue("asthma");
      expect(getInput()).toBeEnabled();
      expect(getInput()).toHaveFocus();
      expect(getSearchButton()).toBeInTheDocument();
    });

    it("hides the summary and results", async () => {
      render(<Search />);
      await searchFor("asthma");

      expect(getStatus()).toBeEmptyDOMElement();
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
  });

  describe("results", () => {
    it("shows a plural summary and one card per result, in order", async () => {
      mockSearch({ data: { items: [asthma, childhoodAsthma] } });
      render(<Search />);

      await searchFor("asthma");

      expect(getStatus()).toHaveTextContent(
        'Showing 2 concepts matching "asthma"',
      );
      const headings = screen
        .getAllByRole("heading", { level: 2 })
        .map((h) => h.textContent);
      expect(headings).toEqual(["Asthma", "Childhood asthma"]);
    });

    it("uses the singular for one result", async () => {
      mockSearch({ data: { items: [asthma] } });
      render(<Search />);

      await searchFor("asthma");

      expect(getStatus()).toHaveTextContent(
        'Showing 1 concept matching "asthma"',
      );
    });

    it("emphasizes the searched term", async () => {
      mockSearch({ data: { items: [asthma] } });
      render(<Search />);

      await searchFor("asthma");

      const strong = within(getStatus()).getByText('"asthma"');
      expect(strong.tagName).toBe("STRONG");
    });

    it("shows the submitted term, not what is currently typed", async () => {
      mockSearch({ data: { items: [asthma] } });
      render(<Search />);
      const user = await searchFor("asthma");

      await user.type(getInput(), " attack");

      expect(getStatus()).toHaveTextContent('matching "asthma"');
      expect(getStatus()).not.toHaveTextContent("attack");
    });

    it("hides the progress indicator", async () => {
      mockSearch({ data: { items: [asthma] } });
      render(<Search />);

      await searchFor("asthma");

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  describe("no results", () => {
    it("shows an empty-state message", async () => {
      mockSearch({ data: { items: [] } });
      render(<Search />);

      await searchFor("zzzz");

      expect(getStatus()).toHaveTextContent(
        'No concepts match "zzzz". Try a different term.',
      );
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("treats missing data the same as an empty list", async () => {
      mockSearch({ data: undefined });
      render(<Search />);

      await searchFor("zzzz");

      expect(getStatus()).toHaveTextContent('No concepts match "zzzz"');
    });
  });

  describe("error", () => {
    beforeEach(() =>
      mockSearch({ isError: true, error: new Error("Network down") }),
    );

    it("opens an error notification with the error message", async () => {
      render(<Search />);
      await searchFor("asthma");

      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Network down");
      expect(alert).toHaveAttribute("data-severity", "error");
    });

    it("does not show the empty-state message on error", async () => {
      render(<Search />);
      await searchFor("asthma");

      expect(getStatus()).toBeEmptyDOMElement();
    });

    it("does not show a notification before an error", () => {
      mockSearch({});
      render(<Search />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("multiple instances", () => {
    it("gives each instance its own form id", () => {
      render(
        <>
          <Search />
          <Search />
        </>,
      );
      const ids = screen
        .getAllByRole("search")
        .map((form) => form.getAttribute("id"));
      expect(new Set(ids).size).toBe(2);
    });

    it("each Search button submits only its own form", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Search />
          <Search />
        </>,
      );
      const [firstInput, secondInput] = screen.getAllByRole("searchbox");
      const [, secondButton] = screen.getAllByRole("button", {
        name: "Search",
      });

      await user.type(firstInput, "first");
      await user.type(secondInput, "second");
      await user.click(secondButton);

      const searchedTerms = mockedUseConceptSearch.mock.calls.map(
        ([term]) => term,
      );
      expect(searchedTerms).toContain("second");
      expect(searchedTerms).not.toContain("first");
    });
  });
});
