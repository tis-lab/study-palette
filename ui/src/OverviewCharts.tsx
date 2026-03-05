import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ConditionCategory {
  name: string;
  value: number;
  children: { name: string; value: number }[];
}

interface OverviewData {
  conditions: ConditionCategory[];
  procedures: { name: string; value: number }[];
}

const CONDITION_COLORS: Record<string, string> = {
  Cardiovascular: "#dc2626",
  Respiratory: "#2563eb",
  Cancer: "#f59e0b",
  Neurologic: "#7c3aed",
};

const PROCEDURE_COLORS = ["#0ea5e9", "#10b981", "#f97316", "#6366f1", "#ec4899"];

export default function OverviewCharts({ data }: { data: OverviewData }) {
  const outerRing = data.conditions.flatMap((cat) =>
    cat.children.map((child) => ({
      name: child.name,
      value: child.value,
      color: CONDITION_COLORS[cat.name] ?? "#94a3b8",
    }))
  );

  const innerRing = data.conditions.map((cat) => ({
    name: cat.name,
    value: cat.value,
    color: CONDITION_COLORS[cat.name] ?? "#94a3b8",
  }));

  return (
    <div className="chart-grid">
      <div className="chart-panel">
        <h3>Conditions</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={innerRing}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={35}
            >
              {innerRing.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Pie
              data={outerRing}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
            >
              {outerRing.map((entry, i) => (
                <Cell key={i} fill={entry.color} opacity={0.7} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => typeof value === "number" ? value.toLocaleString() : value} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-panel">
        <h3>Procedures</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data.procedures}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={120}
              label={({ name }) => name}
            >
              {data.procedures.map((_, i) => (
                <Cell key={i} fill={PROCEDURE_COLORS[i % PROCEDURE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => typeof value === "number" ? value.toLocaleString() : value} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
