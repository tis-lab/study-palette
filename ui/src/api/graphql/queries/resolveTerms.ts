// Contract supplied by the BDC middleware team.
export const RESOLVE_TERMS_QUERY = `
  query ResolveTerms($query: String!, $limit: Int!, $offset: Int!) {
    terms(query: $query, limit: $limit, offset: $offset) {
      items {
        id
        label
        category
        description
        synonyms
      }
      total
      limit
      offset
      hasMore
    }
  }
`;

export interface ResolveTermsVariables {
  query: string;
  limit: number;
  offset: number;
}

// Nullability follows the middleware schema (Term.description: String, Term.synonyms: [String!]).
export interface Term {
  id: string;
  label: string;
  category: string;
  description: string | null;
  synonyms: string[] | null;
}

export interface TermsPage {
  items: Term[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface ResolveTermsData {
  terms: TermsPage | null;
}
