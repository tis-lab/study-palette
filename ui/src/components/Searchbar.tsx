import { ChangeEvent, FormEvent } from "react";
import { InputAdornment, OutlinedInput, styled } from "@mui/material";
import { InputBaseComponentProps } from "@mui/material/InputBase";
import { Search } from "@mui/icons-material";

// ----------------------------------------------------------------------

/* Styles */
const SearchbarRoot = styled("form", {
  name: "ConceptTermSearchbar",
  slot: "Root",
})({
  display: "flex",
  width: "100%",
});

// ----------------------------------------------------------------------

/* Prop Types */
export interface Props {
  id: string;
  value: string;
  onChange: (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  name?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  /** Extra attributes passed to the underlying <input>. */
  inputProps?: InputBaseComponentProps;
}

// ----------------------------------------------------------------------

export default function Searchbar({
  id,
  value,
  onChange,
  onSearch,
  placeholder,
  ariaLabel = "Search",
  name,
  autoFocus = false,
  disabled = false,
  inputProps,
}: Props) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value, event);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <SearchbarRoot id={id} role="search" onSubmit={handleSubmit} noValidate>
      <OutlinedInput
        type="search"
        size="small"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        startAdornment={
          <InputAdornment position="start">
            <Search fontSize="small" />
          </InputAdornment>
        }
        fullWidth
        inputProps={{ "aria-label": ariaLabel, ...inputProps }}
      />
    </SearchbarRoot>
  );
}
