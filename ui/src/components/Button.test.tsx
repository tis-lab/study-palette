import { render, screen, fireEvent } from "@testing-library/react";
import Button, { PrimaryButton } from "./Button";
import { describe, expect, it } from "vitest";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it('defaults to type="button" when no formId is given', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it('uses type="submit" and links to the form when formId is given', () => {
    render(<Button formId="search-form">Search</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("form", "search-form");
  });

  it("lets an explicit type override the default", () => {
    render(<Button type="submit">Search</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("submits a form outside of it when formId matches", () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <>
        <form id="search-form" onSubmit={onSubmit} />
        <Button formId="search-form">Search</Button>
      </>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not submit the surrounding form without formId or type", () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button>Cancel</Button>
      </form>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled and ignores clicks when isDisabled is true", () => {
    const onClick = vi.fn();
    render(
      <Button isDisabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("PrimaryButton", () => {
  it("renders as a contained button", () => {
    render(<PrimaryButton>Save</PrimaryButton>);
    expect(screen.getByRole("button")).toHaveClass("MuiButton-contained");
  });

  it("stays contained even if another variant is passed", () => {
    render(<PrimaryButton variant="outlined">Save</PrimaryButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("MuiButton-contained");
    expect(button).not.toHaveClass("MuiButton-outlined");
  });

  it("passes the regular Button props through", () => {
    const onClick = vi.fn();
    render(
      <PrimaryButton formId="search-form" onClick={onClick}>
        Search
      </PrimaryButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("form", "search-form");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
