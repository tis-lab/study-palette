/** Resolves free-text search terms to concepts, paginated by `limit` and `offset`. */
export const RESOLVE_TERMS_QUERY = `
  query ResolveTerms($query: String!, $limit: Int!, $offset: Int!) {
    terms(query: $query, limit: $limit, offset: $offset) {
      bdcVariables {
        name
        label
        domain
        studyCount
        studies
        concepts
      }
      items {
        id
        label
        category
        description
        synonyms
        bdc {
          studyCount
          studies
          variableNames
        }
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

// Nullability mirrors the GraphQL schema.

// `studyCount` is the number of studies the concept is harmonized in, not data
// availability; 0 is common.
export interface BdcCoverage {
  studyCount: number;
  studies: string[];
  variableNames: string[];
}

export interface BdcVariable {
  name: string;
  label: string;
  domain: string | null;
  studyCount: number;
  studies: string[];
  concepts: string[];
}

export interface Term {
  id: string;
  label: string;
  category: string;
  description: string | null;
  synonyms: string[] | null;
  bdc: BdcCoverage;
}

export interface TermsPage {
  bdcVariables: BdcVariable[];
  items: Term[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface ResolveTermsData {
  terms: TermsPage | null;
}
