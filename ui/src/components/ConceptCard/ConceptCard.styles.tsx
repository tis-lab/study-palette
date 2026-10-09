import { Card, styled } from "@mui/material";

interface ConceptCardRootProps {
  isFirst: boolean;
  isLast: boolean;
}

export const ConceptCardRoot = styled(Card, {
  name: "CohortConceptCard",
  slot: "Root",
  shouldForwardProp: (prop) => prop !== "isFirst" && prop !== "isLast",
})<ConceptCardRootProps>(({ isFirst, isLast }) => ({
  // Outer corners inherit the theme's Card radius; only flatten inner corners
  ...(!isFirst && {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: "none", // adjacent cards share a single line
  }),
  ...(!isLast && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }),
}));
