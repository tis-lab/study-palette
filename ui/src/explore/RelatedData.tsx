import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FILL_STROKE, PALETTES, type PaletteKey } from "../palette";
import { related, type Concept, type Indexed, type Related } from "./data";

interface Props {
  data: Indexed;
  concept: Concept;
  paletteKey: PaletteKey;
  onSelectConcept: (concept: Concept) => void;
}

// The three questions a study builder actually asks, in the order they ask
// them. Other categories exist but are not what this panel is answering.
const PANELS: { key: string; title: string; blurb: string }[] = [
  {
    key: "ConditionDisease",
    title: "Conditions",
    blurb: "Reached by walking the ontology from this term",
  },
  {
    key: "LabMeasurement",
    title: "Measurements",
    blurb: "Curated: no public graph links a disease to a lab result",
  },
  {
    key: "DiagnosticTestProcedure",
    title: "Procedures",
    blurb: "Curated: no public graph links a disease to a procedure",
  },
];

/**
 * What data a study built on this concept could actually draw on, and from how
 * many studies. This is the question the portal exists to answer: a term is
 * only useful if the cohort behind it can be assembled.
 */
export default function RelatedData({
  data,
  concept,
  paletteKey,
  onSelectConcept,
}: Props) {
  const palette = PALETTES[paletteKey];
  const groups = related(data, concept);
  const total = data.studies.length;

  const coverage = concept.mappings
    .map((curie) => data.kg_coverage[curie])
    .find(Boolean);

  const panel = ({ key, title, blurb }: (typeof PANELS)[number]) => {
    const rows = (groups[key] ?? []).slice(0, 8);
    if (!rows.length) return null;

    const chart = rows.map((r) => ({
      name: r.concept.label,
      value: r.concept.studies.length,
      via: r.via,
    }));

    // Provenance is a property of the panel, not of each row: these groups are
    // uniformly curated or uniformly harvested. Badging every line just shouts.
    const allCurated = rows.every((r) => r.source === "curated");

    return (
      <div className="chart-panel related-panel" key={key}>
        <h4>
          {title} <span className="muted">{rows.length}</span>
          {allCurated && (
            <span
              className="badge badge-curated"
              title="Authored for this demo, not harvested from a knowledge graph. Not clinically reviewed."
            >
              curated
            </span>
          )}
        </h4>
        <p className="muted related-blurb">{blurb}</p>
        <ResponsiveContainer width="100%" height={Math.max(120, rows.length * 26)}>
          <BarChart data={chart} layout="vertical" margin={{ left: 4, right: 26 }}>
            <XAxis
              type="number"
              domain={[0, total]}
              tick={{ fontSize: 10 }}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <Tooltip
              formatter={(v, _n, item) => [
                `${v} of ${total} studies`,
                item?.payload?.via,
              ]}
            />
            <Bar dataKey="value" stroke={FILL_STROKE} isAnimationActive={false}>
              {chart.map((row, i) => (
                <Cell key={i} fill={palette.sequence[i % palette.sequence.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <ul className="related-list">
          {rows.map((r: Related) => (
            <li key={r.concept.name}>
              <button onClick={() => onSelectConcept(r.concept)}>
                {r.concept.label}
              </button>
              <span className="muted">{r.via}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const panels = PANELS.map(panel).filter(Boolean);
  if (!panels.length) return null;

  return (
    <section>
      <h3>Related data available</h3>
      <p className="muted">
        What a study built on {concept.label} could draw on, and how many of the{" "}
        {total} studies carry each one.
        {coverage && (
          <>
            {" "}
            The knowledge graph lists {coverage.neighbours} neighbouring terms
            for this concept; BDC harmonizes {coverage.harmonized}.
          </>
        )}
      </p>
      <div className="related-grid">{panels}</div>
      <p className="muted synthetic-note">
        Measurement and procedure edges are curated, not harvested. No public
        knowledge graph connects a disease to a lab result or a procedure, so
        these were authored for the demo and have not been clinically reviewed.
      </p>
    </section>
  );
}
