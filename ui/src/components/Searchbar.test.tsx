import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Searchbar, { type SearchBarProps } from "./Searchbar";
import Button from "./Button";

function renderSearchbar(props: Partial<SearchBarProps> = {}) {
  const onChange = vi.fn();
  const onSearch = vi.fn();
  render(
    <Searchbar
      id="search"
      value=""
      onChange={onChange}
      onSearch={onSearch}
      {...props}
    />,
  );
  return { onChange, onSearch, input: screen.getByRole("searchbox") };
}

function ControlledSearchbar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <Searchbar
      id="search"
      value={value}
      onChange={setValue}
      onSearch={onSearch}
    />
  );
}

describe("Searchbar", () => {
  it("renders a search landmark with the given id", () => {
    renderSearchbar();
    expect(screen.getByRole("search")).toHaveAttribute("id", "search");
  });

  it('labels the input "Search" by default', () => {
    renderSearchbar();
    expect(
      screen.getByRole("searchbox", { name: "Search" }),
    ).toBeInTheDocument();
  });

  it("uses a custom ariaLabel", () => {
    renderSearchbar({ ariaLabel: "Search studies" });
    expect(
      screen.getByRole("searchbox", { name: "Search studies" }),
    ).toBeInTheDocument();
  });

  it("shows the value, placeholder and name", () => {
    const { input } = renderSearchbar({
      value: "diabetes",
      placeholder: "Search concepts",
      name: "q",
    });
    expect(input).toHaveValue("diabetes");
    expect(input).toHaveAttribute("placeholder", "Search concepts");
    expect(input).toHaveAttribute("name", "q");
  });

  it("calls onChange with the new value and the event", () => {
    const { onChange, input } = renderSearchbar();
    fireEvent.change(input, { target: { value: "asthma" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      "asthma",
      expect.objectContaining({ target: input }),
    );
  });

  it("calls onSearch with the trimmed value on submit", () => {
    const { onSearch } = renderSearchbar({ value: "  diabetes  " });
    fireEvent.submit(screen.getByRole("search"));
    expect(onSearch).toHaveBeenCalledWith("diabetes");
  });

  it("searches with what the user typed", () => {
    const onSearch = vi.fn();
    render(<ControlledSearchbar onSearch={onSearch} />);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: " heart " },
    });
    fireEvent.submit(screen.getByRole("search"));
    expect(onSearch).toHaveBeenCalledWith("heart");
  });

  it("does not throw on submit when onSearch is not provided", () => {
    renderSearchbar({ onSearch: undefined });
    expect(() => fireEvent.submit(screen.getByRole("search"))).not.toThrow();
  });

  it("prevents the default form submission", () => {
    renderSearchbar();
    const event = new Event("submit", { bubbles: true, cancelable: true });
    screen.getByRole("search").dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("disables the input when disabled", () => {
    const { input } = renderSearchbar({ disabled: true });
    expect(input).toBeDisabled();
  });

  it("focuses the input when autoFocus is set", () => {
    const { input } = renderSearchbar({ autoFocus: true });
    expect(input).toHaveFocus();
  });

  it("passes inputProps to the input, including overriding the label", () => {
    const { input } = renderSearchbar({
      inputProps: { maxLength: 50, "aria-label": "Find a concept" },
    });
    expect(input).toHaveAttribute("maxlength", "50");
    expect(input).toHaveAccessibleName("Find a concept");
  });

  it("is submitted by a Button whose formId matches its id", () => {
    const onSearch = vi.fn();
    render(
      <>
        <Searchbar
          id="concept-search"
          value="diabetes"
          onChange={vi.fn()}
          onSearch={onSearch}
        />
        <Button formId="concept-search">Search</Button>
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(onSearch).toHaveBeenCalledWith("diabetes");
  });
});
