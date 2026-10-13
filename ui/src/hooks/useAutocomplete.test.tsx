import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAutocomplete } from "./useAutocomplete";
import { graphqlRequest } from "../api/graphql/graphqlRequest";
import { RESOLVE_SUGGESTIONS_QUERY } from "../api/graphql/queries/resolveSuggestions";

vi.mock("../api/config", () => ({
  getGraphQLEndpoint: () => "https://test.example/graphql",
}));

vi.mock("../api/graphql/graphqlRequest", () => ({
  graphqlRequest: vi.fn(),
}));

const mockRequest = vi.mocked(graphqlRequest);

const ITEMS = [
  { id: "1", label: "Aspirin" },
  { id: "2", label: "Aspirin 81 mg" },
];

// Fresh client per test so cached results never leak between tests.
// Retries are off so failures surface immediately instead of after backoff.
function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}

function renderAutocomplete(initialText: string) {
  return renderHook(({ text }) => useAutocomplete(text), {
    initialProps: { text: initialText },
    wrapper: createWrapper(),
  });
}

describe("useAutocomplete", () => {
  beforeEach(() => {
    mockRequest.mockResolvedValue({ autocomplete: { items: ITEMS } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when the text is empty", () => {
    it("does not request suggestions for an empty string", () => {
      const { result } = renderAutocomplete("");

      expect(mockRequest).not.toHaveBeenCalled();
      expect(result.current.fetchStatus).toBe("idle");
      expect(result.current.data).toBeUndefined();
    });

    it("does not request suggestions for whitespace only", () => {
      const { result } = renderAutocomplete("   ");

      expect(mockRequest).not.toHaveBeenCalled();
      expect(result.current.fetchStatus).toBe("idle");
    });
  });

  describe("request", () => {
    it("sends the trimmed text with the endpoint, query and abort signal", async () => {
      const { result } = renderAutocomplete("  aspirin  ");

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(mockRequest).toHaveBeenCalledWith({
        endpoint: "https://test.example/graphql",
        query: RESOLVE_SUGGESTIONS_QUERY,
        variables: { query: "aspirin" },
        signal: expect.any(AbortSignal),
      });
    });

    it("reuses the cached result for text that only differs by whitespace", async () => {
      const { result, rerender } = renderAutocomplete("aspirin");
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      rerender({ text: " aspirin " });

      expect(result.current.data).toEqual(ITEMS);
      expect(mockRequest).toHaveBeenCalledTimes(1);
    });

    it("requests again when the text changes", async () => {
      const { result, rerender } = renderAutocomplete("asp");
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      rerender({ text: "aspi" });

      await waitFor(() =>
        expect(mockRequest).toHaveBeenLastCalledWith(
          expect.objectContaining({ variables: { query: "aspi" } }),
        ),
      );
      expect(mockRequest).toHaveBeenCalledTimes(2);
    });

    it("stops requesting when the text is cleared", async () => {
      const { result, rerender } = renderAutocomplete("asp");
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      rerender({ text: "" });

      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(result.current.fetchStatus).toBe("idle");
    });
  });

  describe("response", () => {
    it("returns the suggestion items", async () => {
      const { result } = renderAutocomplete("aspirin");

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(ITEMS);
    });

    it("treats an empty items list as success, not an error", async () => {
      mockRequest.mockResolvedValue({ autocomplete: { items: [] } });
      const { result } = renderAutocomplete("zzz");

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual([]);
    });

    it("errors when items are missing from the response", async () => {
      mockRequest.mockResolvedValue({ autocomplete: {} });
      const { result } = renderAutocomplete("aspirin");

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe(
        "Missing suggestions response",
      );
    });

    it("errors when the autocomplete field is null", async () => {
      mockRequest.mockResolvedValue({ autocomplete: null });
      const { result } = renderAutocomplete("aspirin");

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe(
        "Missing suggestions response",
      );
    });

    it("errors when the response has no data", async () => {
      mockRequest.mockResolvedValue(null);
      const { result } = renderAutocomplete("aspirin");

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe(
        "Missing suggestions response",
      );
    });

    it("passes through errors thrown by the request", async () => {
      mockRequest.mockRejectedValue(new Error("Network down"));
      const { result } = renderAutocomplete("aspirin");

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe("Network down");
    });
  });
});
