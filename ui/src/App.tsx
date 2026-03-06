import { useEffect, useState } from "react";
import OverviewCharts from "./OverviewCharts";
import StudyOverview from "./StudyOverview";
import { DEMO_OVERVIEW } from "./demoData";
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

  return (
    <div className="app">
      <header>
        <div className="header-row">
          <div>
            <h1>Study Palette</h1>
            <p>BDC Meta-Analysis Study Builder & Query Tool</p>
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
        {mode === "demo" && <OverviewCharts data={DEMO_OVERVIEW} />}
        {mode === "live" && studies.map((study) => (
          <StudyOverview key={study.id} study={study} />
        ))}
      </main>
    </div>
  );
}

export default App;
