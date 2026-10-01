import { Button as MuiButton, styled } from "@mui/material";

// ----------------------------------------------------------------------

/* Styles */
const ButtonStyle = styled(MuiButton)({
  textTransform: "none",
  fontSize: "14px",
  backgroundColor: "#1A568C",
  padding: "12px 24px",
  borderRadius: "4px",
});

// ----------------------------------------------------------------------

/* Prop Types */
interface Props {
  onClick?: () => void;
  isSearch?: boolean;
  isDisabled?: boolean;
  formId?: string;
}

// ----------------------------------------------------------------------

export default function Button({
  onClick,
  isSearch = false,
  isDisabled = false,
  formId,
}: Props) {
  return (
    <ButtonStyle
      variant="contained"
      onClick={onClick}
      type={isSearch ? "submit" : "button"}
      disabled={isDisabled}
      form={formId}
    >
      Button
    </ButtonStyle>
  );
}
