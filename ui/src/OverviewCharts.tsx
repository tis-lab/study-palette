import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ActiveFilters } from "./demoData";
import { CHART_SEQUENCE, UNCATEGORIZED, MIN_FILL_OPACITY } from "./palette";

interface ConditionCategory {
  name: string;
  value: number;
  children: { name: string; value: number }[];
}

export interface OverviewData {
  conditions: ConditionCategory[];
  procedures: { name: string; value: number }[];
}

interface OverviewChartsProps {
  data: OverviewData;
  filters: ActiveFilters;
  onFilterAdd: (type: keyof ActiveFilters, value: string) => void;
}

const CONDITION_COLORS: Record<string, string> = {
  Cardiovascular: CHART_SEQUENCE[1],
  Respiratory: CHART_SEQUENCE[2],
  Cancer: CHART_SEQUENCE[3],
  Neurologic: CHART_SEQUENCE[0],
};

const PROCEDURE_COLORS = CHART_SEQUENCE;

export default function OverviewCharts({
  data,
  filters,
  onFilterAdd,
}: OverviewChartsProps) {
  const outerRing = data.conditions.flatMap((cat) =>
    cat.children.map((child) => ({
      name: child.name,
      value: child.value,
      category: cat.name,
      color: CONDITION_COLORS[cat.name] ?? UNCATEGORIZED,
    })),
  );

  const innerRing = data.conditions.map((cat) => ({
    name: cat.name,
    value: cat.value,
    color: CONDITION_COLORS[cat.name] ?? UNCATEGORIZED,
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
              style={{ cursor: "pointer" }}
              onClick={(_, idx) =>
                onFilterAdd("conditionCategories", innerRing[idx].name)
              }
            >
              {innerRing.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  opacity={
                    filters.conditionCategories.length > 0 &&
                    !filters.conditionCategories.includes(entry.name)
                      ? 0.25
                      : 1
                  }
                />
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
              style={{ cursor: "pointer" }}
              onClick={(_, idx) =>
                onFilterAdd("conditions", outerRing[idx].name)
              }
            >
              {outerRing.map((entry) => (
                <Cell
                  key={`${entry.category}-${entry.name}`}
                  fill={entry.color}
                  opacity={
                    filters.conditions.length > 0 &&
                    !filters.conditions.includes(entry.name)
                      ? 0.15
                      : MIN_FILL_OPACITY
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? value.toLocaleString() : value
              }
            />
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
              style={{ cursor: "pointer" }}
              onClick={(_, idx) =>
                onFilterAdd("procedures", data.procedures[idx].name)
              }
            >
              {data.procedures.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={PROCEDURE_COLORS[i % PROCEDURE_COLORS.length]}
                  opacity={
                    filters.procedures.length > 0 &&
                    !filters.procedures.includes(entry.name)
                      ? 0.25
                      : 1
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? value.toLocaleString() : value
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
