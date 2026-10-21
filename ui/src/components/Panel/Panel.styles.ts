import { styled } from "@mui/material";

export const Panel = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const PanelTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.overline,
  margin: 0,
}));
