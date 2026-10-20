import { styled } from "@mui/material";

// ----------------------------------------------------------------------

export const CohortBuilderLayout = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  alignItems: "start",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
  },
}));

export const Column = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  minWidth: 0,
}));
