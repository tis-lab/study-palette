import { useId, useMemo, useState } from "react";
import {
  Box,
  Button,
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

// ----------------------------------------------------------------------

const PAGE_SIZE = 20;
const SUGGESTION_LIMIT = 10; // how many names the dropdown shows
const SUGGESTION_FETCH_LIMIT = 30; // how many results to request
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

  const [dismissedError, setDismissedError] = useState<Error | null>(null);

  // Actual search result: fetches only when `submitted` changes, controlled by searchbar and pagination
  const { data, isLoading, isError, error } = useConceptSearch(submitted, {
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  // Autocomplete suggestions: same hook, first 30 matches for the debounced typed text
  const suggestionText = useDebouncedValue(typed, SUGGESTION_DELAY_MS);
  const suggestions = useConceptSearch(suggestionText, {
    limit: SUGGESTION_FETCH_LIMIT,
  });
  const suggestionItems = suggestions.data?.items;
  // de-duplicate and use first 10 distinct terms
  const suggestedNames = useMemo(
    () =>
      uniqueLabels(
        (suggestionItems ?? []).map((term) => term.label),
        SUGGESTION_LIMIT,
      ),
    [suggestionItems],
  );

  const items = data?.items ?? [];
  const showSummary = submitted !== "" && !isLoading && !isError;
  const pageCount = data ? Math.ceil(data.total / data.limit) : 0;

  const start = data && data.offset + 1;
  const end = data && data.offset + data.items.length;

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

  return (
    <Stack spacing={1}>
      {/* Search error */}
      <Notification
        open={isError && error !== dismissedError}
        onClose={() => setDismissedError(error)}
        severity="error"
        message={error?.message}
      />

      {/* Searchbar with button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Searchbar
          id={searchId}
          name="search"
          value={value}
          onChange={handleChange}
          onSearch={handleSearch}
          onSelect={handleSelect}
          options={suggestedNames}
          loading={suggestions.isFetching}
        />
        <Button
          type="submit"
          form={searchId}
          variant="contained"
          sx={{ flexShrink: 0 }}
        >
          Search
        </Button>
      </Box>

      {/* Search Result */}
      {isLoading ? (
        <CircularProgress aria-label="Searching concepts" />
      ) : (
        <>
          {/* Search Summary */}
          {showSummary && (
            <Box role="status" aria-live="polite">
              <Typography variant="body2" color="text.secondary">
                {items.length > 0 ? (
                  <>
                    Showing {start?.toLocaleString()}–{end?.toLocaleString()} of{" "}
                    {data?.total.toLocaleString()}{" "}
                    {data?.total === 1 ? "concept" : "concepts"} matching{" "}
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

          {items.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Result Cards */}
              <Stack width="100%">
                {items.map((c, i) => (
                  <ConceptCard
                    key={c.id}
                    concept={c}
                    isFirst={i === 0}
                    isLast={i === items.length - 1}
                    // onInclude={onInclude}
                    // onExclude={onExclude}
                  />
                ))}
              </Stack>

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
            </Box>
          )}
        </>
      )}
    </Stack>
  );
}
