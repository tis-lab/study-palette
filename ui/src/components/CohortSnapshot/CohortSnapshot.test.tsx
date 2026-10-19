import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CohortSnapshot from "./CohortSnapshot";
import { t2dFemaleSummary, t2dSummary } from "../../mocks/SYNTHETIC.cohortSummary";

// jsdom has no canvas for ECharts to draw on; the stand-in exposes the slices
vi.mock("echarts-for-react", () => ({
  default: ({
    option,
  }: {
    option: { series: { data: { name: string; value: number }[] }[] };
  }) => (
    <ul aria-label="donut">
      {option.series[0].data.map((d) => (
        <li key={d.name}>{`${d.name}: ${d.value}`}</li>
      ))}
    </ul>
  ),
}));

const AVAILABLE = 5000;

describe("CohortSnapshot", () => {
  it("is a labelled panel with its subtitle", () => {
    render(<CohortSnapshot availableParticipants={AVAILABLE} />);

    expect(
      screen.getByRole("complementary", { name: "Cohort Snapshot" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Based on current cohort")).toBeInTheDocument();
  });

  it("asks for criteria before there is a summary", () => {
    render(<CohortSnapshot availableParticipants={AVAILABLE} />);

    expect(
      screen.getByText("Include or exclude concepts to see your cohort."),
    ).toBeInTheDocument();
  });

  it("shows a progress indicator while loading", () => {
    render(<CohortSnapshot availableParticipants={AVAILABLE} isLoading />);

    expect(
      screen.getByRole("progressbar", { name: "Loading cohort snapshot" }),
    ).toBeInTheDocument();
  });

  it("shows the participants summed across studies, out of those available", () => {
    render(<CohortSnapshot summary={t2dSummary} availableParticipants={AVAILABLE} />);

    // 480 + 460 in the type 2 diabetes example
    expect(screen.getByText("940")).toBeInTheDocument();
    expect(screen.getByText("Estimated Participants")).toBeInTheDocument();
    expect(screen.getByText("of 5,000 available")).toBeInTheDocument();
  });

  it("draws the cohort against the rest of those available", () => {
    render(<CohortSnapshot summary={t2dSummary} availableParticipants={AVAILABLE} />);

    expect(screen.getByText("In cohort: 940")).toBeInTheDocument();
    expect(screen.getByText("Not in cohort: 4060")).toBeInTheDocument();
  });

  it("shows the number of studies in the response", () => {
    render(<CohortSnapshot summary={t2dSummary} availableParticipants={AVAILABLE} />);

    expect(screen.getByText("Studies:").textContent).toBe("Studies: 2");
  });

  it("notes that the count is an estimate", () => {
    render(<CohortSnapshot summary={t2dSummary} availableParticipants={AVAILABLE} />);

    expect(
      screen.getByText("Participant count is estimated until query is executed"),
    ).toBeInTheDocument();
  });

  it("updates when the summary narrows", () => {
    const { rerender } = render(
      <CohortSnapshot summary={t2dSummary} availableParticipants={AVAILABLE} />,
    );

    rerender(
      <CohortSnapshot summary={t2dFemaleSummary} availableParticipants={AVAILABLE} />,
    );

    // 230 + 250 in the female follow-up
    expect(screen.getByText("480")).toBeInTheDocument();
  });
});
