import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { API_BASE, type Study } from "./types";

interface ConditionRow {
  condition_concept: string;
  condition_status: string;
  count: number;
}

interface DemographicsRow {
  sex: string;
  count: number;
}

const STATUS_COLORS: Record<string, string> = {
  PRESENT: "#dc2626",
  ABSENT: "#10b981",
};

const SEX_COLORS: Record<string, string> = {
  "OMOP:8507": "#2563eb",
  "OMOP:8532": "#ec4899",
};

export default function StudyOverview({ study }: { study: Study }) {
  const [conditions, setConditions] = useState<ConditionRow[]>([]);
  const [demographics, setDemographics] = useState<DemographicsRow[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/studies/${study.id}/conditions`)
      .then((res) => res.json())
      .then((data) => setConditions(data.conditions))
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
    color: STATUS_COLORS[c.condition_status] ?? "#94a3b8",
  }));

  const sexChartData = demographics.map((d) => ({
    name: d.sex === "OMOP:8507" ? "Male" : d.sex === "OMOP:8532" ? "Female" : d.sex,
    value: d.count,
    color: SEX_COLORS[d.sex] ?? "#94a3b8",
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
                    <Cell key={i} fill={entry.color} />
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
                    <Cell key={i} fill={entry.color} />
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
