import { Button as MuiButton, styled, ButtonProps } from "@mui/material";

// ----------------------------------------------------------------------

/* Styles */
const StyledButton = styled(MuiButton)({
  textTransform: "none",
  fontSize: 14,
  padding: "10px 20px",
  borderRadius: 4,
});

// ----------------------------------------------------------------------

/* Prop Types */
interface Props extends Pick<
  ButtonProps,
  "onClick" | "children" | "color" | "variant" | "sx"
> {
  isSearch?: boolean;
  isDisabled?: boolean;
  formId?: string;
}

// ----------------------------------------------------------------------

export default function Button({
  isSearch,
  isDisabled,
  formId,
  ...rest
}: Props) {
  return (
    <StyledButton
      type={isSearch ? "submit" : "button"}
      disabled={isDisabled}
      form={formId}
      disableElevation
      {...rest}
    />
  );
}

export const PrimaryButton = (props: Props) => (
  <Button
    {...props}
    variant="contained"
    sx={{
      backgroundColor: "#1A568C",
      "&:hover": { backgroundColor: "#144470" },
    }}
  />
);
