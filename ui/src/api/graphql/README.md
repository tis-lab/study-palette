# GraphQL client

Study Palette sends GraphQL operations to the BDC middleware through TanStack Query:

```text
component → feature hook → useQuery → graphqlRequest() → GraphQL endpoint
```

Components never call `fetch` or contain GraphQL documents themselves.

## Structure

| File | Role |
|------|------|
| `src/api/queryClient.ts` | The `QueryClient`, created once at module scope |
| `src/CohortBuilder.tsx` | The root: app-wide providers, including `QueryClientProvider`, around `<App />` |
| `src/api/graphql/graphqlRequest.ts` | `graphqlRequest()`: sends one operation and returns its `data` |
| `src/hooks/` | Feature hooks, one per operation |

Both the standalone app (`main.tsx`) and the published package (`index.ts`) render
`CohortBuilder`, so a host application does not need to supply a provider or install
TanStack Query.

## Request helper

TanStack Query manages loading state, caching and refetching, but it does not send
requests. It calls whatever function a hook gives it. `graphqlRequest()` is that function
for GraphQL: it POSTs `{ query, variables }` as JSON to the endpoint and unwraps the
response.

## Adding a query

Each feature defines its own operation, variable and response types, query key and hook,
in `src/hooks/`:

```ts
// src/hooks/useExample.ts
import { useQuery } from "@tanstack/react-query";
import { graphqlRequest } from "../api/graphql/graphqlRequest";

const EXAMPLE_QUERY = `
  query Example($id: ID!) {
    example(id: $id) { id label }
  }
`;

interface ExampleVariables {
  id: string;
}

interface ExampleData {
  example: { id: string; label: string };
}

export function useExample(endpoint: string, id: string) {
  return useQuery({
    queryKey: ["example", id],
    queryFn: ({ signal }) =>
      graphqlRequest<ExampleData, ExampleVariables>({
        endpoint,
        query: EXAMPLE_QUERY,
        variables: { id },
        signal,
      }),
    enabled: id.length > 0,
  });
}
```

- **`queryKey`** must include every variable, so that changing one fetches again and each
  result is cached separately.
- **`signal`** lets TanStack Query cancel a request that is no longer needed, such as when
  the user types again or the component unmounts.
- **`enabled`** stops the query from running until it has valid input.

A component then reads `data`, `error` and `isPending` from the hook.

## The endpoint

`graphqlRequest()` requires an `endpoint` and does not read any configuration itself.
Where the middleware URL comes from (an environment variable, or a value supplied by a
host application such as the BDC Portal) has not been decided yet and is left to the
calling feature.

## Errors

`graphqlRequest()` throws a plain `Error` when:

- the response has a non-2xx status: `GraphQL request failed: HTTP <status>`
- the response contains `errors[]`: their messages, joined with `; `
- the response has no `data`: `GraphQL response contained no data`

Network failures and cancellations surface as the original `fetch` error. TanStack Query
puts any of these on the hook's `error`, so components can display `error.message`.

TanStack Query runs with its default options: failed queries are retried 3 times, and
data is refetched when the window regains focus.
