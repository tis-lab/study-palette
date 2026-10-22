import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import { useCohortSummary, type Criteria } from "./useCohortSummary";
import { t2dFemaleSummary, t2dSummary } from "../mocks/SYNTHETIC.cohortSummary";
import type { SearchItem } from "../api/graphql/queries/resolveTerms";

const term = (id: string): SearchItem => ({
  __typename: "Term",
  id,
  label: id,
  category: "biolink:Disease",
  description: null,
  synonyms: null,
  bdc: { studyCount: 0, studies: [], variableNames: [] },
});

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const none: Criteria = { include: [], exclude: [] };

describe("useCohortSummary", () => {
  it("does not run without a search or criteria", () => {
    const { result } = renderHook(() => useCohortSummary("  ", none), { wrapper });

    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
  });

  it("returns the type 2 diabetes example for a search alone", async () => {
    const { result } = renderHook(() => useCohortSummary("diabetes", none), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBe(t2dSummary);
  });

  it("returns the type 2 diabetes example for one criterion without a search", async () => {
    const { result } = renderHook(
      () => useCohortSummary("", { include: [term("MONDO:0005148")], exclude: [] }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBe(t2dSummary);
  });

  it("keeps the previous cohort while the next one loads", async () => {
    const { result, rerender } = renderHook(
      ({ criteria }) => useCohortSummary("diabetes", criteria),
      { wrapper, initialProps: { criteria: none } },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    rerender({ criteria: { include: [term("MONDO:0005148")], exclude: [] } });

    expect(result.current.isPlaceholderData).toBe(true);
    expect(result.current.data).toBe(t2dSummary);
  });

  it("keeps nothing once every filter is removed", async () => {
    const { result, rerender } = renderHook(
      ({ text }) => useCohortSummary(text, none),
      { wrapper, initialProps: { text: "diabetes" } },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    rerender({ text: "" });

    expect(result.current.data).toBeUndefined();
  });

  it("returns the narrower female example once a search is narrowed by a criterion", async () => {
    const { result } = renderHook(
      () =>
        useCohortSummary("diabetes", {
          include: [term("MONDO:0005148")],
          exclude: [],
        }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBe(t2dFemaleSummary);
  });
});
