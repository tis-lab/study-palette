// The parts of schema/summary.yaml the cohort snapshot uses. The query itself
// is added once the summary API is available.

export interface DemographySummary {
  id: string;
  summarized_slot: "sex" | "race" | "ethnicity";
  participant_count: number;
  sex?: string;
  race?: string[];
  ethnicity?: string;
  values?: DemographySummary[];
}

export interface StudySummary {
  research_study: string;
  participant_count: number;
  demographics?: DemographySummary[];
}

export interface ResearchStudy {
  id: string;
  name: string;
}

export interface SummaryResponse {
  release: string;
  seed: string;
  filter: string[];
  min_count: number;
  research_studies: ResearchStudy[];
  studies: StudySummary[];
}
