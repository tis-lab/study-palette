import { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Searchbar, { Props } from "./Searchbar";

// ----------------------------------------------------------------------

/* Helpers */
function ControlledSearchbar({
  initialValue = "",
  onChange,
  ...rest
}: Partial<Props> & { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  return (
    <Searchbar
      id="test-search"
      value={value}
      onChange={(v, e) => {
        setValue(v);
        onChange?.(v, e);
      }}
      {...rest}
    />
  );
}

function renderStatic(props: Partial<Props> = {}) {
  const onChange = vi.fn();
  const utils = render(
    <Searchbar id="test-search" value="" onChange={onChange} {...props} />,
  );
  return { ...utils, onChange };
}

// ----------------------------------------------------------------------

describe("Searchbar", () => {
  describe("rendering & accessibility", () => {
    it("renders a search landmark with the given id", () => {
      renderStatic({ id: "concept-search" });
      expect(screen.getByRole("search")).toHaveAttribute(
        "id",
        "concept-search",
      );
    });

    it("renders a searchbox with the default accessible name", () => {
      renderStatic();
      expect(
        screen.getByRole("searchbox", { name: "Search" }),
      ).toBeInTheDocument();
    });

    it("uses a custom aria label", () => {
      renderStatic({ ariaLabel: "Search concepts" });
      expect(
        screen.getByRole("searchbox", { name: "Search concepts" }),
      ).toBeInTheDocument();
    });

    it("renders placeholder and name", () => {
      renderStatic({ placeholder: "e.g. diabetes", name: "q" });
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("placeholder", "e.g. diabetes");
      expect(input).toHaveAttribute("name", "q");
    });

    it("hides the search icon from assistive tech", () => {
      const { container } = renderStatic();
      expect(container.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("focuses the input when autoFocus is set", () => {
      renderStatic({ autoFocus: true });
      expect(screen.getByRole("searchbox")).toHaveFocus();
    });

    it("does not focus the input by default", () => {
      renderStatic();
      expect(screen.getByRole("searchbox")).not.toHaveFocus();
    });
  });

  describe("typing", () => {
    it("calls onChange with the new value and the event", async () => {
      const user = userEvent.setup();
      const { onChange } = renderStatic();

      await user.type(screen.getByRole("searchbox"), "a");

      expect(onChange).toHaveBeenCalledTimes(1);
      const [value, event] = onChange.mock.calls[0];
      expect(value).toBe("a");
      expect(event.target).toBe(screen.getByRole("searchbox"));
    });

    it("reflects the full typed value when controlled by a parent", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<ControlledSearchbar onChange={onChange} />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "asthma");

      expect(input).toHaveValue("asthma");
      expect(onChange).toHaveBeenLastCalledWith("asthma", expect.anything());
    });

    it("displays the value prop", () => {
      renderStatic({ value: "heart failure" });
      expect(screen.getByRole("searchbox")).toHaveValue("heart failure");
    });
  });

  describe("submitting", () => {
    it("calls onSearch with the value when Enter is pressed", async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<ControlledSearchbar onSearch={onSearch} />);

      await user.type(screen.getByRole("searchbox"), "asthma{Enter}");

      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith("asthma");
    });

    it("trims whitespace before calling onSearch", async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<ControlledSearchbar onSearch={onSearch} />);

      await user.type(screen.getByRole("searchbox"), "  asthma  {Enter}");

      expect(onSearch).toHaveBeenCalledWith("asthma");
    });

    it("calls onSearch with an empty string for whitespace-only input", async () => {
      // Documents current behavior: the caller decides whether "" should search
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<ControlledSearchbar onSearch={onSearch} />);

      await user.type(screen.getByRole("searchbox"), "   {Enter}");

      expect(onSearch).toHaveBeenCalledWith("");
    });

    it("can be submitted by an external button via the form attribute", async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(
        <>
          <ControlledSearchbar
            id="external-search"
            initialValue="copd"
            onSearch={onSearch}
          />
          <button type="submit" form="external-search">
            Go
          </button>
        </>,
      );

      await user.click(screen.getByRole("button", { name: "Go" }));

      expect(onSearch).toHaveBeenCalledWith("copd");
    });

    it("prevents the native form submission (no page reload)", () => {
      renderStatic({ value: "x", onSearch: vi.fn() });

      // fireEvent returns false when preventDefault() was called
      const notPrevented = fireEvent.submit(screen.getByRole("search"));

      expect(notPrevented).toBe(false);
    });

    it("does not throw when onSearch is not provided", async () => {
      const user = userEvent.setup();
      render(<ControlledSearchbar />);

      await expect(
        user.type(screen.getByRole("searchbox"), "asthma{Enter}"),
      ).resolves.not.toThrow();
    });
  });

  describe("disabled", () => {
    it("disables the input", () => {
      renderStatic({ disabled: true });
      expect(screen.getByRole("searchbox")).toBeDisabled();
    });

    it("does not call onChange or onSearch when disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const onSearch = vi.fn();
      render(
        <ControlledSearchbar
          disabled
          onChange={onChange}
          onSearch={onSearch}
        />,
      );

      await user.type(screen.getByRole("searchbox"), "asthma{Enter}");

      expect(onChange).not.toHaveBeenCalled();
      expect(onSearch).not.toHaveBeenCalled();
    });
  });

  describe("inputProps", () => {
    it("passes extra attributes to the underlying input", () => {
      renderStatic({ inputProps: { maxLength: 50, "data-testid": "q" } });
      const input = screen.getByTestId("q");
      expect(input).toBe(screen.getByRole("searchbox"));
      expect(input).toHaveAttribute("maxlength", "50");
    });

    it("lets inputProps override the aria label", () => {
      // inputProps is spread after aria-label, so it wins
      renderStatic({ inputProps: { "aria-label": "Find a concept" } });
      expect(
        screen.getByRole("searchbox", { name: "Find a concept" }),
      ).toBeInTheDocument();
    });
  });
});
