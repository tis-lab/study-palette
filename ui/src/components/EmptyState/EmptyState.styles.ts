import { styled } from "@mui/material";

export const EmptyStateRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  textAlign: "center",
}));
