# Branding placeholders

The files in this directory are **neutral placeholders**, not BDC branding. They exist so
that the header layout already satisfies the placement rules in the
[NHLBI BioData Catalyst® (BDC) Style Guide](https://www.biodatacatalyst.org/assets/BrandingContent/BioDataCatalyst-StyleGuide.pdf),
and so a `.gov` deployment can drop the real assets in by overwriting files rather than
by changing layout code.

## Which mark applies

Study Palette uses the plain BDC logo, not a "Powered by" lockup.

The style guide requires the "Powered by" lockup of "each BDC platform" — the third-party
platforms integrated into the ecosystem, listed by name in the guide's word bank: Gen3,
Terra, PIC-SURE, Seven Bridges, Dockstore, Dug, and HeLx. Study Palette is a first-party
BDC tool, so the plain BDC horizontal logo is the correct mark and no bespoke lockup needs
to be commissioned.

## Where branding may appear

The style guide is explicit: platforms may display BDC branding **only on `.gov` pages**.

That means the placeholders stay in place on `study-palette.netlify.app`, on the Render
services, and on the GitHub Pages site. Swapping in the real logo there would violate the
guide regardless of who deploys it. Only a `.gov` instance gets the real assets.

The project *name* is not restricted the same way — the guide permits using the written
name "NHLBI BioData Catalyst" to describe the source of data on any page. Only the logo
and other marks are `.gov`-only.

## Files

| File | Real asset it stands in for | Dimensions |
|---|---|---|
| `bdc-logo.svg` | `BDC_Horizontal-Color.svg` | 568.34 × 67.04 (≈8.5:1) |
| `favicon.png` | `BDC_Favicon.png` | 512 × 512 |

Dimensions match the official assets in
[BDC-Logos.zip](https://www.biodatacatalyst.org/assets/BrandingContent/BDC-Logos.zip)
so that overwriting a file needs no CSS changes.

## Swapping in the real assets

1. Take the two files named above from `BDC-Logos.zip`.
2. Overwrite `bdc-logo.svg` and `favicon.png` with them, keeping these names.
3. Update the `alt` text on the logo in `ui/src/App.tsx`. It currently reads
   "Branding placeholder", which is accurate today and would be wrong once a real logo is
   in place.

The zip also carries dark and white variants of the horizontal logo if a future header
background calls for one.

## Layout rules the header already encodes

- The logo sits in the top-left corner of the page header.
- That corner is exclusive to the logo — no other logo or text shares the space, including
  Study Palette's own branding, which the guide addresses directly under "Other
  Tool/Application/Team Logos".
- Clear space above, below, and to the left equals the cap height of the "N" in the NHLBI
  mark. The `--brand-clear-space` variable in `index.css` derives this from
  `--brand-logo-height`; the cap height is roughly 40% of the logo's full height.
- The buffer to the right of the logo is no smaller than the logo's own width. The logo
  occupies its own row in the header, which satisfies this by construction.
- A hamburger button, if one is added later, may sit at the right of the page but never to
  the left of the logo.
