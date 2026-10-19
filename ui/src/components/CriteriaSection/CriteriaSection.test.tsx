import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CriteriaSection from "./CriteriaSection";
import type { SearchItem } from "../../api/graphql/queries/resolveTerms";

const hypertension: SearchItem = {
  __typename: "Term",
  id: "HP:0000822",
  label: "Hypertension",
  category: "biolink:PhenotypicFeature",
  description: null,
  synonyms: null,
  bdc: { studyCount: 0, studies: [], variableNames: [] },
};

const systolicBp: SearchItem = {
  __typename: "BdcVariable",
  name: "bp_systolic",
  label: "Systolic blood pressure",
  domain: null,
  studyCount: 12,
  studies: [],
  concepts: [],
};

describe("CriteriaSection", () => {
  it("renders nothing when there are no items", () => {
    const { container } = render(
      <CriteriaSection title="Include" items={[]} onRemove={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the title and one card per item, in order", () => {
    render(
      <CriteriaSection
        title="Include"
        items={[hypertension, systolicBp]}
        onRemove={vi.fn()}
      />,
    );

    const section = screen.getByRole("region", { name: "Include" });
    const titles = within(section)
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent)
      .filter((t) => t !== "Include");
    expect(titles).toEqual(["Hypertension", "Systolic blood pressure"]);
  });

  it("offers Remove, not Include/Exclude or Details", () => {
    render(
      <CriteriaSection title="Include" items={[hypertension]} onRemove={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "+ Include" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Details" })).toBeNull();
  });

  it("calls onRemove with the clicked item", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <CriteriaSection
        title="Exclude"
        items={[hypertension, systolicBp]}
        onRemove={onRemove}
      />,
    );

    await user.click(screen.getAllByRole("button", { name: "Remove" })[1]);

    expect(onRemove).toHaveBeenCalledOnce();
    expect(onRemove).toHaveBeenCalledWith(systolicBp);
  });
});
