import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import ConceptCard, { DetailField } from "./ConceptCard";
import type { Term } from "../api/graphql/queries/resolveTerms";

// PrimaryButton is a project wrapper; replace it with a plain button so these
// tests only exercise ConceptCard's behaviour.
vi.mock("./Button", () => ({
  PrimaryButton: ({
    children,
    variant: _variant,
    ...props
  }: ComponentProps<"button"> & { variant?: string }) => (
    <button {...props}>{children}</button>
  ),
}));

// ----------------------------------------------------------------------

const makeTerm = (overrides: Partial<Term> = {}): Term =>
  ({
    id: "MONDO:0001134",
    label: "Essential hypertension",
    category: "Clinical measurement",
    description: "Hypertension with no identifiable secondary cause.",
    ...overrides,
  }) as Term;

type CardProps = ComponentProps<typeof ConceptCard>;

const renderCard = (props: Partial<CardProps> = {}) => {
  const concept = props.concept ?? makeTerm();
  const user = userEvent.setup();
  const utils = render(
    <ConceptCard concept={concept} isFirst={false} isLast={false} {...props} />,
  );
  const cardRoot = utils.container.querySelector(
    ".MuiCard-root",
  ) as HTMLElement;
  return { ...utils, user, concept, cardRoot };
};

const detailsButton = () => screen.getByRole("button", { name: /details/i });

// ----------------------------------------------------------------------

describe("ConceptCard", () => {
  describe("header", () => {
    it("renders the concept label as a heading", () => {
      renderCard();
      expect(
        screen.getByRole("heading", { name: "Essential hypertension" }),
      ).toBeInTheDocument();
    });

    it("renders the concept id", () => {
      renderCard();
      expect(screen.getByText(/MONDO:0001134/)).toBeInTheDocument();
    });
  });

  describe("include / exclude actions", () => {
    it("calls onInclude with the concept", async () => {
      const onInclude = vi.fn();
      const { user, concept } = renderCard({ onInclude });

      await user.click(screen.getByRole("button", { name: "+ Include" }));

      expect(onInclude).toHaveBeenCalledTimes(1);
      expect(onInclude).toHaveBeenCalledWith(concept);
    });

    it("calls onExclude with the concept", async () => {
      const onExclude = vi.fn();
      const { user, concept } = renderCard({ onExclude });

      await user.click(screen.getByRole("button", { name: "+ Exclude" }));

      expect(onExclude).toHaveBeenCalledTimes(1);
      expect(onExclude).toHaveBeenCalledWith(concept);
    });

    it("does not call the other handler", async () => {
      const onInclude = vi.fn();
      const onExclude = vi.fn();
      const { user } = renderCard({ onInclude, onExclude });

      await user.click(screen.getByRole("button", { name: "+ Include" }));

      expect(onExclude).not.toHaveBeenCalled();
    });

    it("does not throw when no handlers are provided", async () => {
      const { user } = renderCard();

      await user.click(screen.getByRole("button", { name: "+ Include" }));
      await user.click(screen.getByRole("button", { name: "+ Exclude" }));

      // Reaching here without an error is the assertion.
      expect(
        screen.getByRole("button", { name: "+ Include" }),
      ).toBeInTheDocument();
    });
  });

  describe("details panel", () => {
    it("is collapsed by default", () => {
      renderCard();

      expect(detailsButton()).toHaveAttribute("aria-expanded", "false");
      expect(
        screen.queryByText("Clinical measurement"),
      ).not.toBeInTheDocument();
    });

    it("expands to show category and description", async () => {
      const { user } = renderCard();

      await user.click(detailsButton());

      expect(detailsButton()).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("category")).toBeInTheDocument();
      expect(screen.getByText("Clinical measurement")).toBeInTheDocument();
      expect(screen.getByText("description")).toBeInTheDocument();
      expect(
        screen.getByText("Hypertension with no identifiable secondary cause."),
      ).toBeInTheDocument();
    });

    it("collapses again on a second click", async () => {
      const { user } = renderCard();

      await user.click(detailsButton());
      expect(screen.getByText("Clinical measurement")).toBeInTheDocument();

      await user.click(detailsButton());

      expect(detailsButton()).toHaveAttribute("aria-expanded", "false");
      // Collapse uses unmountOnExit, so content is removed after the transition.
      await waitForElementToBeRemoved(() =>
        screen.queryByText("Clinical measurement"),
      );
    });

    it("omits the category field when there is no category", async () => {
      const { user } = renderCard({
        concept: makeTerm({ category: undefined }),
      });

      await user.click(detailsButton());

      expect(screen.queryByText("category")).not.toBeInTheDocument();
      expect(screen.getByText("description")).toBeInTheDocument();
    });

    it("omits the description field when there is no description", async () => {
      const { user } = renderCard({
        concept: makeTerm({ description: undefined }),
      });

      await user.click(detailsButton());

      expect(screen.queryByText("description")).not.toBeInTheDocument();
      expect(screen.getByText("category")).toBeInTheDocument();
    });

    it("does not affect the action handlers when toggled", async () => {
      const onInclude = vi.fn();
      const { user } = renderCard({ onInclude });

      await user.click(detailsButton());

      expect(onInclude).not.toHaveBeenCalled();
    });
  });

  describe("corner rounding", () => {
    it("rounds only the top corners of the first card", () => {
      const { cardRoot } = renderCard({ isFirst: true, isLast: false });

      expect(cardRoot).toHaveStyle({
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
      });
    });

    it("rounds only the bottom corners of the last card", () => {
      const { cardRoot } = renderCard({ isFirst: false, isLast: true });

      expect(cardRoot).toHaveStyle({
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      });
    });

    it("has square corners for a middle card", () => {
      const { cardRoot } = renderCard({ isFirst: false, isLast: false });

      expect(cardRoot).toHaveStyle({
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
      });
    });

    it("rounds all four corners when it is the only card", () => {
      const { cardRoot } = renderCard({ isFirst: true, isLast: true });

      expect(cardRoot).toHaveStyle({
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      });
    });
  });
});

// ----------------------------------------------------------------------

describe("DetailField", () => {
  it("renders the label and value", () => {
    render(
      <dl>
        <DetailField label="vocabulary" value="SNOMED" />
      </dl>,
    );

    expect(screen.getByText("vocabulary").tagName).toBe("DT");
    expect(screen.getByText("SNOMED").tagName).toBe("DD");
  });

  it("accepts React content as the value", () => {
    render(
      <dl>
        <DetailField label="source" value={<a href="/snomed">SNOMED</a>} />
      </dl>,
    );

    expect(screen.getByRole("link", { name: "SNOMED" })).toHaveAttribute(
      "href",
      "/snomed",
    );
  });
});
