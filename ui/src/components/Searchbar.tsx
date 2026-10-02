import { type ChangeEvent, type FormEvent } from "react";
import { InputBase, styled } from "@mui/material";
import { type InputBaseComponentProps } from "@mui/material/InputBase";
import { type SxProps, type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

/* Styles */
interface SearchbarRootProps {
  disabled?: boolean;
}

const SearchbarStyle = styled("form", {
  shouldForwardProp: (prop) => prop !== "disabled",
})<SearchbarRootProps>(({ theme, disabled }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.paper,
  border: "1px solid",
  borderColor: "#D1D5DC",
  borderRadius: "4px",

  "&:hover": { borderColor: theme.palette.text.disabled },
  "&:focus-within": {
    borderColor: theme.palette.primary.main,
  },
  ...(disabled
    ? {
        backgroundColor: theme.palette.action.disabledBackground,
        pointerEvents: "none" as const,
      }
    : {}),
}));

const InputBaseStyle = styled(InputBase)(({ theme }) => ({
  padding: "10px 16px",
  typography: "body1",
  fontSize: "14px",
  color: "text.primary",
  "& input": { padding: 0 },
  "& input::placeholder": { color: theme.palette.text.disabled, opacity: 1 },
}));

// ----------------------------------------------------------------------

/* Prop Types */
export interface SearchBarProps {
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
  /** Style overrides for the outer container. */
  sx?: SxProps<Theme>;
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
}: SearchBarProps) {
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
    <SearchbarStyle
      id={id}
      role="search"
      onSubmit={handleSubmit}
      disabled={disabled}
      noValidate
    >
      <InputBaseStyle
        type="search"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        fullWidth
        inputProps={{ "aria-label": ariaLabel, ...inputProps }}
      />
    </SearchbarStyle>
  );
}
