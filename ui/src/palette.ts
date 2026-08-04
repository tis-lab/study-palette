// Okabe & Ito (2002, rev. 2008), "Color Universal Design (CUD): How to make
// figures and presentations that are friendly to Colorblind people" — the de
// facto standard for colourblind-safe categorical figures, popularised by Wong,
// Nature Methods 8, 441 (2011), and the R 4.0+ default.
//
// The BDC Style Guide governs UI chrome — buttons, links, nav, headers — and is
// silent on charts and figures, so those follow figure best practice instead.
// The sequence leads with Okabe-Ito blue, which sits dE 12.7 from Catalyst Blue,
// keeping figures visually compatible with the brand without being constrained
// by it.
//
// Okabe-Ito optimises for separating series from each other, not for contrast
// against a white page: orange, sky blue, and yellow all fall below the 3:1
// non-text floor. FILL_STROKE covers that — every fill needs it.
export const CHART_SEQUENCE = [
  "#0072b2",
  "#d55e00",
  "#009e73",
  "#cc79a7",
  "#e69f00",
  "#56b4e9",
  "#f0e442",
  "#000000",
];

export const BINARY = ["#0072b2", "#d55e00"];

// NHLBI Gray — a neutral for "no category", deliberately outside the sequence.
export const UNCATEGORIZED = "#616265";

// Catalyst Dark Gray. Delineates every fill against both the white card and its
// neighbours, which is what makes the low-contrast entries safe to use.
export const FILL_STROKE = "#393939";

export const MIN_FILL_OPACITY = 0.85;
