import { useId, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Searchbar from "../components/Searchbar";
import ConceptCard from "../components/ConceptCard";
import Notification from "../components/Notification";
import { useConceptSearch } from "../hooks/useConceptSearch";

// ----------------------------------------------------------------------

const PAGE_SIZE = 20;

export default function Search() {
  // Unique per instance, so it can't collide with ids in the app
  const searchId = useId();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [page, setPage] = useState(1);

  const [dismissedError, setDismissedError] = useState<Error | null>(null);

  // Top level: runs on every render, fetches only when `submitted` changes
  const { data, isLoading, isError, error } = useConceptSearch(submitted, {
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  const items = data?.items ?? [];
  const showSummary = submitted !== "" && !isLoading && !isError;
  const pageCount = data ? Math.ceil(data.total / data.limit) : 0;

  const start = data && data.offset + 1;
  const end = data && data.offset + data.items.length;

  const handleSearch = (text: string) => {
    setSubmitted(text);
    setPage(1);
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Searchbar
          id={searchId}
          name="search"
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
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

      {isLoading ? (
        <CircularProgress aria-label="Searching concepts" />
      ) : (
        <>
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
