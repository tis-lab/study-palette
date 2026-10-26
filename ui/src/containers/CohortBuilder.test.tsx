import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import CohortBuilder from "./CohortBuilder";
import type { SearchItem } from "../api/graphql/queries/resolveTerms";
import { AVAILABLE_PARTICIPANTS_PLACEHOLDER } from "../mocks/SYNTHETIC.cohortSummary";

const AVAILABLE = AVAILABLE_PARTICIPANTS_PLACEHOLDER.toLocaleString();

const hypertension: SearchItem = {
  __typename: "Term",
  id: "HP:0000822",
  label: "Hypertension",
  category: "biolink:PhenotypicFeature",
  description: null,
  synonyms: null,
  bdc: { studyCount: 0, studies: [], variableNames: [] },
};

const diabetes: SearchItem = { ...hypertension, id: "MONDO:0005148", label: "Diabetes" };

// Search has its own tests; this stub only reports clicks
vi.mock("./Search", () => ({
  default: ({
    onSearch,
    onInclude,
    onExclude,
  }: {
    onSearch: (text: string) => void;
    onInclude: (item: SearchItem) => void;
    onExclude: (item: SearchItem) => void;
  }) => (
    <div>
      <button onClick={() => onSearch("hypertension")}>search</button>
      <button onClick={() => onInclude(hypertension)}>include result</button>
      <button onClick={() => onExclude(hypertension)}>exclude result</button>
      <button onClick={() => onInclude(diabetes)}>include other result</button>
    </div>
  ),
}));

function renderBuilder() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <CohortBuilder />
    </QueryClientProvider>,
  );
}

const querySection = (name: "Include" | "Exclude") =>
  screen.queryByRole("region", { name });

describe("CohortBuilder", () => {
  it("renders the search and the cohort snapshot", () => {
    renderBuilder();

    expect(screen.getByRole("button", { name: "include result" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Cohort Snapshot" }),
    ).toBeInTheDocument();
  });

  it("shows one empty state, without Include and Exclude, before anything is added", () => {
    renderBuilder();

    const criteria = screen.getByRole("region", { name: "Cohort Criteria" });
    expect(criteria).toHaveTextContent("0 criteria");
    expect(within(criteria).getByText("No criteria added yet")).toBeInTheDocument();
    expect(querySection("Include")).toBeNull();
    expect(querySection("Exclude")).toBeNull();
  });

  it("adds an included concept to the Include section only", async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.click(screen.getByRole("button", { name: "include result" }));

    expect(within(querySection("Include")!).getByText("Hypertension")).toBeInTheDocument();
    expect(within(querySection("Exclude")!).getByText("No exclusion criteria added"))
      .toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Cohort Criteria" })).toHaveTextContent(
      "1 criterion",
    );
  });

  it("does not add the same concept twice", async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.click(screen.getByRole("button", { name: "include result" }));
    await user.click(screen.getByRole("button", { name: "include result" }));

    expect(within(querySection("Include")!).getAllByText("Hypertension")).toHaveLength(1);
  });

  it("moves a concept when it is excluded after being included", async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.click(screen.getByRole("button", { name: "include result" }));
    await user.click(screen.getByRole("button", { name: "exclude result" }));

    expect(within(querySection("Include")!).getByText("No inclusion criteria added"))
      .toBeInTheDocument();
    expect(within(querySection("Exclude")!).getByText("Hypertension")).toBeInTheDocument();
  });

  it("removes a concept, showing the empty state again", async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.click(screen.getByRole("button", { name: "include result" }));
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.getByText("No criteria added yet")).toBeInTheDocument();
    expect(querySection("Include")).toBeNull();
  });

  describe("cohort snapshot", () => {
    it("starts with everyone available, then narrows with each criterion", async () => {
      const user = userEvent.setup();
      renderBuilder();

      expect(screen.getByText(AVAILABLE)).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "include result" }));
      expect(await screen.findByText("940")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "include other result" }));
      expect(await screen.findByText("480")).toBeInTheDocument();
    });

    it("narrows on a search, then further with each criterion", async () => {
      const user = userEvent.setup();
      renderBuilder();

      await user.click(screen.getByRole("button", { name: "search" }));
      expect(await screen.findByText("940")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "include result" }));
      expect(await screen.findByText("480")).toBeInTheDocument();
    });

    it("shows the demographics empty state until there is a summary", async () => {
      const user = userEvent.setup();
      renderBuilder();

      expect(screen.getByText("Add criteria to view demographics")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "search" }));
      expect(await screen.findByText("940 participants · 2 studies")).toBeInTheDocument();
      expect(screen.queryByText("Add criteria to view demographics")).toBeNull();
    });

    it("returns to everyone available once all criteria are removed", async () => {
      const user = userEvent.setup();
      renderBuilder();

      await user.click(screen.getByRole("button", { name: "include result" }));
      expect(await screen.findByText("940")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Remove" }));
      expect(await screen.findByText(AVAILABLE)).toBeInTheDocument();
    });
  });
});
