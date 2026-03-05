import { useEffect, useState } from "react";
import OverviewCharts from "./OverviewCharts";

interface OverviewData {
  conditions: {
    name: string;
    value: number;
    children: { name: string; value: number }[];
  }[];
  procedures: { name: string; value: number }[];
}

const API_BASE = import.meta.env.VITE_API_URL || "";

function App() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/overview`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<OverviewData>;
      })
      .then((data) => setOverview(data))
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
        {overview && <OverviewCharts data={overview} />}
      </main>
    </div>
  );
}

export default App;
