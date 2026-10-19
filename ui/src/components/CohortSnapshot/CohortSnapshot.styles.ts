import { Typography, styled } from "@mui/material";

export const SnapshotPanel = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

/** Overline styling without its tall line height, so the subtitle sits close. */
export const SnapshotTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.overline,
  margin: 0,
  lineHeight: 1.4,
  fontWeight: theme.typography.fontWeightBold,
}));

/**
 * echarts-for-react sizes itself with an inline style (300px tall by default),
 * which a class can't override, so the chart takes this style instead.
 */
export const FILL_PARENT = { width: "100%", height: "100%" };

/** Positions the total over the middle of the donut. */
export const Donut = styled("div")({
  position: "relative",
  height: 200,
});

export const DonutCenter = styled("div")({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
});

/** Fits inside the donut's hole. */
export const DonutCaption = styled(Typography)({
  maxWidth: 140,
  textAlign: "center",
  lineHeight: 1.3,
});

/** The study count and footnote, centered under the donut. */
export const SnapshotFooter = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(0.5),
  textAlign: "center",
}));
