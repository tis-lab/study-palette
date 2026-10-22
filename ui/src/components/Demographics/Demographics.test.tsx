import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Demographics from "./Demographics";
import { t2dFemaleSummary, t2dSummary } from "../../mocks/SYNTHETIC.cohortSummary";

// test-setup.ts stubs ECharts to list each bar as "name: value"

describe("Demographics", () => {
  it("shows an empty state, with no tabs, before there is a cohort", () => {
    render(<Demographics />);

    expect(
      screen.getByRole("region", { name: "Demographics" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Add criteria to view demographics")).toBeInTheDocument();
    expect(screen.queryByRole("tab")).toBeNull();
  });

  it("is a labelled panel with the cohort size and study count", () => {
    render(<Demographics summary={t2dSummary} />);

    expect(
      screen.getByRole("region", { name: "Demographics" }),
    ).toBeInTheDocument();
    expect(screen.getByText("940 participants · 2 studies")).toBeInTheDocument();
  });

  it("shows sex by default", () => {
    render(<Demographics summary={t2dSummary} />);

    expect(screen.getByRole("tab", { name: "Sex" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Female: 480")).toBeInTheDocument();
    expect(screen.getByText("Male: 450")).toBeInTheDocument();
    expect(screen.getByText("Not reported: 10")).toBeInTheDocument();
  });

  it("switches to race and ethnicity", async () => {
    const user = userEvent.setup();
    render(<Demographics summary={t2dSummary} />);

    await user.click(screen.getByRole("tab", { name: "Race" }));
    expect(screen.getByText("White: 510")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Ethnicity" }));
    expect(screen.getByText("Hispanic or Latino: 140")).toBeInTheDocument();
  });

  it("says so when the cohort has no data for a breakdown", async () => {
    const user = userEvent.setup();
    render(<Demographics summary={t2dFemaleSummary} />);

    await user.click(screen.getByRole("tab", { name: "Ethnicity" }));

    expect(screen.getByText("Not reported for this cohort.")).toBeInTheDocument();
  });
});
