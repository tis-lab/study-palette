import { Card, styled } from "@mui/material";

type Align = "center" | "start";

const notAlign = { shouldForwardProp: (prop: PropertyKey) => prop !== "align" };

export const EmptyStateRoot = styled("div", notAlign)<{ align: Align }>(
  ({ theme, align }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    ...(align === "center"
      ? {
          flexDirection: "column",
          gap: theme.spacing(1),
          // Keeps descriptions from stretching across wide containers
          maxWidth: 480,
          marginInline: "auto",
          textAlign: "center",
        }
      : { gap: theme.spacing(2) }),
  }),
);

export const EmptyStateText = styled("div", notAlign)<{ align: Align }>(
  ({ theme, align }) => ({
    display: "flex",
    flexDirection: "column",
    ...(align === "center"
      ? { alignItems: "center", gap: theme.spacing(1) }
      : { alignItems: "flex-start" }),
  }),
);

/** A tinted, borderless prompt, so empty lists read as placeholders, not more boxes. */
export const EmptyCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));
