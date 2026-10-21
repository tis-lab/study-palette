import { styled } from "@mui/material";
import { Panel } from "../components/Panel/Panel.styles";

// ----------------------------------------------------------------------

export const CohortBuilderLayout = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
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

/** Snapshot and demographics share one panel, spaced like separate cards. Sized
 * to its content; only the left column stretches to match. */
export const Overview = styled(Panel)(({ theme }) => ({
  gap: theme.spacing(3),
  alignSelf: "start",
}));
