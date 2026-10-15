import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useConceptSearch } from "./useConceptSearch";
import { RESOLVE_TERMS_QUERY } from "../api/graphql/queries/resolveTerms";

const ENDPOINT = "https://graphql.test/graphql";

const termsPage = {
  items: [
    {
      id: "MONDO:0005148",
      label: "type 2 diabetes mellitus",
      category: "biolink:Disease",
      description: "A type of diabetes.",
      synonyms: ["T2D"],
    },
    {
      id: "MONDO:0005149",
      label: "pulmonary hypertension",
      category: "biolink:Disease",
      description: null,
      synonyms: null,
    },
  ],
  total: 2,
  limit: 20,
  offset: 0,
  hasMore: false,
};

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return { client, wrapper };
}

function wrapper({ children }: { children: ReactNode }) {
  return createWrapper().wrapper({ children });
}

function mockResponse(body: unknown) {
  return vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(new Response(JSON.stringify(body), { status: 200 }));
}

describe("useConceptSearch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubEnv("VITE_GRAPHQL_URL", ENDPOINT);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not run for empty or blank search text", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const { result: empty } = renderHook(() => useConceptSearch(""), { wrapper });
    const { result: blank } = renderHook(() => useConceptSearch("   "), { wrapper });

    expect(empty.current.fetchStatus).toBe("idle");
    expect(blank.current.fetchStatus).toBe("idle");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends ResolveTerms with the search text, limit and offset", async () => {
    const fetchSpy = mockResponse({ data: { terms: termsPage } });

    const { result } = renderHook(
      () => useConceptSearch("  diabetes ", { limit: 10, offset: 30 }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(JSON.parse(init?.body as string)).toEqual({
      query: RESOLVE_TERMS_QUERY,
      variables: { query: "diabetes", limit: 10, offset: 30 },
    });
  });

  it("keys the query on the trimmed search text, limit and offset", async () => {
    mockResponse({ data: { terms: termsPage } });
    const { client, wrapper } = createWrapper();

    const { result } = renderHook(
      () => useConceptSearch("  diabetes ", { limit: 10, offset: 30 }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const keys = client.getQueryCache().getAll().map((q) => q.queryKey);
    expect(keys).toEqual([["resolveTerms", "diabetes", 10, 30]]);
  });

  it("defaults to the first 20 results", async () => {
    const fetchSpy = mockResponse({ data: { terms: termsPage } });

    const { result } = renderHook(() => useConceptSearch("diabetes"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(JSON.parse(fetchSpy.mock.calls[0][1]?.body as string).variables).toEqual({
      query: "diabetes",
      limit: 20,
      offset: 0,
    });
  });

  it("returns the page of terms", async () => {
    mockResponse({ data: { terms: termsPage } });

    const { result } = renderHook(() => useConceptSearch("diabetes"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(termsPage);
  });

  it("passes TanStack Query's abort signal to the request", async () => {
    const fetchSpy = mockResponse({ data: { terms: termsPage } });

    const { result } = renderHook(() => useConceptSearch("diabetes"), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchSpy.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal);
  });

  it("surfaces GraphQL errors", async () => {
    mockResponse({ data: null, errors: [{ message: "limit must be positive" }] });

    const { result } = renderHook(() => useConceptSearch("diabetes"), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe("limit must be positive");
  });

  it.each([
    ["terms is null", { data: { terms: null } }],
    ["data is null", { data: null }],
  ])("fails with 'Missing terms response' when %s", async (_case, body) => {
    mockResponse(body);

    const { result } = renderHook(() => useConceptSearch("diabetes"), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe("Missing terms response");
  });

  it("fails without a request when VITE_GRAPHQL_URL is not set", async () => {
    vi.stubEnv("VITE_GRAPHQL_URL", "");
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const { result } = renderHook(() => useConceptSearch("diabetes"), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe("VITE_GRAPHQL_URL is not set");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
