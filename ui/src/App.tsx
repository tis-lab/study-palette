import { useEffect, useState } from "react";
import StudyOverview from "./StudyOverview";
import { DEMO_STUDIES } from "./demoData";
import { API_BASE, type DataMode, type Study } from "./types";

interface StudiesResponse {
  studies: Study[];
  total: number;
}

function App() {
  const [mode, setMode] = useState<DataMode>("demo");
  const [studies, setStudies] = useState<Study[]>(DEMO_STUDIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "demo") {
      setStudies(DEMO_STUDIES);
      setLoading(false);
      setError(null);
      return;
    }

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
        {studies.map((study) => (
          <StudyOverview key={`${mode}-${study.id}`} study={study} mode={mode} />
        ))}
      </main>
    </div>
  );
}

export default App;
