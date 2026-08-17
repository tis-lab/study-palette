import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cohort, index, participants, withDescendants, type ExploreData } from "./data";

// Vitest runs from ui/, and the fixture is the artifact the app actually serves.
const raw: ExploreData = JSON.parse(
  readFileSync(join(process.cwd(), "public/explore-data.json"), "utf8"),
);
const data = index(raw);

describe("explore fixture", () => {
  it("covers every VarLib category", () => {
    expect(data.concepts.length).toBeGreaterThan(150);
    expect(Object.keys(data.byCategory).length).toBeGreaterThan(8);
  });

  it("never surfaces a slot shorthand as a label", () => {
    // Slot names are internal. A label equal to the name, or containing an
    // underscore, means the label derivation fell through.
    const leaked = data.concepts.filter(
      (c) => c.label === c.name || c.label.includes("_"),
    );
    expect(leaked.map((c) => c.name)).toEqual([]);
  });

  it("keeps the qualifier on history and family-history concepts", () => {
    const qualified = data.concepts.filter((c) =>
      /^(hist|fam)_/.test(c.name),
    );
    expect(qualified.length).toBeGreaterThan(5);
    for (const concept of qualified) {
      expect(concept.label.toLowerCase()).toMatch(/^(history|family history)/);
    }
  });

  it("resolves every mapping it references to a term", () => {
    const missing = data.concepts
      .flatMap((c) => c.mappings)
      .filter((curie) => !data.terms[curie]);
    expect(missing).toEqual([]);
  });

  it("expands a parent term to its descendants", () => {
    // Congestive heart failure sits under heart failure, which is what lets a
    // search for the parent find participants coded with the child.
    const expanded = withDescendants(data, "MONDO:0005252");
    expect(expanded).toContain("MONDO:0005009");
    expect(expanded.length).toBeGreaterThan(1);
  });

  it("builds a cohort through ontology expansion", () => {
    const heartFailure = data.concepts.find((c) => c.name === "hist_hrtfail");
    expect(heartFailure).toBeDefined();
    const matched = cohort(data, heartFailure!);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched.length).toBeLessThanOrEqual(data.participants.length);
    // Everyone in the cohort carries a term at or under the concept's mappings.
    const wanted = new Set(
      heartFailure!.mappings.flatMap((c) => withDescendants(data, c)),
    );
    for (const person of matched) {
      expect(person.concepts.some((c) => wanted.has(c))).toBe(true);
    }
  });

  it("marks illustrative counts rather than passing them off as real", () => {
    expect(data.illustrative.length).toBeGreaterThan(0);
    const withData = data.concepts.filter(
      (c) => participants(data, c).total > 0,
    );
    const flagged = withData.filter((c) => participants(data, c).illustrative);
    // Most concepts have no corpus data, so most counts must be flagged.
    expect(flagged.length).toBeGreaterThan(withData.length / 2);
  });
});
