import { useEffect, useMemo, useState } from "react";
import ConceptDetail from "./ConceptDetail";
import {
  index,
  search,
  type Concept,
  type ExploreData,
  type Hit,
  type Indexed,
} from "./data";
import type { PaletteKey } from "../palette";

/**
 * Two ways into the same data. Browsing answers "what is in here"; search
 * answers "can this corpus address my question". Both land on the same concept
 * detail, which is where the knowledge graph and the variable library meet.
 */
export default function Explore({ paletteKey }: { paletteKey: PaletteKey }) {
  const [raw, setRaw] = useState<ExploreData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Concept | null>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetch("/explore-data.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setRaw)
      .catch((e) => setError(e.message));
  }, []);

  const data: Indexed | null = useMemo(() => (raw ? index(raw) : null), [raw]);

  useEffect(() => {
    if (!data || query.trim().length < 3) {
      setHits(null);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = setTimeout(() => {
      search(data, query.trim()).then((results) => {
        if (!cancelled) {
          setHits(results);
          setSearching(false);
        }
      });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [data, query]);

  if (error) return <p className="status error">Could not load: {error}</p>;
  if (!data) return <p className="status">Loading the variable library…</p>;

  const categories = Object.keys(data.byCategory).sort();
  const shown = category ? data.byCategory[category] : [];

  // Which harmonized variables a search hit reaches, including via expansion.
  const reached = hits
    ? [
        ...new Map(
          hits.flatMap((h) => (data.byTerm[h.id] ?? []).map((c) => [c.name, c])),
        ).values(),
      ]
    : [];

  return (
    <div className="explore">
      <div className="explore-search">
        <input
          type="search"
          placeholder="Search concepts — try heart failure, hypertension, stroke"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search concepts"
        />
        {searching && <span className="muted">searching…</span>}
        {hits && hits.length > 0 && (
          <div className="hits">
            <p className="muted">
              {hits[0].live
                ? "Resolved against the Monarch knowledge graph"
                : "Resolved locally — knowledge graph unreachable"}
            </p>
            <ul>
              {hits.map((hit) => {
                const mapped = data.byTerm[hit.id] ?? [];
                return (
                  <li key={hit.id}>
                    <code>{hit.id}</code> {hit.label}
                    <span className="muted">
                      {mapped.length
                        ? ` — ${mapped.length} harmonized ${
                            mapped.length === 1 ? "variable" : "variables"
                          }`
                        : " — not harmonized in BDC"}
                    </span>
                  </li>
                );
              })}
            </ul>
            {reached.length > 0 && (
              <div className="reached">
                <p>
                  <strong>{reached.length}</strong> harmonized{" "}
                  {reached.length === 1 ? "variable" : "variables"} answer this,
                  across{" "}
                  <strong>
                    {new Set(reached.flatMap((c) => c.studies)).size}
                  </strong>{" "}
                  studies
                </p>
                <div className="tags">
                  {reached.map((concept) => (
                    <button
                      className="tag tag-button"
                      key={concept.name}
                      onClick={() => {
                        setSelected(concept);
                        setCategory(concept.category);
                      }}
                    >
                      {concept.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="explore-body">
        <nav className="category-list">
          <h3>
            {data.concepts.length} concepts in {categories.length} categories
          </h3>
          <ul>
            {categories.map((name) => {
              const open = name === category;
              return (
                <li key={name}>
                  <button
                    className={`category-toggle ${open ? "active" : ""}`}
                    aria-expanded={open}
                    onClick={() => setCategory(open ? null : name)}
                  >
                    <span className="caret">{open ? "\u25be" : "\u25b8"}</span>
                    {name}
                    <span className="muted">{data.byCategory[name].length}</span>
                  </button>
                  {open && (
                    <ul className="concept-list">
                      {shown.map((concept) => (
                        <li key={concept.name}>
                          <button
                            className={
                              concept.name === selected?.name ? "active" : ""
                            }
                            onClick={() => setSelected(concept)}
                          >
                            {concept.label}
                            <span className="muted">
                              {concept.studies.length}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="detail-pane">
          {selected ? (
            <ConceptDetail
              data={data}
              concept={selected}
              paletteKey={paletteKey}
              onSelectConcept={setSelected}
            />
          ) : (
            <p className="muted placeholder">
              Select a concept to see its ontology terms, the studies that
              collected it, and the other variables that mean the same thing.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
