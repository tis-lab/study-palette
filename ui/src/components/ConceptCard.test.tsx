import { ReactElement } from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ThemeProvider,
  createTheme,
  type ThemeOptions,
} from "@mui/material/styles";
import ConceptCard, { DetailField } from "./ConceptCard";
import { Term } from "../api/graphql/queries/resolveTerms";

// ----------------------------------------------------------------------

/* Fixtures & helpers */
const concept: Term = {
  id: "C0011849",
  label: "Diabetes Mellitus",
  category: "Disease or Syndrome",
  description: "A metabolic disease characterized by high blood sugar.",
  synonyms: ["Diabetes", "DM"],
};

function renderCard(
  props: Partial<Parameters<typeof ConceptCard>[0]> = {},
  theme = createTheme(),
) {
  return render(
    <ThemeProvider theme={theme}>
      <ConceptCard concept={concept} isFirst isLast {...props} />
    </ThemeProvider>,
  );
}

const getDetailsButton = () => screen.getByRole("button", { name: "Details" });

afterEach(() => {
  vi.restoreAllMocks();
});

// ----------------------------------------------------------------------

describe("ConceptCard", () => {
  describe("content", () => {
    it("renders the concept label as a level-2 heading", () => {
      renderCard();
      expect(
        screen.getByRole("heading", { level: 2, name: "Diabetes Mellitus" }),
      ).toBeInTheDocument();
    });

    it("renders the concept id", () => {
      renderCard();
      expect(screen.getByText("C0011849")).toBeInTheDocument();
    });
  });

  describe("details toggle", () => {
    it("starts collapsed with no details in the DOM", () => {
      renderCard();
      expect(getDetailsButton()).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("term")).not.toBeInTheDocument();
    });

    it("expands to show category and description as term/definition pairs", async () => {
      const user = userEvent.setup();
      renderCard();

      await user.click(getDetailsButton());

      expect(getDetailsButton()).toHaveAttribute("aria-expanded", "true");

      const terms = screen.getAllByRole("term").map((el) => el.textContent);
      const definitions = screen
        .getAllByRole("definition")
        .map((el) => el.textContent);

      expect(terms).toEqual(["category", "description"]);
      expect(definitions).toEqual([concept.category, concept.description]);
    });

    it("renders the details inside a <dl>", async () => {
      const user = userEvent.setup();
      renderCard();

      await user.click(getDetailsButton());

      const term = screen.getAllByRole("term")[0];
      expect(term.closest("dl")).not.toBeNull();
    });

    it("points aria-controls at the expanded region", async () => {
      const user = userEvent.setup();
      const { container } = renderCard();

      await user.click(getDetailsButton());

      const controlsId = getDetailsButton().getAttribute("aria-controls");
      expect(controlsId).toBeTruthy();
      const region = container.ownerDocument.getElementById(controlsId!);
      expect(region).not.toBeNull();
      expect(within(region!).getByText(concept.category!)).toBeInTheDocument();
    });

    it("collapses again on second click and removes the details", async () => {
      const user = userEvent.setup();
      renderCard();

      await user.click(getDetailsButton());
      await user.click(getDetailsButton());

      expect(getDetailsButton()).toHaveAttribute("aria-expanded", "false");
      // Collapse animates out before unmounting
      await waitFor(() =>
        expect(screen.queryByRole("term")).not.toBeInTheDocument(),
      );
    });

    it("omits fields the concept does not have", async () => {
      const user = userEvent.setup();
      renderCard({
        concept: { ...concept, description: null },
      });

      await user.click(getDetailsButton());

      const terms = screen.getAllByRole("term").map((el) => el.textContent);
      expect(terms).toEqual(["category"]);
    });

    it("uses unique aria-controls ids across multiple cards", () => {
      render(
        <>
          <ConceptCard concept={concept} isFirst isLast={false} />
          <ConceptCard
            concept={{ ...concept, id: "C2" }}
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
  });

  describe("actions", () => {
    it("calls onInclude with the concept", async () => {
      const user = userEvent.setup();
      const onInclude = vi.fn();
      const onExclude = vi.fn();
      renderCard({ onInclude, onExclude });

      await user.click(screen.getByRole("button", { name: "+ Include" }));

      expect(onInclude).toHaveBeenCalledTimes(1);
      expect(onInclude).toHaveBeenCalledWith(concept);
      expect(onExclude).not.toHaveBeenCalled();
    });

    it("calls onExclude with the concept", async () => {
      const user = userEvent.setup();
      const onInclude = vi.fn();
      const onExclude = vi.fn();
      renderCard({ onInclude, onExclude });

      await user.click(screen.getByRole("button", { name: "+ Exclude" }));

      expect(onExclude).toHaveBeenCalledTimes(1);
      expect(onExclude).toHaveBeenCalledWith(concept);
      expect(onInclude).not.toHaveBeenCalled();
    });

    it("does not throw when no handlers are provided", async () => {
      const user = userEvent.setup();
      renderCard();

      await expect(
        user.click(screen.getByRole("button", { name: "+ Include" })),
      ).resolves.not.toThrow();
    });
  });

  describe("grouping (isFirst / isLast)", () => {
    // Longhands on purpose: jsdom doesn't expand the border-radius shorthand
    const cardRadiusTheme = createTheme({
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            },
          },
        },
      },
    });

    const getRoot = (container: HTMLElement) =>
      container.querySelector(".MuiCard-root") as HTMLElement;

    it("does not leak isFirst/isLast to the DOM", () => {
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const { container } = renderCard({ isFirst: false, isLast: false });

      const root = getRoot(container);
      expect(root).not.toHaveAttribute("isfirst");
      expect(root).not.toHaveAttribute("islast");
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it("keeps all corners from the theme for a single card", () => {
      const { container } = renderCard(
        { isFirst: true, isLast: true },
        cardRadiusTheme,
      );

      expect(getRoot(container)).toHaveStyle({
        borderTopLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      });
    });

    it("flattens the bottom corners of the first card", () => {
      const { container } = renderCard(
        { isFirst: true, isLast: false },
        cardRadiusTheme,
      );

      expect(getRoot(container)).toHaveStyle({
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
      });
    });

    it("flattens the top corners of the last card and keeps the bottom ones", () => {
      const { container } = renderCard(
        { isFirst: false, isLast: true },
        cardRadiusTheme,
      );

      expect(getRoot(container)).toHaveStyle({
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      });
    });

    it("flattens the top corners and drops the top border of a middle card", () => {
      const { container } = renderCard(
        { isFirst: false, isLast: false },
        cardRadiusTheme,
      );

      expect(getRoot(container)).toHaveStyle({
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",
        borderTopStyle: "none",
      });
    });
  });

  describe("theme contract", () => {
    // Custom component names aren't in MUI's types without module augmentation
    const components = {
      CohortConceptCard: {
        styleOverrides: {
          root: { backgroundColor: "rgb(1, 2, 3)" },
          details: { backgroundColor: "rgb(4, 5, 6)" },
        },
      },
    } as unknown as ThemeOptions["components"];

    it("applies theme.components.CohortConceptCard.styleOverrides.root", () => {
      const { container } = renderCard({}, createTheme({ components }));
      expect(container.querySelector(".MuiCard-root")).toHaveStyle({
        backgroundColor: "rgb(1, 2, 3)",
      });
    });

    it("applies theme.components.CohortConceptCard.styleOverrides.details", async () => {
      const user = userEvent.setup();
      renderCard({}, createTheme({ components }));

      await user.click(getDetailsButton());

      const dl = screen.getAllByRole("term")[0].closest("dl");
      expect(dl).toHaveStyle({ backgroundColor: "rgb(4, 5, 6)" });
    });
  });
});

// ----------------------------------------------------------------------

describe("DetailField", () => {
  function renderField(ui: ReactElement) {
    return render(<dl>{ui}</dl>);
  }

  it("renders the label as a term and the value as its definition", () => {
    renderField(<DetailField label="category" value="Finding" />);
    expect(screen.getByRole("term")).toHaveTextContent("category");
    expect(screen.getByRole("definition")).toHaveTextContent("Finding");
  });

  it("accepts a ReactNode value", () => {
    renderField(
      <DetailField label="source" value={<a href="/x">View source</a>} />,
    );
    expect(
      within(screen.getByRole("definition")).getByRole("link", {
        name: "View source",
      }),
    ).toBeInTheDocument();
  });

  it("merges custom sx with its own styles", () => {
    const { container } = renderField(
      <DetailField label="a" value="b" sx={{ color: "rgb(1, 2, 3)" }} />,
    );
    const wrapper = container.querySelector("dl > div") as HTMLElement;
    expect(wrapper).toHaveStyle({ color: "rgb(1, 2, 3)" });
    expect(["0", "0px"]).toContain(getComputedStyle(wrapper).minWidth);
  });

  it("accepts sx as an array", () => {
    const { container } = renderField(
      <DetailField
        label="a"
        value="b"
        sx={[{ color: "rgb(1, 2, 3)" }, false]}
      />,
    );
    const wrapper = container.querySelector("dl > div") as HTMLElement;
    expect(wrapper).toHaveStyle({ color: "rgb(1, 2, 3)" });
  });
});
