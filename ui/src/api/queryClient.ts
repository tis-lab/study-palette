import { QueryClient } from "@tanstack/react-query";

// Created once at module scope so renders never replace it.
export const queryClient = new QueryClient();
