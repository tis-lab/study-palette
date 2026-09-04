import CohortCharts from "./CohortCharts";
import RelatedData from "./RelatedData";
import {
  cohort,
  participants,
  withDescendants,
  type Concept,
  type Indexed,
} from "./data";
import type { PaletteKey } from "../palette";

interface Props {
  data: Indexed;
  concept: Concept;
  paletteKey: PaletteKey;
  onSelectConcept: (concept: Concept) => void;
}

/**
 * Everything the three sources know about one harmonized concept, in one place:
 * what VarLib records, what the knowledge graph says the terms mean, and how
 * many participants the corpus holds.
 */
export default function ConceptDetail({
  data,
  concept,
  paletteKey,
  onSelectConcept,
}: Props) {
  const { perStudy, total, illustrative } = participants(data, concept);
  const matched = cohort(data, concept);

  // The reveal: other harmonized variables reaching the same ontology terms.
  const siblings = new Map<string, Concept>();
  for (const curie of concept.mappings) {
    for (const other of data.byTerm[curie] ?? []) {
      if (other.name !== concept.name) siblings.set(other.name, other);
    }
  }
  const alsoStudies = new Set(concept.studies);
  for (const sibling of siblings.values()) {
    for (const study of sibling.studies) alsoStudies.add(study);
  }

  return (
    <div className="concept-detail">
      <header>
        <h2>{concept.label}</h2>
        <span className="chip-category">{concept.category}</span>
      </header>

      {concept.description && <p className="lede">{concept.description}</p>}

      <section>
        <h3>Cohort</h3>
        <CohortCharts
          data={data}
          cohort={matched}
          total={data.participants.length}
          label={concept.label}
          paletteKey={paletteKey}
        />
      </section>

      <RelatedData
        data={data}
        concept={concept}
        paletteKey={paletteKey}
        onSelectConcept={onSelectConcept}
      />

      <section>
        <h3>Ontology terms</h3>
        {concept.mappings.map((curie) => {
          const term = data.terms[curie];
          const expansion = withDescendants(data, curie);
          return (
            <div className="term" key={curie}>
              <div className="term-head">
                <code>{curie}</code>
                <strong>{term?.label ?? "—"}</strong>
                {term?.label_source === "varlib" && (
                  <span className="badge" title="Not in the knowledge graph">
                    no KG entry
                  </span>
                )}
              </div>
              {term?.description && <p className="term-desc">{term.description}</p>}
              {term?.synonyms?.length > 0 && (
                <p className="synonyms">
                  also called {term.synonyms.slice(0, 4).join(", ")}
                </p>
              )}
              {expansion.length > 1 && (
                <p className="expansion">
                  Expanding this term reaches {expansion.length - 1} narrower{" "}
                  {expansion.length === 2 ? "concept" : "concepts"}:{" "}
                  {Object.values(term?.child_labels ?? {})
                    .slice(0, 4)
                    .join(", ")}
                </p>
              )}
            </div>
          );
        })}
      </section>

      {siblings.size > 0 && (
        <section className="callout">
          <h3>Also recorded as</h3>
          <p>
            {siblings.size} other harmonized{" "}
            {siblings.size === 1 ? "variable maps" : "variables map"} to the same
            terms. Searching by name would find one of them.
          </p>
          <ul className="sibling-list">
            {[...siblings.values()].map((sibling) => (
              <li key={sibling.name}>
                <button onClick={() => onSelectConcept(sibling)}>
                  {sibling.label}
                </button>
                <span className="muted">{sibling.studies.length} studies</span>
              </li>
            ))}
          </ul>
          <p className="muted">
            Together they span {alsoStudies.size} of {data.studies.length}{" "}
            studies, against {concept.studies.length} for this variable alone.
          </p>
        </section>
      )}

      <section>
        <h3>
          Participants{" "}
          {illustrative && <span className="badge">illustrative</span>}
        </h3>
        <p className="count-total">{total.toLocaleString()}</p>
        <ul className="study-counts">
          {Object.entries(perStudy)
            .sort((a, b) => b[1] - a[1])
            .map(([study, n]) => (
              <li key={study}>
                <span>{study}</span>
                <span>{n.toLocaleString()}</span>
              </li>
            ))}
        </ul>
      </section>

      <section>
        <h3>Contributing studies</h3>
        <div className="tags">
          {concept.studies.map((study) => (
            <span className="tag" key={study}>
              {study}
            </span>
          ))}
        </div>
        <p className="muted slot-name">
          Recorded internally as <code>{concept.name}</code>
        </p>
        {concept.variable_count > 0 && (
          <p className="muted">
            {concept.variable_count} source variables across those studies
          </p>
        )}
      </section>
    </div>
  );
}
