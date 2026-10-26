import { QueryClient } from "@tanstack/react-query";

// Created once at module scope so renders never replace it. Answers don't change
// within a session, so reuse them for 5 minutes; failures such as an unsupported
// concept won't pass on retry.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: false },
  },
});
