import { Divider, styled } from "@mui/material";

/** Separates the cohort builder from the demo dashboard below it. */
export const SectionDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));
