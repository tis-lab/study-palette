import { useId, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Searchbar from "../components/Searchbar";
import ConceptCard from "../components/ConceptCard/ConceptCard";
import Notification from "../components/Notification/Notification";
import { useConceptSearch } from "../hooks/useConceptSearch";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { uniqueLabels } from "../utils/uniqueLabels";
import { useConceptSuggestions } from "../hooks/useConceptSuggestions";
import { ResultList, Results, SearchButton, SearchRow } from "./Search.styles";
import { getSearchItemKey } from "../api/graphql/queries/resolveTerms";

// ----------------------------------------------------------------------

const PAGE_SIZE = 20;
const SUGGESTION_LIMIT = 10; // how many names the dropdown shows
const SUGGESTION_DELAY_MS = 300;

export default function Search() {
  // Unique per instance, so it can't collide with ids in the app
  const searchId = useId();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [page, setPage] = useState(1);
  // Text the user typed. Kept apart from `value` so that filling the input
  // with a selected option's label doesn't fetch suggestions for that label.
  const [typed, setTyped] = useState("");

  // Each notification remembers the error it was closed for, so it stays
  // closed until its query fails again with a new error
  const [dismissedSearchError, setDismissedSearchError] =
    useState<Error | null>(null);
  const [dismissedSuggestionError, setDismissedSuggestionError] =
    useState<Error | null>(null);

  // Actual search result: fetches only when `submitted` changes, controlled by searchbar and pagination
  const {
    data: searchData,
    isLoading: isLoadingSearchResult,
    isError: isSearchError,
    error: searchError,
  } = useConceptSearch(submitted, {
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  // Autocomplete suggestions for the debounced typed text
  const suggestionText = useDebouncedValue(typed, SUGGESTION_DELAY_MS);
  const {
    data: suggestionData,
    isFetching: isFetchingSuggestions,
    isError: isSuggestionError,
    error: suggestionError,
  } = useConceptSuggestions(suggestionText);

  // The hook is disabled for empty text; ignore any data kept from the
  // previous query so the dropdown clears with the input
  const hasSuggestionQuery = suggestionText.trim() !== "";
  const suggestionItems = hasSuggestionQuery
    ? suggestionData?.items
    : undefined;
  // de-duplicate and use first 10 distinct terms
  const suggestedNames = useMemo(
    () =>
      uniqueLabels(
        (suggestionItems ?? []).map((term) => term.label),
        SUGGESTION_LIMIT,
      ),
    [suggestionItems],
  );

  const searchItems = searchData?.items ?? [];
  const showSummary =
    submitted !== "" && !isLoadingSearchResult && !isSearchError;
  const pageCount = searchData
    ? Math.ceil(searchData.total / searchData.limit)
    : 0;

  const start = searchData && searchData.offset + 1;
  const end = searchData && searchData.offset + searchData.items.length;

  const handleSearch = (text: string) => {
    setSubmitted(text);
    setPage(1);
  };

  const handleChange = (text: string, reason: string) => {
    setValue(text);
    if (reason === "input") setTyped(text);
  };

  const handleSelect = (name: string) => {
    handleSearch(name);
  };

  console.log(searchData);

  return (
    <Stack spacing={1}>
      {/* Search error */}
      <Notification
        open={isSearchError && searchError !== dismissedSearchError}
        onClose={() => setDismissedSearchError(searchError)}
        severity="error"
        message={searchError?.message}
      />

      {/* Autocomplete error: search still works, so this is a warning */}
      <Notification
        open={isSuggestionError && suggestionError !== dismissedSuggestionError}
        onClose={() => setDismissedSuggestionError(suggestionError)}
        severity="warning"
        message="Suggestions are unavailable right now. You can still search."
      />

      {/* Searchbar with button */}
      <SearchRow>
        <Searchbar
          id={searchId}
          name="search"
          value={value}
          onChange={handleChange}
          onSearch={handleSearch}
          onSelect={handleSelect}
          options={suggestedNames}
          loading={hasSuggestionQuery && isFetchingSuggestions}
        />
        <SearchButton type="submit" form={searchId} variant="contained">
          Search
        </SearchButton>
      </SearchRow>

      {/* Search Result */}
      {isLoadingSearchResult ? (
        <CircularProgress aria-label="Searching concepts" />
      ) : (
        <>
          {/* Search Summary */}
          {showSummary && (
            <Box role="status" aria-live="polite">
              <Typography variant="body2" color="text.secondary">
                {searchItems.length > 0 ? (
                  <>
                    Showing {start?.toLocaleString()}–{end?.toLocaleString()} of{" "}
                    {searchData?.total.toLocaleString()}{" "}
                    {searchData?.total === 1 ? "concept" : "concepts"} matching{" "}
                    <strong>"{submitted}"</strong>
                  </>
                ) : (
                  <>
                    No concepts match <strong>"{submitted}"</strong>. Try a
                    different term.
                  </>
                )}
              </Typography>
            </Box>
          )}

          {searchItems.length > 0 && (
            <Results>
              {/* Result Cards */}
              <ResultList>
                {searchItems.map((c, i) => (
                  <ConceptCard
                    key={getSearchItemKey(c)}
                    concept={c}
                    isFirst={i === 0}
                    isLast={i === searchItems.length - 1}
                    // onInclude={onInclude}
                    // onExclude={onExclude}
                  />
                ))}
              </ResultList>

              {/* Pagination */}
              {pageCount > 1 && (
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, value) => {
                    setPage(value);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  color="primary"
                />
              )}
            </Results>
          )}
        </>
      )}
    </Stack>
  );
}
