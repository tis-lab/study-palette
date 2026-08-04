// Categorical sequence built on the BDC Style Guide palette. Red is excluded —
// the guide reserves it for danger and accents — and violet is excluded because
// it is indistinguishable from Catalyst Blue under deuteranopia.
//
// Every entry clears 3:1 against white, and every pair stays separable under
// protanopia, deuteranopia, and tritanopia. For binary splits use BINARY, whose
// two hues sit at opposite ends of the blue-gold axis that dichromats retain.
export const CHART_SEQUENCE = [
  "#12385a",
  "#1a568c",
  "#2b7a9e",
  "#8a6100",
  "#616265",
];

export const BINARY = ["#1a568c", "#8a6100"];

export const UNCATEGORIZED = "#616265";

// Below 0.85 a fill drops under the 3:1 non-text contrast floor against white.
export const MIN_FILL_OPACITY = 0.85;
