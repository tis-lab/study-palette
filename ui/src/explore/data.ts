export interface Concept {
  name: string;
  title: string;
  label: string;
  description: string;
  category: string;
  bdchm_class: string | null;
  mappings: string[];
  studies: string[];
  variable_count: number;
}

export interface Term {
  id: string;
  label: string | null;
  description: string | null;
  synonyms: string[];
  parents: string[];
  children: string[];
  child_labels: Record<string, string>;
  label_source: "monarch" | "varlib";
}

export interface Participant {
  id: string;
  study: string;
  sex: string;
  race: string;
  ethnicity: string;
  concepts: string[];
  measures: Record<string, number>;
}

export interface ExploreData {
  participants: Participant[];
  concepts: Concept[];
  terms: Record<string, Term>;
  corpus: Record<string, Record<string, number>>;
  illustrative: string[];
  studies: string[];
  measure_units: Record<string, string>;
  edges: Record<string, Edge[]>;
  kg_coverage: Record<string, { neighbours: number; harmonized: number }>;
}

export interface Edge {
  predicate: string;
  object: string;
  label: string | null;
  source: "kg" | "curated";
}

/**
 * The reverse index is the point of the whole exercise: one ontology term is
 * reached by several differently-named harmonized variables, and a researcher
 * searching by name finds at most one of them.
 */
export interface Indexed extends ExploreData {
  byTerm: Record<string, Concept[]>;
  byCategory: Record<string, Concept[]>;
  illustrativeSet: Set<string>;
}

export function index(data: ExploreData): Indexed {
  const byTerm: Record<string, Concept[]> = {};
  const byCategory: Record<string, Concept[]> = {};

  for (const concept of data.concepts) {
    (byCategory[concept.category] ??= []).push(concept);
    for (const curie of concept.mappings) {
      (byTerm[curie] ??= []).push(concept);
    }
  }

  return {
    ...data,
    byTerm,
    byCategory,
    illustrativeSet: new Set(data.illustrative),
  };
}

/**
 * The cohort a concept selects, expanded through the ontology: a participant
 * coded with a narrower term still belongs to the broader one. This is the
 * whole argument for the knowledge graph — a plain match on the parent term
 * would miss everyone recorded against a child.
 */
export function cohort(data: Indexed, concept: Concept): Participant[] {
  const wanted = new Set(
    concept.mappings.flatMap((curie) => withDescendants(data, curie)),
  );
  return data.participants.filter((p) =>
    p.concepts.some((c) => wanted.has(c)),
  );
}

/** Participants for a concept, summed across contributing studies. */
export function participants(data: Indexed, concept: Concept) {
  const perStudy: Record<string, number> = {};
  for (const curie of concept.mappings) {
    for (const [study, n] of Object.entries(data.corpus[curie] ?? {})) {
      perStudy[study] = (perStudy[study] ?? 0) + n;
    }
  }
  const total = Object.values(perStudy).reduce((a, b) => a + b, 0);
  const illustrative = concept.mappings.some((c) => data.illustrativeSet.has(c));
  return { perStudy, total, illustrative };
}

/** A term plus everything under it, for expansion. */
export function withDescendants(data: Indexed, curie: string): string[] {
  const seen = new Set<string>();
  const queue = [curie];
  while (queue.length) {
    const current = queue.shift()!;
    if (seen.has(current)) continue;
    seen.add(current);
    for (const child of data.terms[current]?.children ?? []) queue.push(child);
  }
  return [...seen];
}

export interface Related {
  concept: Concept;
  via: string;
  source: "hierarchy" | "kg" | "curated";
}

const PREDICATE_LABELS: Record<string, string> = {
  "biolink:has_biomarker": "biomarker",
  "biolink:diagnosed_by": "used to diagnose",
  "biolink:has_phenotype": "phenotype",
  "biolink:related_to": "related",
  "biolink:disrupts": "disrupts",
  "biolink:disease_has_location": "location",
};

/** A term, everything above it, and everything below it, within `hops`. */
function withinHops(data: Indexed, curie: string, hops: number): string[] {
  const seen = new Set([curie]);
  let frontier = [curie];
  for (let hop = 0; hop < hops; hop++) {
    const next: string[] = [];
    for (const current of frontier) {
      const term = data.terms[current];
      for (const n of [...(term?.parents ?? []), ...(term?.children ?? [])]) {
        if (!seen.has(n)) {
          seen.add(n);
          next.push(n);
        }
      }
    }
    frontier = next;
  }
  return [...seen];
}

/**
 * What else is worth looking at near this concept, grouped by category.
 *
 * Two mechanisms, because one is not enough. Ontology hierarchy is is-a only,
 * so walking it from a disease reaches other diseases and never a lab result —
 * MONDO and OBA have no edges between them in any public graph. Conditions
 * therefore come from the hierarchy, and measurements and procedures come from
 * curated edges. Which is which is carried through so the interface can say so.
 */
export function related(
  data: Indexed,
  concept: Concept,
  hops = 2,
): Record<string, Related[]> {
  const found = new Map<string, Related>();

  const add = (curie: string, via: string, source: Related["source"]) => {
    for (const other of data.byTerm[curie] ?? []) {
      if (other.name === concept.name) continue;
      // Hierarchy is the weaker claim, so a curated edge wins the label.
      if (found.has(other.name) && source === "hierarchy") continue;
      found.set(other.name, { concept: other, via, source });
    }
  };

  for (const curie of concept.mappings) {
    for (const near of withinHops(data, curie, hops)) {
      if (near !== curie) add(near, "same branch of the ontology", "hierarchy");
    }
    for (const edge of data.edges[curie] ?? []) {
      add(edge.object, PREDICATE_LABELS[edge.predicate] ?? edge.predicate, edge.source);
    }
  }

  const byCategory: Record<string, Related[]> = {};
  for (const entry of found.values()) {
    (byCategory[entry.concept.category] ??= []).push(entry);
  }
  for (const rows of Object.values(byCategory)) {
    rows.sort((a, b) => b.concept.studies.length - a.concept.studies.length);
  }
  return byCategory;
}

const MONARCH = "https://api-v3.monarchinitiative.org/v3/api";

export interface Hit {
  id: string;
  label: string;
  live: boolean;
}

/**
 * Search Monarch, falling back to the baked terms if the network is unavailable.
 * The fallback exists so a demo does not depend on a conference room's wifi.
 */
export async function search(data: Indexed, query: string): Promise<Hit[]> {
  const local = Object.values(data.terms)
    .filter((t) => (t.label ?? "").toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8)
    .map((t) => ({ id: t.id, label: t.label ?? t.id, live: false }));

  try {
    const url = `${MONARCH}/search?q=${encodeURIComponent(query)}&limit=8`;
    const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) return local;
    const body = await response.json();
    const hits = (body.items ?? [])
      .filter((i: { id: string }) => /^(MONDO|HP|OBA):/.test(i.id))
      .map((i: { id: string; name: string }) => ({
        id: i.id,
        label: i.name,
        live: true,
      }));
    return hits.length ? hits : local;
  } catch {
    return local;
  }
}
