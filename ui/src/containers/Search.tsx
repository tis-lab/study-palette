import { useId, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Searchbar from "../components/Searchbar";
import ConceptCard from "../components/ConceptCard";
import Notification from "../components/Notification";
import { useConceptSearch } from "../hooks/useConceptSearch";

// ----------------------------------------------------------------------

export default function Search() {
  // Unique per instance, so it can't collide with ids in the host app
  const searchId = useId();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");

  // Top level: runs on every render, fetches only when `submitted` changes
  const { data, isLoading, isError, error } = useConceptSearch(submitted);

  const items = data?.items ?? [];
  const showSummary = submitted !== "" && !isLoading && !isError;

  return (
    <Stack spacing={1}>
      <Notification open={isError} severity="error" message={error?.message} />

      {/* Search controls stay mounted while results load */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Searchbar
          id={searchId}
          name="search"
          value={value}
          onChange={setValue}
          onSearch={setSubmitted}
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

      {isLoading && <CircularProgress aria-label="Searching concepts" />}

      {/* Always mounted so screen readers announce changes */}
      <Box role="status" aria-live="polite">
        {showSummary && (
          <Typography variant="body2" color="text.secondary">
            {items.length > 0 ? (
              <>
                Showing {items.length}{" "}
                {items.length === 1 ? "concept" : "concepts"} matching{" "}
                <strong>"{submitted}"</strong>
              </>
            ) : (
              <>
                No concepts match <strong>"{submitted}"</strong>. Try a
                different term.
              </>
            )}
          </Typography>
        )}
      </Box>

      {!isLoading && items.length > 0 && (
        <Stack>
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
      )}
    </Stack>
  );
}
