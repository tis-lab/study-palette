import { Box, Stack } from "@mui/material";
import Searchbar from "../components/Searchbar";
import { PrimaryButton } from "../components/Button";
import { ChangeEvent, useState } from "react";
import { useConceptSearch } from "../hooks/useConceptSearch";

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
        <Stack direction="row" spacing={2}>
          <Searchbar
            id="search"
            name="search"
            value={value}
            onChange={onChange}
            onSearch={onSearch}
          />
          <PrimaryButton formId="search">Search</PrimaryButton>
        </Stack>
      )}
    </Box>
  );
}
