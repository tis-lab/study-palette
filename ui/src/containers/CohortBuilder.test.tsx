import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    </div>
  ),
}));

const querySection = (name: "Include" | "Exclude") =>
  screen.queryByRole("region", { name });

describe("CohortBuilder", () => {
  it("renders the search and the cohort snapshot", () => {
    render(<CohortBuilder />);

    expect(screen.getByRole("button", { name: "include result" })).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "Cohort Snapshot" }),
    ).toBeInTheDocument();
  });

  it("shows no Include or Exclude section before anything is added", () => {
    render(<CohortBuilder />);

    expect(querySection("Include")).toBeNull();
    expect(querySection("Exclude")).toBeNull();
  });

  it("adds an included concept to the Include section only", async () => {
    const user = userEvent.setup();
    render(<CohortBuilder />);

    await user.click(screen.getByRole("button", { name: "include result" }));

    expect(within(querySection("Include")!).getByText("Hypertension")).toBeInTheDocument();
    expect(querySection("Exclude")).toBeNull();
  });

  it("does not add the same concept twice", async () => {
    const user = userEvent.setup();
    render(<CohortBuilder />);

    await user.click(screen.getByRole("button", { name: "include result" }));
    await user.click(screen.getByRole("button", { name: "include result" }));

    expect(within(querySection("Include")!).getAllByText("Hypertension")).toHaveLength(1);
  });

  it("moves a concept when it is excluded after being included", async () => {
    const user = userEvent.setup();
    render(<CohortBuilder />);

    await user.click(screen.getByRole("button", { name: "include result" }));
    await user.click(screen.getByRole("button", { name: "exclude result" }));

    expect(querySection("Include")).toBeNull();
    expect(within(querySection("Exclude")!).getByText("Hypertension")).toBeInTheDocument();
  });

  it("removes a concept, hiding the section once it is empty", async () => {
    const user = userEvent.setup();
    render(<CohortBuilder />);

    await user.click(screen.getByRole("button", { name: "include result" }));
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(querySection("Include")).toBeNull();
  });
});
