import type { ActiveFilters } from "./demoData";

interface FilterPanelProps {
  filters: ActiveFilters;
  onRemove: (type: keyof ActiveFilters, value: string) => void;
  onClear: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterPanel({
  filters,
  onRemove,
  onClear,
  totalCount,
  filteredCount,
}: FilterPanelProps) {
  const hasFilters =
    filters.conditionCategories.length > 0 ||
    filters.conditions.length > 0 ||
    filters.procedures.length > 0;

  if (!hasFilters) {
    return (
      <div className="filter-panel">
        <h3>Filters</h3>
        <p className="filter-hint">Click a chart segment to filter</p>
      </div>
    );
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="filter-clear" onClick={onClear}>
          Clear all
        </button>
      </div>
      <p className="filter-count">
        {filteredCount.toLocaleString()} of {totalCount.toLocaleString()}{" "}
        participants
      </p>
      {filters.conditionCategories.map((v) => (
        <span
          key={`cat-${v}`}
          className="filter-chip chip-condition"
          onClick={() => onRemove("conditionCategories", v)}
        >
          {v} &times;
        </span>
      ))}
      {filters.conditions.map((v) => (
        <span
          key={`cond-${v}`}
          className="filter-chip chip-condition"
          onClick={() => onRemove("conditions", v)}
        >
          {v} &times;
        </span>
      ))}
      {filters.procedures.map((v) => (
        <span
          key={`proc-${v}`}
          className="filter-chip chip-procedure"
          onClick={() => onRemove("procedures", v)}
        >
          {v} &times;
        </span>
      ))}
    </div>
  );
}
