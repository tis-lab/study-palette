import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConceptCardDetails, {
  CategoryValue,
  DetailField,
} from "./ConceptCardDetails";
import parseCurie from "../utils/parseCurie";

// ----------------------------------------------------------------------

/* Mocks */

// Parsing rules belong in parseCurie's own tests; here we only care
// how each parse result is displayed.
vi.mock("../utils/parseCurie", () => ({
  default: vi.fn(),
}));

const mockedParseCurie = vi.mocked(parseCurie);

type ParsedCurie = NonNullable<ReturnType<typeof parseCurie>>;

const parsed = (overrides: Partial<ParsedCurie> = {}) =>
  ({
    label: "Disease",
    source: "biolink",
    raw: "biolink:Disease",
    ...overrides,
  }) as ParsedCurie;

// ----------------------------------------------------------------------

/* Helpers */

/** Reads the list as [term, definition] pairs, in DOM order. */
function getFields(container: HTMLElement) {
  return Array.from(container.querySelectorAll("dt")).map((dt) => [
    dt.textContent,
    dt.nextElementSibling?.tagName === "DD"
      ? dt.nextElementSibling.textContent
      : undefined,
  ]);
}

beforeEach(() => {
  mockedParseCurie.mockReset();
  // Default: treat the value as plain text with no source prefix
  mockedParseCurie.mockImplementation((value) =>
    parsed({ label: value, source: undefined, raw: value }),
  );
});

// ----------------------------------------------------------------------

describe("ConceptCardDetails", () => {
  it("renders a description list", () => {
    const { container } = render(
      <ConceptCardDetails category="Disease" description="Some text" />,
    );
    expect(container.firstElementChild?.tagName).toBe("DL");
  });

  it("shows category then description", () => {
    const { container } = render(
      <ConceptCardDetails
        category="Disease or Syndrome"
        description="A chronic inflammatory disease of the airways."
      />,
    );

    expect(getFields(container)).toEqual([
      ["category", "Disease or Syndrome"],
      ["description", "A chronic inflammatory disease of the airways."],
    ]);
  });

  it.each([undefined, ""])("omits category when it is %j", (category) => {
    const { container } = render(
      <ConceptCardDetails category={category} description="Some text" />,
    );

    expect(getFields(container)).toEqual([["description", "Some text"]]);
  });

  it.each([undefined, null, ""])(
    "omits description when it is %j",
    (description) => {
      const { container } = render(
        <ConceptCardDetails category="Disease" description={description} />,
      );

      expect(getFields(container)).toEqual([["category", "Disease"]]);
    },
  );

  it("renders an empty list when there is nothing to show", () => {
    const { container } = render(<ConceptCardDetails />);

    const dl = container.querySelector("dl");
    expect(dl).toBeInTheDocument();
    expect(dl).toBeEmptyDOMElement();
  });

  it("formats the category through CategoryValue", () => {
    mockedParseCurie.mockReturnValue(parsed());
    render(<ConceptCardDetails category="biolink:Disease" />);

    expect(mockedParseCurie).toHaveBeenCalledWith("biolink:Disease");
    expect(screen.getByText("Disease")).toBeInTheDocument();
    expect(screen.getByText("biolink")).toBeInTheDocument();
  });
});

// ----------------------------------------------------------------------

describe("DetailField", () => {
  it("renders the label as a term and the value as its definition", () => {
    const { container } = render(
      <dl>
        <DetailField label="synonyms" value="Bronchial asthma" />
      </dl>,
    );

    expect(getFields(container)).toEqual([["synonyms", "Bronchial asthma"]]);
  });

  it("accepts any React node as the value", () => {
    render(
      <dl>
        <DetailField
          label="source"
          value={<a href="https://example.org">Example</a>}
        />
      </dl>,
    );

    const dd = screen.getByRole("link", { name: "Example" }).closest("dd");
    expect(dd).toBeInTheDocument();
  });
});

// ----------------------------------------------------------------------

describe("CategoryValue", () => {
  it("parses the given value", () => {
    render(<CategoryValue value="biolink:Disease" />);
    expect(mockedParseCurie).toHaveBeenCalledWith("biolink:Disease");
  });

  it("shows the parsed label and a source chip", () => {
    mockedParseCurie.mockReturnValue(parsed());
    render(<CategoryValue value="biolink:Disease" />);

    expect(screen.getByText("Disease")).toBeInTheDocument();
    expect(screen.getByText("biolink")).toBeInTheDocument();
  });

  it("labels the chip with the full source name and raw CURIE", () => {
    mockedParseCurie.mockReturnValue(parsed());
    render(<CategoryValue value="biolink:Disease" />);

    expect(
      screen.getByLabelText("Biolink Model · biolink:Disease"),
    ).toHaveTextContent("biolink");
  });

  it("shows a tooltip with the full source name on hover", async () => {
    const user = userEvent.setup();
    mockedParseCurie.mockReturnValue(parsed());
    render(<CategoryValue value="biolink:Disease" />);

    await user.hover(screen.getByText("biolink"));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Biolink Model · biolink:Disease",
    );
  });

  it("uses the source prefix as-is when it has no known name", () => {
    mockedParseCurie.mockReturnValue(
      parsed({ label: "Asthma", source: "umls", raw: "umls:C0004096" }),
    );
    render(<CategoryValue value="umls:C0004096" />);

    expect(screen.getByLabelText("umls · umls:C0004096")).toHaveTextContent(
      "umls",
    );
  });

  it.each([undefined, ""])("omits the chip when the source is %j", (source) => {
    mockedParseCurie.mockReturnValue(parsed({ source }));
    const { container } = render(<CategoryValue value="Disease" />);

    expect(container).toHaveTextContent(/^Disease$/);
    expect(screen.queryByLabelText(/·/)).not.toBeInTheDocument();
  });
});
