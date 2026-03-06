import { useEffect, useState } from "react";
import StudyOverview from "./StudyOverview";
import { API_BASE, type Study } from "./types";

interface StudiesResponse {
  studies: Study[];
  total: number;
}

function App() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/studies`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<StudiesResponse>;
      })
      .then((data) => setStudies(data.studies))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Study Palette</h1>
        <p>BDC Meta-Analysis Study Builder & Query Tool</p>
      </header>
      <main>
        {loading && <p className="status">Loading...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {studies.map((study) => (
          <StudyOverview key={study.id} study={study} />
        ))}
      </main>
    </div>
  );
}

export default App;
