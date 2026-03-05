import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "./App";

const mockOverview = {
  conditions: [
    {
      name: "Cardiovascular",
      value: 45200,
      children: [{ name: "Hypertension", value: 14400 }],
    },
  ],
  procedures: [{ name: "Echocardiography", value: 28700 }],
};

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the header", () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockOverview),
    } as Response);

    render(<App />);
    expect(screen.getByText("Study Palette")).toBeInTheDocument();
  });

  it("renders chart panels after fetch", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockOverview),
    } as Response);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Conditions")).toBeInTheDocument();
      expect(screen.getByText("Procedures")).toBeInTheDocument();
    });
  });

  it("shows error on fetch failure", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as Response);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });
});
