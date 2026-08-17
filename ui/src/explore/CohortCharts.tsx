import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FILL_STROKE, PALETTES, type PaletteKey } from "../palette";
import type { Participant } from "./data";

interface Props {
  cohort: Participant[];
  total: number;
  label: string;
  paletteKey: PaletteKey;
}

function tally(rows: Participant[], key: "sex" | "race" | "study") {
  const counts: Record<string, number> = {};
  for (const row of rows) counts[row[key]] = (counts[row[key]] ?? 0) + 1;
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/** Bucket a continuous measure so it can be charted as a distribution. */
function distribution(rows: Participant[], measure: string, width: number) {
  const buckets: Record<number, number> = {};
  for (const row of rows) {
    const value = row.measures[measure];
    if (value == null) continue;
    const bucket = Math.floor(value / width) * width;
    buckets[bucket] = (buckets[bucket] ?? 0) + 1;
  }
  return Object.entries(buckets)
    .map(([bucket, value]) => ({ name: String(bucket), value }))
    .sort((a, b) => Number(a.name) - Number(b.name));
}

/**
 * What the selected concept's cohort looks like. The point of putting these
 * next to the concept is that a broad term is only useful if you can see who
 * it actually caught.
 */
export default function CohortCharts({ cohort, total, label, paletteKey }: Props) {
  const palette = PALETTES[paletteKey];
  const sex = tally(cohort, "sex");
  const race = tally(cohort, "race");
  const study = tally(cohort, "study");
  const bmi = distribution(cohort, "BMI", 5);
  const systolic = distribution(cohort, "Systolic BP", 10);

  if (!cohort.length) {
    return (
      <p className="muted placeholder">
        No participants in the corpus carry {label}. The synthetic corpus covers
        cardiovascular concepts — try heart failure, hypertension, or stroke.
      </p>
    );
  }

  const donut = (
    title: string,
    rows: { name: string; value: number }[],
    offset = 0,
  ) => (
    <div className="chart-panel">
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={190}>
        <PieChart>
          <Pie
            data={rows}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={70}
          >
            {rows.map((_, i) => (
              <Cell
                key={i}
                stroke={FILL_STROKE}
                fill={palette.sequence[(i + offset) % palette.sequence.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(v) => (typeof v === "number" ? v.toLocaleString() : v)} />
          <Legend wrapperStyle={{ fontSize: "0.72rem" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const histogram = (title: string, rows: { name: string; value: number }[], unit: string) => (
    <div className="chart-panel">
      <h4>
        {title} <span className="muted">{unit}</span>
      </h4>
      <ResponsiveContainer width="100%" height={190}>
        <BarChart data={rows}>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={30} />
          <Tooltip formatter={(v) => (typeof v === "number" ? v.toLocaleString() : v)} />
          <Bar dataKey="value" fill={palette.sequence[0]} stroke={FILL_STROKE} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="cohort">
      <div className="cohort-head">
        <div>
          <span className="cohort-count">{cohort.length.toLocaleString()}</span>
          <span className="muted">
            {" "}
            of {total.toLocaleString()} participants ·{" "}
            {((cohort.length / total) * 100).toFixed(1)}%
          </span>
        </div>
        <p className="muted">Cohort matching {label}</p>
      </div>

      <div className="cohort-charts">
        {donut("Sex", sex)}
        {donut("Race", race, 1)}
        {donut("Study", study, 2)}
        {bmi.length > 0 && histogram("BMI", bmi, "kg/m²")}
        {systolic.length > 0 && histogram("Systolic BP", systolic, "mm[Hg]")}
      </div>
    </div>
  );
}
