import { styled } from "@mui/material";

// ----------------------------------------------------------------------

/** Search on the left, cohort snapshot on the right; stacked on small screens. */
export const CohortBuilderLayout = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  alignItems: "start",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
  },
}));

/** Search, results, then the Include and Exclude sections. */
export const MainColumn = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  minWidth: 0,
}));

export const SnapshotPanel = styled("aside")(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));
