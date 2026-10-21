import { Button, Card, Stack, styled } from "@mui/material";

// ----------------------------------------------------------------------

/** Fills its column, so the getting-started card can take up the spare height. */
export const SearchRoot = styled(Stack)({
  flexGrow: 1,
});

/** Grows to line the column up with its neighbour, content centred. */
export const GettingStarted = styled(Card)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

/** Search input and button side by side. */
export const SearchRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

/** Keeps the button at its natural width when the input grows. */
export const SearchButton = styled(Button)({
  flexShrink: 0,
});

/** Result cards with the pagination centered below them. */
export const Results = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const ResultList = styled(Stack)({
  width: "100%",
  maxHeight: 480,
  overflowY: "auto",
  // Flex children shrink by default; keep each card's height so the box scrolls
  "& > *": { flexShrink: 0 },
});
