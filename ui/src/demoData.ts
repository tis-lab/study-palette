import type { OverviewData } from "./OverviewCharts";

export interface Participant {
  conditionCategory: string;
  condition: string;
  procedures: string[];
}

const CONDITIONS: Record<string, string[]> = {
  Cardiovascular: ["Coronary artery disease", "Heart failure", "Hypertension"],
  Respiratory: ["Asthma", "COPD", "Lung fibrosis"],
  Cancer: ["Lung cancer", "Breast cancer", "Colorectal cancer"],
  Neurologic: ["Stroke", "Alzheimer's", "Parkinson's"],
};

const PROCEDURES = [
  "Echocardiography",
  "Spirometry",
  "CT imaging",
  "Blood panel",
  "Genetic sequencing",
];

const PROCEDURE_WEIGHTS: Record<string, number[]> = {
  Cardiovascular: [0.7, 0.1, 0.2, 0.8, 0.3],
  Respiratory: [0.1, 0.8, 0.3, 0.6, 0.2],
  Cancer: [0.1, 0.1, 0.7, 0.7, 0.8],
  Neurologic: [0.15, 0.1, 0.6, 0.5, 0.2],
};

function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0x100000000;
  };
}

function generateParticipants(): Participant[] {
  const rng = seededRng(42);
  const categories = Object.keys(CONDITIONS);
  const categoryWeights = [0.38, 0.24, 0.2, 0.18];
  const participants: Participant[] = [];

  for (let i = 0; i < 1000; i++) {
    const r = rng();
    let cumulative = 0;
    let catIdx = 0;
    for (let j = 0; j < categoryWeights.length; j++) {
      cumulative += categoryWeights[j];
      if (r < cumulative) {
        catIdx = j;
        break;
      }
    }
    const category = categories[catIdx];
    const subs = CONDITIONS[category];
    const condition = subs[Math.floor(rng() * subs.length)];

    const procedures: string[] = [];
    const weights = PROCEDURE_WEIGHTS[category];
    for (let j = 0; j < PROCEDURES.length; j++) {
      if (rng() < weights[j]) {
        procedures.push(PROCEDURES[j]);
      }
    }
    if (procedures.length === 0) {
      procedures.push(PROCEDURES[Math.floor(rng() * PROCEDURES.length)]);
    }

    participants.push({ conditionCategory: category, condition, procedures });
  }

  return participants;
}

export const DEMO_PARTICIPANTS = generateParticipants();

export interface ActiveFilters {
  conditionCategories: string[];
  conditions: string[];
  procedures: string[];
}

export const EMPTY_FILTERS: ActiveFilters = {
  conditionCategories: [],
  conditions: [],
  procedures: [],
};

export function filterParticipants(
  participants: Participant[],
  filters: ActiveFilters,
): Participant[] {
  return participants.filter((p) => {
    if (
      filters.conditionCategories.length > 0 &&
      !filters.conditionCategories.includes(p.conditionCategory)
    )
      return false;
    if (
      filters.conditions.length > 0 &&
      !filters.conditions.includes(p.condition)
    )
      return false;
    if (
      filters.procedures.length > 0 &&
      !filters.procedures.some((f) => p.procedures.includes(f))
    )
      return false;
    return true;
  });
}

export function aggregateOverview(participants: Participant[]): OverviewData {
  const conditionMap = new Map<
    string,
    { total: number; children: Map<string, number> }
  >();
  const procedureMap = new Map<string, number>();

  for (const p of participants) {
    const cat = conditionMap.get(p.conditionCategory) ?? {
      total: 0,
      children: new Map(),
    };
    cat.total++;
    cat.children.set(p.condition, (cat.children.get(p.condition) ?? 0) + 1);
    conditionMap.set(p.conditionCategory, cat);

    for (const proc of p.procedures) {
      procedureMap.set(proc, (procedureMap.get(proc) ?? 0) + 1);
    }
  }

  const categoryOrder = Object.keys(CONDITIONS);
  const conditions = categoryOrder
    .filter((name) => conditionMap.has(name))
    .map((name) => {
      const cat = conditionMap.get(name)!;
      return {
        name,
        value: cat.total,
        children: Array.from(cat.children.entries()).map(([n, v]) => ({
          name: n,
          value: v,
        })),
      };
    });

  const procedures = PROCEDURES.filter((name) => procedureMap.has(name)).map(
    (name) => ({
      name,
      value: procedureMap.get(name)!,
    }),
  );

  return { conditions, procedures };
}

export const DEMO_OVERVIEW = aggregateOverview(DEMO_PARTICIPANTS);
