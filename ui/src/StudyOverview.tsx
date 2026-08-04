import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { API_BASE, type Study } from "./types";
import { FILL_STROKE, type Palette } from "./palette";

interface ConditionRow {
  condition_concept: string;
  condition_status: string;
  count: number;
}

interface DemographicsRow {
  sex: string;
  count: number;
}

export default function StudyOverview({
  study,
  palette,
}: {
  study: Study;
  palette: Palette;
}) {
  const statusColors: Record<string, string> = {
    PRESENT: palette.binary[0],
    ABSENT: palette.binary[1],
  };
  const sexColors: Record<string, string> = {
    "OMOP:8507": palette.binary[0],
    "OMOP:8532": palette.binary[1],
  };

  const [conditions, setConditions] = useState<ConditionRow[]>([]);
  const [demographics, setDemographics] = useState<DemographicsRow[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/studies/${study.id}/conditions`)
      .then((res) => res.json())
      .then((data) => setConditions(data.conditions ?? []))
      .catch(() => {});

    fetch(`${API_BASE}/api/studies/${study.id}/participants`)
      .then((res) => res.json())
      .then((data) => {
        const counts: Record<string, number> = {};
        for (const p of data.participants) {
          const sex = p.sex || "Unknown";
          counts[sex] = (counts[sex] || 0) + 1;
        }
        setDemographics(
          Object.entries(counts).map(([sex, count]) => ({ sex, count }))
        );
      })
      .catch(() => {});
  }, [study.id]);

  const conditionChartData = conditions.map((c) => ({
    name: `${c.condition_concept} (${c.condition_status})`,
    value: c.count,
    color: statusColors[c.condition_status] ?? palette.uncategorized,
  }));

  const sexChartData = demographics.map((d) => ({
    name: d.sex === "OMOP:8507" ? "Male" : d.sex === "OMOP:8532" ? "Female" : d.sex,
    value: d.count,
    color: sexColors[d.sex] ?? palette.uncategorized,
  }));

  return (
    <div className="study-card">
      <div className="study-header">
        <h2>{study.name}</h2>
        <code>{study.id}</code>
        <p>{study.description}</p>
        <span className="participant-count">
          {study.participant_count.toLocaleString()} participants
        </span>
      </div>
      <div className="chart-grid">
        {conditionChartData.length > 0 && (
          <div className="chart-panel">
            <h3>Conditions</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={conditionChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                >
                  {conditionChartData.map((entry, i) => (
                    <Cell stroke={FILL_STROKE} key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {sexChartData.length > 0 && (
          <div className="chart-panel">
            <h3>Sex Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={sexChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                >
                  {sexChartData.map((entry, i) => (
                    <Cell stroke={FILL_STROKE} key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
