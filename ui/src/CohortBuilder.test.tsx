import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { CohortBuilder } from "./index";

describe("CohortBuilder", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the app inside its providers without making any request on load", () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    render(<CohortBuilder />);

    expect(screen.getByText("Study Palette")).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
