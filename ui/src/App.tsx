import { useEffect, useMemo, useState } from "react";
import OverviewCharts from "./OverviewCharts";
import FilterPanel from "./FilterPanel";
import StudyOverview from "./StudyOverview";
import {
  DEMO_PARTICIPANTS,
  EMPTY_FILTERS,
  aggregateOverview,
  filterParticipants,
  type ActiveFilters,
} from "./demoData";
import { API_BASE, type DataMode, type Study } from "./types";

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

  function handleFilterAdd(type: keyof ActiveFilters, value: string) {
    setFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      }
      return { ...prev, [type]: [...current, value] };
    });
  }

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
            alt="Branding placeholder"
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
          <button
            className={`mode-toggle ${mode}`}
            onClick={() => setMode(mode === "demo" ? "live" : "demo")}
          >
            {mode === "demo" ? "Demo Data" : "Live API"}
          </button>
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
              />
            </div>
          </div>
        )}
        {mode === "live" &&
          studies.map((study) => (
            <StudyOverview key={study.id} study={study} />
          ))}
      </main>
    </div>
  );
}

export default App;
