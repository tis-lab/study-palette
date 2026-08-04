import { useCallback, useEffect, useMemo, useState } from "react";
import OverviewCharts from "./OverviewCharts";
import DemographicsSankey from "./DemographicsSankey";
import FilterPanel from "./FilterPanel";
import StudyOverview from "./StudyOverview";
import {
  DEMO_PARTICIPANTS,
  EMPTY_FILTERS,
  aggregateOverview,
  buildSankeyData,
  filterParticipants,
  type ActiveFilters,
} from "./demoData";
import { API_BASE, type DataMode, type Study } from "./types";
import { PALETTES, DEFAULT_PALETTE, type PaletteKey } from "./palette";

interface StudiesResponse {
  studies: Study[];
  total: number;
}

function App() {
  const [mode, setMode] = useState<DataMode>("demo");
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ActiveFilters>(EMPTY_FILTERS);
  const [paletteKey, setPaletteKey] = useState<PaletteKey>(DEFAULT_PALETTE);
  const palette = PALETTES[paletteKey];

  useEffect(() => {
    if (mode === "demo") {
      setStudies([]);
      setLoading(false);
      setError(null);
      return;
    }

    setStudies([]);
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/studies`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<StudiesResponse>;
      })
      .then((data) => setStudies(data.studies))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mode]);

  const filtered = useMemo(
    () => filterParticipants(DEMO_PARTICIPANTS, filters),
    [filters],
  );
  const overviewData = useMemo(() => aggregateOverview(filtered), [filtered]);
  const sankeyData = useMemo(() => buildSankeyData(filtered), [filtered]);

  const handleFilterAdd = useCallback(
    (type: keyof ActiveFilters, value: string) => {
      setFilters((prev) => {
        const current = prev[type];
        if (current.includes(value)) {
          return { ...prev, [type]: current.filter((v) => v !== value) };
        }
        return { ...prev, [type]: [...current, value] };
      });
    },
    [],
  );

  function handleFilterRemove(type: keyof ActiveFilters, value: string) {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  }

  function handleFilterClear() {
    setFilters(EMPTY_FILTERS);
  }

  return (
    <div className="app">
      <header>
        <div className="brand-bar">
          <img
            className="brand-logo"
            src="/branding/bdc-logo.svg"
            alt=""
          />
        </div>
        <div className="header-row">
          <div>
            <h1>Study Palette</h1>
            <p>
              NHLBI BioData Catalyst<sup>&reg;</sup> (BDC) Meta-Analysis Study
              Builder & Query Tool
            </p>
          </div>
          <div className="header-controls">
            <label className="palette-picker">
              <span>Figure palette</span>
              <select
                value={paletteKey}
                onChange={(e) => setPaletteKey(e.target.value as PaletteKey)}
              >
                {Object.entries(PALETTES).map(([key, p]) => (
                  <option key={key} value={key}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              className={`mode-toggle ${mode}`}
              onClick={() => setMode(mode === "demo" ? "live" : "demo")}
            >
              {mode === "demo" ? "Demo Data" : "Live API"}
            </button>
          </div>
        </div>
      </header>
      <main>
        {loading && <p className="status">Loading...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {mode === "demo" && (
          <div className="demo-layout">
            <FilterPanel
              filters={filters}
              onRemove={handleFilterRemove}
              onClear={handleFilterClear}
              totalCount={DEMO_PARTICIPANTS.length}
              filteredCount={filtered.length}
            />
            <div className="demo-content">
              <OverviewCharts
                data={overviewData}
                filters={filters}
                onFilterAdd={handleFilterAdd}
                palette={palette}
              />
              <DemographicsSankey
                data={sankeyData}
                onFilterAdd={handleFilterAdd}
              />
            </div>
          </div>
        )}
        {mode === "live" &&
          studies.map((study) => (
            <StudyOverview key={study.id} study={study} palette={palette} />
          ))}
      </main>
    </div>
  );
}

export default App;
