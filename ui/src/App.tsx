import { useEffect, useState } from "react";

interface Study {
  id: string;
  name: string;
  description: string;
  participant_count: number;
  data_types: string[];
}

interface StudiesResponse {
  studies: Study[];
  total: number;
}

const API_BASE = import.meta.env.VITE_API_URL || "";

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
        {loading && <p className="status">Loading studies...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {!loading && !error && (
          <div className="study-grid">
            {studies.map((study) => (
              <div key={study.id} className="study-card">
                <h2>{study.name}</h2>
                <code>{study.id}</code>
                <p>{study.description}</p>
                <div className="meta">
                  <span>{study.participant_count.toLocaleString()} participants</span>
                  <div className="tags">
                    {study.data_types.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
