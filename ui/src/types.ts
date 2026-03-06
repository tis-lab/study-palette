export interface Study {
  id: string;
  name: string;
  description: string;
  participant_count: number;
  data_types?: string[];
}

export type DataMode = "demo" | "live";

export const API_BASE = import.meta.env.VITE_API_URL || "";
