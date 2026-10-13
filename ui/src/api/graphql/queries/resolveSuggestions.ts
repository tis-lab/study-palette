export const RESOLVE_SUGGESTIONS_QUERY = `
    query ResolveSuggestions($query: String!) {
        autocomplete(query: $query) {
            items {
                id
                label
            }
        }
    }
`;

export interface ResolveSuggestionsVariables {
  query: string;
}

// only retrieved data needed
export interface Suggestion {
  id: string;
  label: string;
}

export interface ResolveSuggestionsData {
  autocomplete: {
    items: Suggestion[];
  };
}
