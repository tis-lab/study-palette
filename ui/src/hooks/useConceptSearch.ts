import { useQuery } from "@tanstack/react-query";
import { getGraphQLEndpoint } from "../api/config";
import { graphqlRequest } from "../api/graphql/graphqlRequest";
import {
  RESOLVE_TERMS_QUERY,
  type ResolveTermsData,
  type ResolveTermsVariables,
} from "../api/graphql/queries/resolveTerms";

interface ConceptSearchOptions {
  limit?: number;
  offset?: number;
}

/**
 * Resolves `searchText` to BDC concepts. Runs only when the text is non-empty;
 * the caller decides when the text changes (on submit, while typing, ...).
 */
export function useConceptSearch(
  searchText: string,
  { limit = 20, offset = 0 }: ConceptSearchOptions = {},
) {
  const query = searchText.trim();

  return useQuery({
    queryKey: ["resolveTerms", query, limit, offset],
    queryFn: async ({ signal }) => {
      const data = await graphqlRequest<ResolveTermsData, ResolveTermsVariables>({
        endpoint: getGraphQLEndpoint(),
        query: RESOLVE_TERMS_QUERY,
        variables: { query, limit, offset },
        signal,
      });
      if (!data?.terms) {
        throw new Error("Missing terms response");
      }
      return data.terms;
    },
    enabled: query.length > 0,
  });
}
