import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConceptCard from "./ConceptCard";
import type { Term } from "../api/graphql/queries/resolveTerms";

// ----------------------------------------------------------------------

/* Mocks */

// Stub so these tests don't depend on ConceptCardDetails' internals;
// it has its own tests. Props are exposed so we can check what's passed.
vi.mock("./ConceptCardDetails", () => ({
  default: ({
    category,
    description,
  }: {
    category?: string;
    description?: string | null;
  }) => (
    <div data-testid="concept-details" data-category={category ?? ""}>
      {description}
    </div>
  ),
}));

// ----------------------------------------------------------------------

/* Fixtures & helpers */

const asthma: Term = {
  id: "C0004096",
  label: "Asthma",
  category: "biolink:Disease",
  description: "A chronic inflammatory disease of the airways.",
  synonyms: null,
};

type CardProps = Partial<Parameters<typeof ConceptCard>[0]>;

function renderCard(props: CardProps = {}) {
  return render(<ConceptCard concept={asthma} isFirst isLast {...props} />);
}

const getDetailsButton = () => screen.getByRole("button", { name: "Details" });
const getIncludeButton = () =>
  screen.getByRole("button", { name: "+ Include" });
const getExcludeButton = () =>
  screen.getByRole("button", { name: "+ Exclude" });
const queryDetails = () => screen.queryByTestId("concept-details");

afterEach(() => {
  vi.restoreAllMocks();
});

// ----------------------------------------------------------------------

describe("ConceptCard", () => {
  describe("content", () => {
    it("shows the label as a level-2 heading", () => {
      renderCard();
      expect(
        screen.getByRole("heading", { level: 2, name: "Asthma" }),
      ).toBeInTheDocument();
    });

    it("shows the concept id", () => {
      renderCard();
      expect(screen.getByText("C0004096")).toBeInTheDocument();
    });
  });

  describe("details", () => {
    it("is collapsed by default", () => {
      renderCard();
      expect(getDetailsButton()).toHaveAttribute("aria-expanded", "false");
      expect(queryDetails()).not.toBeInTheDocument();
    });

    it("expands when Details is clicked", async () => {
      const user = userEvent.setup();
      renderCard();

      await user.click(getDetailsButton());

      expect(getDetailsButton()).toHaveAttribute("aria-expanded", "true");
      expect(queryDetails()).toBeInTheDocument();
    });

    it("points aria-controls at the panel containing the details", async () => {
      const user = userEvent.setup();
      renderCard();

      await user.click(getDetailsButton());

      const panelId = getDetailsButton().getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      const panel = document.getElementById(panelId!);
      expect(panel).toContainElement(queryDetails());
    });

    it("passes the concept's category and description", async () => {
      const user = userEvent.setup();
      renderCard();

      await user.click(getDetailsButton());

      const details = queryDetails();
      expect(details).toHaveAttribute("data-category", "biolink:Disease");
      expect(details).toHaveTextContent(
        "A chronic inflammatory disease of the airways.",
      );
    });

    it("collapses and unmounts when Details is clicked again", async () => {
      const user = userEvent.setup();
      renderCard();
      await user.click(getDetailsButton());
      const details = queryDetails();

      await user.click(getDetailsButton());

      expect(getDetailsButton()).toHaveAttribute("aria-expanded", "false");
      // unmountOnExit removes it once the collapse transition finishes
      await waitForElementToBeRemoved(details);
    });

    it("gives each card its own details panel id", () => {
      render(
        <>
          <ConceptCard concept={asthma} isFirst isLast={false} />
          <ConceptCard
            concept={{ ...asthma, id: "C0264408", label: "Childhood asthma" }}
            isFirst={false}
            isLast
          />
        </>,
      );

      const ids = screen
        .getAllByRole("button", { name: "Details" })
        .map((b) => b.getAttribute("aria-controls"));
      expect(new Set(ids).size).toBe(2);
    });

    it("toggles each card independently", async () => {
      const user = userEvent.setup();
      render(
        <>
          <ConceptCard concept={asthma} isFirst isLast={false} />
          <ConceptCard
            concept={{ ...asthma, id: "C0264408", label: "Childhood asthma" }}
            isFirst={false}
            isLast
          />
        </>,
      );
      const [first, second] = screen.getAllByRole("button", {
        name: "Details",
      });

      await user.click(second);

      expect(first).toHaveAttribute("aria-expanded", "false");
      expect(second).toHaveAttribute("aria-expanded", "true");
      expect(screen.getAllByTestId("concept-details")).toHaveLength(1);
    });
  });

  describe("actions", () => {
    it("calls onInclude with the concept", async () => {
      const user = userEvent.setup();
      const onInclude = vi.fn();
      const onExclude = vi.fn();
      renderCard({ onInclude, onExclude });

      await user.click(getIncludeButton());

      expect(onInclude).toHaveBeenCalledOnce();
      expect(onInclude).toHaveBeenCalledWith(asthma);
      expect(onExclude).not.toHaveBeenCalled();
    });

    it("calls onExclude with the concept", async () => {
      const user = userEvent.setup();
      const onInclude = vi.fn();
      const onExclude = vi.fn();
      renderCard({ onInclude, onExclude });

      await user.click(getExcludeButton());

      expect(onExclude).toHaveBeenCalledOnce();
      expect(onExclude).toHaveBeenCalledWith(asthma);
      expect(onInclude).not.toHaveBeenCalled();
    });

    it("does not throw when no handlers are provided", async () => {
      const user = userEvent.setup();
      renderCard();

      await expect(user.click(getIncludeButton())).resolves.not.toThrow();
      await expect(user.click(getExcludeButton())).resolves.not.toThrow();
    });

    it("does not toggle details when an action is clicked", async () => {
      const user = userEvent.setup();
      renderCard({ onInclude: vi.fn() });

      await user.click(getIncludeButton());

      expect(getDetailsButton()).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("position props", () => {
    it.each([
      { isFirst: true, isLast: true },
      { isFirst: true, isLast: false },
      { isFirst: false, isLast: false },
      { isFirst: false, isLast: true },
    ])(
      "does not forward isFirst/isLast to the DOM ($isFirst, $isLast)",
      ({ isFirst, isLast }) => {
        // React logs an "unknown prop" error if these leak through styled()
        const errorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        renderCard({ isFirst, isLast });

        expect(errorSpy).not.toHaveBeenCalled();
      },
    );
  });
});
