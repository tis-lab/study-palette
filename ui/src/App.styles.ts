// Temporary. App.tsx should stay minimal and unstyled, but for now it also hosts
// the local demo page (title, old dashboard). Remove this file with that demo
// once the cohort builder moves into the BDC repository.
import { Divider, styled } from "@mui/material";

/** Separates the cohort builder from the demo dashboard below it. */
export const SectionDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

/** MUI Typography has no margins, so the title block spaces itself. */
export const PageTitle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  marginBlock: theme.spacing(2, 3),
}));
