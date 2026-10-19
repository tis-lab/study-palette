import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CohortBuilder from "./CohortBuilder";

vi.mock("./Search", () => ({
  default: () => <div data-testid="search" />,
}));

describe("CohortBuilder", () => {
  it("renders the search and the cohort snapshot side by side", () => {
    render(<CohortBuilder />);

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "Cohort Snapshot" }),
    ).toBeInTheDocument();
  });
});
