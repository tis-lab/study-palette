import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "./App";

const mockStudies = {
  studies: [
    {
      id: "phs000001",
      name: "Test Study",
      description: "A test study.",
      participant_count: 100,
    },
  ],
  total: 1,
};

const mockConditions = {
  conditions: [{ condition_concept: "MONDO:0004979", condition_status: "PRESENT", count: 30 }],
};

const mockParticipants = {
  participants: [{ id: 1, sex: "OMOP:8507", race: "OMOP:8527" }],
  total: 1,
};

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the header", () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStudies),
    } as Response);

    render(<App />);
    expect(screen.getByText("Study Palette")).toBeInTheDocument();
  });

  it("renders studies from the API", async () => {
    vi.spyOn(global, "fetch").mockImplementation((url) => {
      const urlStr = String(url);
      if (urlStr.includes("/conditions")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockConditions) } as Response);
      }
      if (urlStr.includes("/participants")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockParticipants) } as Response);
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockStudies) } as Response);
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Test Study")).toBeInTheDocument();
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
