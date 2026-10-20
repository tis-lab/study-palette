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

// overline's default line height leaves a gap above the subtitle
export const SnapshotTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.overline,
  margin: 0,
  lineHeight: 1.4,
  fontWeight: theme.typography.fontWeightBold,
}));

// echarts-for-react sizes itself inline (300px default), so it needs a style, not a class
export const FILL_PARENT = { width: "100%", height: "100%" };

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

export const DonutCaption = styled(Typography)({
  maxWidth: 140,
  textAlign: "center",
  lineHeight: 1.3,
});

export const SnapshotFooter = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(0.5),
  textAlign: "center",
}));
