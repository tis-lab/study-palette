import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import CohortBuilder from "./CohortBuilder";
import type { SearchItem } from "../api/graphql/queries/resolveTerms";

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

// jsdom has no canvas for ECharts to draw on
vi.mock("echarts-for-react", () => ({ default: () => null }));

// Search is covered by its own tests; here it only needs to report clicks
vi.mock("./Search", () => ({
  default: ({
    onInclude,
    onExclude,
  }: {
    onInclude: (item: SearchItem) => void;
    onExclude: (item: SearchItem) => void;
  }) => (
    <div>
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
      screen.getByRole("complementary", { name: "Cohort Snapshot" }),
    ).toBeInTheDocument();
  });

  it("shows no Include or Exclude section before anything is added", () => {
    renderBuilder();

    expect(querySection("Include")).toBeNull();
    expect(querySection("Exclude")).toBeNull();
  });

  it("adds an included concept to the Include section only", async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.click(screen.getByRole("button", { name: "include result" }));

    expect(within(querySection("Include")!).getByText("Hypertension")).toBeInTheDocument();
    expect(querySection("Exclude")).toBeNull();
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

    expect(querySection("Include")).toBeNull();
    expect(within(querySection("Exclude")!).getByText("Hypertension")).toBeInTheDocument();
  });

  it("removes a concept, hiding the section once it is empty", async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.click(screen.getByRole("button", { name: "include result" }));
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(querySection("Include")).toBeNull();
  });

  describe("cohort snapshot", () => {
    it("asks for criteria before any are added", () => {
      renderBuilder();

      expect(
        screen.getByText("Include or exclude concepts to see your cohort."),
      ).toBeInTheDocument();
    });

    it("shows the summary once a concept is added, and narrows with more", async () => {
      const user = userEvent.setup();
      renderBuilder();

      await user.click(screen.getByRole("button", { name: "include result" }));
      expect(await screen.findByText("940")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "include other result" }));
      expect(await screen.findByText("480")).toBeInTheDocument();
    });
  });
});
