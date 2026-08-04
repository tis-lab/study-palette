// Figure colours follow Paul Tol, "Colour Schemes", SRON/EPS/TN/09-002, issue
// 3.2 (2021). The BDC Style Guide governs UI chrome — buttons, links, nav,
// headers — and is silent on charts and figures, so those follow figure best
// practice instead.
//
// No qualitative scheme can meet the 3:1 non-text contrast floor against white:
// Tol shows the best achievable minimum is 2.1 for three colours and 1.5 for
// six, because these schemes separate by hue as well as brightness. Every fill
// therefore carries STROKE, which delineates it against both the white card and
// its neighbours. Contrast alone is not enough — Tol's own remedy is to vary
// symbols and line styles too, which is still outstanding for these charts.

export interface Palette {
  label: string;
  source: string;
  sequence: string[];
  binary: [string, string];
  uncategorized: string;
}

// Tol's default qualitative scheme, in his prescribed fixed order:
// blue, red, green, yellow, cyan, purple.
export const TOL_BRIGHT: Palette = {
  label: "Tol bright",
  source: 'Tol, "Colour Schemes" SRON/EPS/TN/09-002 issue 3.2, Fig. 1',
  sequence: ["#4477aa", "#ee6677", "#228833", "#ccbb44", "#66ccee", "#aa3377"],
  binary: ["#4477aa", "#ee6677"],
  // Tol reserves grey for bad or missing data, deliberately pale so it does not
  // draw attention.
  uncategorized: "#dddddd",
};

// Kept alongside for comparison while the choice is under review.
export const OKABE_ITO: Palette = {
  label: "Okabe-Ito",
  source: "Okabe & Ito, Color Universal Design (2002, rev. 2008)",
  sequence: [
    "#0072b2",
    "#d55e00",
    "#009e73",
    "#cc79a7",
    "#e69f00",
    "#56b4e9",
    "#f0e442",
    "#000000",
  ],
  binary: ["#0072b2", "#d55e00"],
  uncategorized: "#dddddd",
};

export const PALETTES = {
  tol: TOL_BRIGHT,
  okabe: OKABE_ITO,
} as const;

export type PaletteKey = keyof typeof PALETTES;

export const DEFAULT_PALETTE: PaletteKey = "tol";

// Catalyst Dark Gray, 11.55:1 against the white card.
export const FILL_STROKE = "#393939";

export const MIN_FILL_OPACITY = 0.85;
