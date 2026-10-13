import { useQuery } from "@tanstack/react-query";
import { getGraphQLEndpoint } from "../api/config";
import { graphqlRequest } from "../api/graphql/graphqlRequest";
import {
  RESOLVE_SUGGESTIONS_QUERY,
  ResolveSuggestionsData,
  ResolveSuggestionsVariables,
} from "../api/graphql/queries/resolveSuggestions";

export function useAutocomplete(searchText: string) {
  const query = searchText.trim();

  return useQuery({
    queryKey: ["resolveSuggestions", query],
    queryFn: async ({ signal }) => {
      const data = await graphqlRequest<
        ResolveSuggestionsData,
        ResolveSuggestionsVariables
      >({
        endpoint: getGraphQLEndpoint(),
        query: RESOLVE_SUGGESTIONS_QUERY,
        variables: { query },
        signal,
      });

      const items = data?.autocomplete?.items;
      if (!items) {
        throw new Error("Missing suggestions response");
      }
      return items;
    },
    enabled: query.length > 0,
  });
}
