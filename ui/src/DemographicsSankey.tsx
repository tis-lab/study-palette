import { ResponsiveSankey } from "@nivo/sankey";
import type { SankeyData, ActiveFilters } from "./demoData";
import { SANKEY_COLUMN_LABELS } from "./demoData";

interface DemographicsSankeyProps {
  data: SankeyData;
  onFilterAdd: (type: keyof ActiveFilters, value: string) => void;
}

const FILTER_KEY_MAP: Record<string, keyof ActiveFilters> = {
  sex: "sex",
  race: "race",
  ethnicity: "ethnicity",
  smokingStatus: "smokingStatus",
};

function nodeLabel(node: { id: string | number; value: number }): string {
  const id = String(node.id);
  const name = id.indexOf(":") >= 0 ? id.slice(id.indexOf(":") + 1) : id;
  return `${name} (${node.value.toLocaleString()})`;
}

export default function DemographicsSankey({
  data,
  onFilterAdd,
}: DemographicsSankeyProps) {
  if (data.nodes.length === 0) {
    return (
      <div className="chart-panel">
        <h3>Demographics</h3>
        <p className="filter-hint">No participants match current filters</p>
      </div>
    );
  }

  return (
    <div className="chart-panel">
      <h3>Demographics</h3>
      <div className="sankey-labels">
        {SANKEY_COLUMN_LABELS.map((label) => (
          <span key={label} className="sankey-column-label">
            {label}
          </span>
        ))}
      </div>
      <div style={{ height: 400 }}>
        <ResponsiveSankey
          data={data}
          margin={{ top: 10, right: 160, bottom: 10, left: 10 }}
          align="justify"
          colors={{ scheme: "category10" }}
          nodeOpacity={1}
          nodeThickness={16}
          nodeInnerPadding={3}
          nodeBorderWidth={0}
          linkOpacity={0.4}
          linkHoverOthersOpacity={0.1}
          linkContract={1}
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="horizontal"
          labelPadding={8}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
          label={(node) => nodeLabel(node as { id: string | number; value: number })}
          isInteractive={true}
          onClick={(data) => {
            if ("id" in data && typeof data.id === "string") {
              const id = data.id;
              if (!id.includes(":")) return;
              const dimKey = id.slice(0, id.indexOf(":"));
              const value = id.slice(id.indexOf(":") + 1);
              const filterKey = FILTER_KEY_MAP[dimKey];
              if (filterKey) onFilterAdd(filterKey, value);
            }
          }}
        />
      </div>
    </div>
  );
}
