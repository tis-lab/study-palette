import { Button as MuiButton, styled, ButtonProps } from "@mui/material";

// ----------------------------------------------------------------------

/* Styles */
const StyledButton = styled(MuiButton)({
  textTransform: "none",
  fontSize: 14,
  padding: "10px 20px",
  borderRadius: 4,
  fontFamily: '"Montserrat", sans-serif',
});

const primaryStyles = {
  contained: {
    backgroundColor: "#1A568C",
    "&:hover": { backgroundColor: "#144470" },
  },
  outlined: {
    color: "#1A568C",
    borderColor: "#1A568C",
    padding: "8px 16px",
    "&:hover": {
      borderColor: "#144470",
      backgroundColor: "rgba(26, 86, 140, 0.04)",
    },
  },
};

// ----------------------------------------------------------------------

/* Prop Types */
interface Props extends Pick<
  ButtonProps,
  "onClick" | "children" | "color" | "variant" | "sx" | "type"
> {
  isDisabled?: boolean;
  formId?: string;
}

interface PrimaryButtonProps extends Omit<Props, "variant"> {
  variant?: keyof typeof primaryStyles;
}

// ----------------------------------------------------------------------

export default function Button({ isDisabled, formId, ...rest }: Props) {
  return (
    <StyledButton
      type={formId ? "submit" : "button"}
      disabled={isDisabled}
      form={formId}
      disableElevation
      {...rest}
    />
  );
}

export const PrimaryButton = ({
  variant = "contained",
  ...props
}: PrimaryButtonProps) => (
  <Button {...props} variant={variant} sx={primaryStyles[variant]} />
);
