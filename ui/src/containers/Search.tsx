import { Box, Stack, Typography } from "@mui/material";
import Searchbar from "../components/Searchbar";
import { PrimaryButton } from "../components/Button";
import { ChangeEvent, useState } from "react";
import { useConceptSearch } from "../hooks/useConceptSearch";
import ConceptCard from "../components/ConceptCard";

export default function Search() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");

  // Top level: runs on every render, fetches only when `submitted` changes
  const { data, isLoading, isError, error } = useConceptSearch(submitted);

  const onChange = (
    v: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(v);
  };

  const onSearch = (v: string) => {
    setSubmitted(v);
  };

  console.log(data);
  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Searchbar
              id="search"
              name="search"
              value={value}
              onChange={onChange}
              onSearch={onSearch}
            />
            <Box>
              <PrimaryButton formId="search">Search</PrimaryButton>
            </Box>
          </Box>
          {data?.items && data.items.length > 0 && (
            <Typography sx={{ fontSize: 14 }}>
              Showing {data.items.length} concepts matching <b>"{submitted}"</b>
            </Typography>
          )}
          <Stack>
            {data?.items &&
              data?.items.map((c, i) => (
                <ConceptCard
                  key={c.id}
                  concept={c}
                  isFirst={i === 0}
                  isLast={i === data.items.length - 1}
                  // onInclude={onInclude}
                  // onExclude={onExclude}
                />
              ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
