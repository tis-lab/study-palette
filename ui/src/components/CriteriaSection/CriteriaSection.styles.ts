import { Card, Stack, styled } from "@mui/material";

export const CriteriaSectionRoot = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  minWidth: 0,
}));

export const SectionHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const CriteriaList = styled(Stack)({
  width: "100%",
});

/** Muted, so an empty list reads as a placeholder. */
export const EmptyCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));
