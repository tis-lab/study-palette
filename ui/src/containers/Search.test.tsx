import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { useConceptSearch } from "../hooks/useConceptSearch";
import type { Term } from "../api/graphql/queries/resolveTerms";

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

// jsdom doesn't implement scrollTo; stub it so page changes don't log errors
const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

const mockedUseConceptSearch = vi.mocked(useConceptSearch);

type SearchResult = ReturnType<typeof useConceptSearch>;
type SearchOptions = Parameters<typeof useConceptSearch>[1];

/** Only the fields Search reads from the response. */
type SearchData = Pick<
  NonNullable<SearchResult["data"]>,
  "items" | "total" | "limit" | "offset"
>;

/** Only the fields Search reads; the rest of UseQueryResult is irrelevant here. */
type SearchState = {
  data: SearchData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
};

const PAGE_SIZE = 20;
const SUGGESTION_LIMIT = 10;
const SUGGESTION_DELAY_MS = 300;

const idle: SearchState = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isError: false,
  error: null,
};

/*
 * Search calls the hook twice per render: once for the results
 * (limit PAGE_SIZE + offset) and once for the autocomplete suggestions
 * (limit SUGGESTION_LIMIT). The mock routes each call by its limit, so
 * results and suggestions can be set up independently.
 */
type Responder = (term: string, options: SearchOptions) => SearchState;

let respondToResults: Responder;
let respondToSuggestions: Responder;

const isSuggestionCall = (options: SearchOptions) =>
  options?.limit === SUGGESTION_LIMIT;

function installMock() {
  mockedUseConceptSearch.mockImplementation(
    (term, options) =>
      // Cast once here instead of faking every UseQueryResult field
      (isSuggestionCall(options)
        ? respondToSuggestions(term, options)
        : respondToResults(term, options)) as unknown as SearchResult,
  );
}

/**
 * Results: returns `state` for any non-empty term and `idle` for "",
 * mirroring a hook that only fetches once something is submitted.
 */
function mockSearch(state: Partial<SearchState>) {
  respondToResults = (term) => (term ? { ...idle, ...state } : idle);
}

/**
 * Results: serves `all` one page at a time, honoring the limit/offset
 * Search passes in, like the real server would.
 */
function mockPagedSearch(all: Term[]) {
  respondToResults = (term, options) => {
    if (!term) return idle;
    const { limit = PAGE_SIZE, offset = 0 } = options ?? {};
    return {
      ...idle,
      data: {
        items: all.slice(offset, offset + limit),
        total: all.length,
        limit,
        offset,
      },
    };
  };
}

/** Suggestions: returns `state` for any non-empty typed text. */
function mockSuggestions(state: Partial<SearchState>) {
  respondToSuggestions = (term) => (term ? { ...idle, ...state } : idle);
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

const makeTerms = (count: number) =>
  Array.from({ length: count }, (_, i) =>
    makeTerm(`C${String(i + 1).padStart(7, "0")}`, `Concept ${i + 1}`),
  );

/** A single-page response containing `items`. */
const resultsOf = (
  items: Term[],
  overrides: Partial<SearchData> = {},
): SearchData => ({
  items,
  total: items.length,
  limit: PAGE_SIZE,
  offset: 0,
  ...overrides,
});

/** A suggestions response containing `items`. */
const suggestionsOf = (items: Term[]): SearchData =>
  resultsOf(items, { limit: SUGGESTION_LIMIT });

const asthma = makeTerm("C0004096", "Asthma");
const childhoodAsthma = makeTerm("C0264408", "Childhood asthma");

// MUI's Autocomplete gives the input role="combobox"
const getInput = () => screen.getByRole("combobox", { name: "Search" });
const getSearchButton = () => screen.getByRole("button", { name: "Search" });
const getStatus = () => screen.getByRole("status");
const queryStatus = () => screen.queryByRole("status");
const queryListbox = () => screen.queryByRole("listbox");
const queryPagination = () =>
  screen.queryByRole("navigation", { name: "pagination navigation" });
const getCardTitles = () =>
  screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

const resultCalls = () =>
  mockedUseConceptSearch.mock.calls.filter(([, o]) => !isSuggestionCall(o));
const suggestionCalls = () =>
  mockedUseConceptSearch.mock.calls.filter(([, o]) => isSuggestionCall(o));
const last = <T,>(list: T[]) => list[list.length - 1];

const lastSearchedTerm = () => last(resultCalls())?.[0];
const lastSearchOptions = () => last(resultCalls())?.[1];
const lastSuggestionTerm = () => last(suggestionCalls())?.[0];
const lastSuggestionOptions = () => last(suggestionCalls())?.[1];
const suggestionTerms = () => new Set(suggestionCalls().map(([term]) => term));

async function searchFor(term: string) {
  const user = userEvent.setup();
  await user.type(getInput(), `${term}{Enter}`);
  return user;
}

/** Types `text` and waits for the debounced suggestions to open. */
async function typeAndWaitForSuggestions(text: string) {
  const user = userEvent.setup();
  await user.type(getInput(), text);
  await screen.findByRole("listbox");
  return user;
}

beforeEach(() => {
  mockedUseConceptSearch.mockReset();
  scrollToSpy.mockClear();
  mockSearch({});
  mockSuggestions({});
  installMock();
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

    it("requests the first page", () => {
      render(<Search />);
      expect(lastSearchOptions()).toEqual({ limit: PAGE_SIZE, offset: 0 });
    });

    it("does not request suggestions", () => {
      render(<Search />);
      expect(lastSuggestionTerm()).toBe("");
    });

    it("shows no progress, summary, results, pagination, or dropdown", () => {
      render(<Search />);
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(queryStatus()).not.toBeInTheDocument();
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
      expect(queryPagination()).not.toBeInTheDocument();
      expect(queryListbox()).not.toBeInTheDocument();
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
      mockSearch({ data: resultsOf([asthma]) });
      render(<Search />);

      await searchFor("asthma");

      expect(getInput()).toHaveValue("asthma");
    });
  });

  describe("autocomplete", () => {
    beforeEach(() =>
      mockSuggestions({ data: suggestionsOf([asthma, childhoodAsthma]) }),
    );

    it(`requests suggestions only after a ${SUGGESTION_DELAY_MS} ms pause`, async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(getInput(), "asthma");

      // Typing is faster than the delay, so nothing has been requested yet
      expect(lastSuggestionTerm()).toBe("");
      await waitFor(() => expect(lastSuggestionTerm()).toBe("asthma"));
    });

    it("requests only the text after the pause, not every keystroke", async () => {
      const user = userEvent.setup();
      render(<Search />);

      await user.type(getInput(), "asthma");
      await waitFor(() => expect(lastSuggestionTerm()).toBe("asthma"));

      expect(suggestionTerms()).toEqual(new Set(["", "asthma"]));
    });

    it(`requests ${SUGGESTION_LIMIT} suggestions`, async () => {
      render(<Search />);

      await typeAndWaitForSuggestions("asth");

      expect(lastSuggestionOptions()).toEqual({ limit: SUGGESTION_LIMIT });
    });

    it("shows each suggestion's label and id", async () => {
      render(<Search />);

      await typeAndWaitForSuggestions("asth");

      const options = within(screen.getByRole("listbox")).getAllByRole(
        "option",
      );
      expect(options).toHaveLength(2);
      expect(options[0]).toHaveTextContent("Asthma");
      expect(options[0]).toHaveTextContent("C0004096");
      expect(options[1]).toHaveTextContent("Childhood asthma");
      expect(options[1]).toHaveTextContent("C0264408");
    });

    it('shows "Searching…" while suggestions load', async () => {
      mockSuggestions({ isFetching: true });
      const user = userEvent.setup();
      render(<Search />);

      await user.type(getInput(), "asth");

      expect(await screen.findByText("Searching…")).toBeInTheDocument();
    });

    it("does not search while suggestions are shown", async () => {
      render(<Search />);

      await typeAndWaitForSuggestions("asth");

      expect(lastSearchedTerm()).toBe("");
      expect(queryStatus()).not.toBeInTheDocument();
    });

    it("does not show an error notification when suggestions fail", async () => {
      mockSuggestions({ isError: true, error: new Error("Suggest failed") });
      const user = userEvent.setup();
      render(<Search />);

      await user.type(getInput(), "asth");
      await waitFor(() => expect(lastSuggestionTerm()).toBe("asth"));

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("selecting a suggestion", () => {
    beforeEach(() =>
      mockSuggestions({ data: suggestionsOf([asthma, childhoodAsthma]) }),
    );

    it("searches for the selected label on click", async () => {
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");

      await user.click(
        screen.getByRole("option", { name: /Childhood asthma/ }),
      );

      expect(lastSearchedTerm()).toBe("Childhood asthma");
      expect(lastSearchOptions()).toEqual({ limit: PAGE_SIZE, offset: 0 });
    });

    it("searches for the highlighted label on Enter", async () => {
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");

      await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

      expect(lastSearchedTerm()).toBe("Childhood asthma");
    });

    it("fills the input with the label and closes the dropdown", async () => {
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");

      await user.click(
        screen.getByRole("option", { name: /Childhood asthma/ }),
      );

      expect(getInput()).toHaveValue("Childhood asthma");
      expect(queryListbox()).not.toBeInTheDocument();
    });

    it("shows the results for the selected label", async () => {
      mockSearch({ data: resultsOf([childhoodAsthma]) });
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");

      await user.click(
        screen.getByRole("option", { name: /Childhood asthma/ }),
      );

      expect(getStatus()).toHaveTextContent(
        'Showing 1–1 of 1 concept matching "Childhood asthma"',
      );
      expect(getCardTitles()).toEqual(["Childhood asthma"]);
    });

    it("does not request suggestions for the selected label", async () => {
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");

      await user.click(
        screen.getByRole("option", { name: /Childhood asthma/ }),
      );
      // Wait past the debounce delay
      await new Promise((r) => setTimeout(r, SUGGESTION_DELAY_MS + 100));

      expect(suggestionTerms()).not.toContain("Childhood asthma");
    });

    it("shows the previous suggestions again when the input is clicked", async () => {
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");
      await user.click(
        screen.getByRole("option", { name: /Childhood asthma/ }),
      );
      await user.click(document.body);

      await user.click(getInput());

      expect(
        screen.getByRole("option", { name: /Childhood asthma/ }),
      ).toBeInTheDocument();
      expect(lastSuggestionTerm()).toBe("asth");
    });

    it("returns to page 1", async () => {
      mockPagedSearch(makeTerms(45));
      render(<Search />);
      const user = await searchFor("concept");
      await user.click(screen.getByRole("button", { name: "Go to page 2" }));

      await user.clear(getInput());
      await user.type(getInput(), "asth");
      await user.click(await screen.findByRole("option", { name: /^Asthma/ }));

      expect(lastSearchedTerm()).toBe("Asthma");
      expect(lastSearchOptions()).toEqual({ limit: PAGE_SIZE, offset: 0 });
    });
  });

  describe("without selecting a suggestion", () => {
    beforeEach(() =>
      mockSuggestions({ data: suggestionsOf([asthma, childhoodAsthma]) }),
    );

    it("searches the typed text, not a suggestion, when Search is clicked", async () => {
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");

      await user.click(getSearchButton());

      expect(lastSearchedTerm()).toBe("asth");
      expect(getInput()).toHaveValue("asth");
      expect(queryListbox()).not.toBeInTheDocument();
    });

    it("searches the typed text on Enter when nothing is highlighted", async () => {
      render(<Search />);
      const user = await typeAndWaitForSuggestions("asth");

      await user.keyboard("{Enter}");

      expect(lastSearchedTerm()).toBe("asth");
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

    it("hides the summary, results, and pagination", async () => {
      render(<Search />);
      await searchFor("asthma");

      expect(queryStatus()).not.toBeInTheDocument();
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
      expect(queryPagination()).not.toBeInTheDocument();
    });
  });

  describe("results", () => {
    it("shows a plural summary and one card per result, in order", async () => {
      mockSearch({ data: resultsOf([asthma, childhoodAsthma]) });
      render(<Search />);

      await searchFor("asthma");

      expect(getStatus()).toHaveTextContent(
        'Showing 1–2 of 2 concepts matching "asthma"',
      );
      expect(getCardTitles()).toEqual(["Asthma", "Childhood asthma"]);
    });

    it("uses the singular for one result", async () => {
      mockSearch({ data: resultsOf([asthma]) });
      render(<Search />);

      await searchFor("asthma");

      expect(getStatus()).toHaveTextContent(
        'Showing 1–1 of 1 concept matching "asthma"',
      );
    });

    it("formats large totals with thousands separators", async () => {
      mockSearch({ data: resultsOf(makeTerms(PAGE_SIZE), { total: 3531 }) });
      render(<Search />);

      await searchFor("hyper");

      expect(getStatus()).toHaveTextContent(
        'Showing 1–20 of 3,531 concepts matching "hyper"',
      );
    });

    it("emphasizes the searched term", async () => {
      mockSearch({ data: resultsOf([asthma]) });
      render(<Search />);

      await searchFor("asthma");

      const strong = within(getStatus()).getByText('"asthma"');
      expect(strong.tagName).toBe("STRONG");
    });

    it("exposes the summary as a polite live region", async () => {
      mockSearch({ data: resultsOf([asthma]) });
      render(<Search />);

      await searchFor("asthma");

      expect(getStatus()).toHaveAttribute("aria-live", "polite");
    });

    it("shows the submitted term, not what is currently typed", async () => {
      mockSearch({ data: resultsOf([asthma]) });
      render(<Search />);
      const user = await searchFor("asthma");

      await user.type(getInput(), " attack");

      expect(getStatus()).toHaveTextContent('matching "asthma"');
      expect(getStatus()).not.toHaveTextContent("attack");
    });

    it("hides the progress indicator", async () => {
      mockSearch({ data: resultsOf([asthma]) });
      render(<Search />);

      await searchFor("asthma");

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  describe("no results", () => {
    it("shows an empty-state message", async () => {
      mockSearch({ data: resultsOf([]) });
      render(<Search />);

      await searchFor("zzzz");

      expect(getStatus()).toHaveTextContent(
        'No concepts match "zzzz". Try a different term.',
      );
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
      expect(queryPagination()).not.toBeInTheDocument();
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

    it("does not show the summary or empty-state message on error", async () => {
      render(<Search />);
      await searchFor("asthma");

      expect(queryStatus()).not.toBeInTheDocument();
    });

    it("does not show a notification before an error", () => {
      mockSearch({});
      render(<Search />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("pagination", () => {
    it("is hidden when all results fit on one page", async () => {
      mockPagedSearch(makeTerms(PAGE_SIZE));
      render(<Search />);

      await searchFor("concept");

      expect(queryPagination()).not.toBeInTheDocument();
    });

    it("shows one button per page, starting on page 1", async () => {
      mockPagedSearch(makeTerms(45)); // 3 pages
      render(<Search />);

      await searchFor("concept");

      expect(queryPagination()).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "page 1" })).toHaveAttribute(
        "aria-current",
      );
      expect(
        screen.getByRole("button", { name: "Go to page 3" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Go to page 4" }),
      ).not.toBeInTheDocument();
    });

    it("requests the selected page's offset", async () => {
      mockPagedSearch(makeTerms(45));
      render(<Search />);
      const user = await searchFor("concept");

      await user.click(screen.getByRole("button", { name: "Go to page 2" }));

      expect(lastSearchedTerm()).toBe("concept");
      expect(lastSearchOptions()).toEqual({ limit: PAGE_SIZE, offset: 20 });
    });

    it("shows the range and results for the current page", async () => {
      mockPagedSearch(makeTerms(45));
      render(<Search />);
      const user = await searchFor("concept");

      await user.click(screen.getByRole("button", { name: "Go to page 2" }));

      expect(getStatus()).toHaveTextContent(
        'Showing 21–40 of 45 concepts matching "concept"',
      );
      const titles = getCardTitles();
      expect(titles).toHaveLength(20);
      expect(titles[0]).toBe("Concept 21");
      expect(titles[19]).toBe("Concept 40");
    });

    it("shows a partial range on the last page", async () => {
      mockPagedSearch(makeTerms(45));
      render(<Search />);
      const user = await searchFor("concept");

      await user.click(screen.getByRole("button", { name: "Go to page 3" }));

      expect(getStatus()).toHaveTextContent("Showing 41–45 of 45 concepts");
      expect(getCardTitles()).toHaveLength(5);
    });

    it("marks the selected page as current", async () => {
      mockPagedSearch(makeTerms(45));
      render(<Search />);
      const user = await searchFor("concept");

      await user.click(screen.getByRole("button", { name: "Go to page 2" }));

      expect(screen.getByRole("button", { name: "page 2" })).toHaveAttribute(
        "aria-current",
      );
    });

    it("scrolls back to the top on page change", async () => {
      mockPagedSearch(makeTerms(45));
      render(<Search />);
      const user = await searchFor("concept");

      await user.click(screen.getByRole("button", { name: "Go to page 2" }));

      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });

    it("returns to page 1 on a new search", async () => {
      mockPagedSearch(makeTerms(45));
      render(<Search />);
      const user = await searchFor("concept");
      await user.click(screen.getByRole("button", { name: "Go to page 2" }));

      await user.clear(getInput());
      await user.type(getInput(), "asthma{Enter}");

      expect(lastSearchedTerm()).toBe("asthma");
      expect(lastSearchOptions()).toEqual({ limit: PAGE_SIZE, offset: 0 });
      expect(screen.getByRole("button", { name: "page 1" })).toHaveAttribute(
        "aria-current",
      );

      // The new term must never be requested with the old page's offset
      const asthmaCalls = resultCalls().filter(([term]) => term === "asthma");
      expect(asthmaCalls.every(([, options]) => options?.offset === 0)).toBe(
        true,
      );
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
      const [firstInput, secondInput] = screen.getAllByRole("combobox");
      const [, secondButton] = screen.getAllByRole("button", {
        name: "Search",
      });

      await user.type(firstInput, "first");
      await user.type(secondInput, "second");
      await user.click(secondButton);

      const searchedTerms = resultCalls().map(([term]) => term);
      expect(searchedTerms).toContain("second");
      expect(searchedTerms).not.toContain("first");
    });
  });
});
