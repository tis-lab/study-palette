import { Card, styled } from "@mui/material";

export const EmptyStateRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  // Keeps descriptions from stretching across wide containers
  maxWidth: 480,
  marginInline: "auto",
  textAlign: "center",
}));

/** A tinted, borderless prompt, so empty lists read as placeholders, not more boxes. */
export const EmptyCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));
