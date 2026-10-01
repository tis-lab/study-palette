import { Button as MuiButton, styled } from "@mui/material";
import { ReactNode } from "react";

// ----------------------------------------------------------------------

/* Styles */
const ButtonStyle = styled(MuiButton)({
  textTransform: "none",
  fontSize: "14px",
  backgroundColor: "#1A568C",
  padding: "10px 20px",
  borderRadius: "4px",
});

// ----------------------------------------------------------------------

/* Prop Types */
interface Props {
  onClick?: () => void;
  isSearch?: boolean;
  isDisabled?: boolean;
  formId?: string;
  children: ReactNode;
}

// ----------------------------------------------------------------------

export default function Button({
  onClick,
  isSearch = false,
  isDisabled = false,
  formId,
  children,
}: Props) {
  return (
    <ButtonStyle
      variant="contained"
      onClick={onClick}
      type={isSearch ? "submit" : "button"}
      disabled={isDisabled}
      form={formId}
      disableElevation
    >
      {children}
    </ButtonStyle>
  );
}
