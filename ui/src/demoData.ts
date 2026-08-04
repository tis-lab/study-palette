import type { OverviewData } from "./OverviewCharts";

export interface Participant {
  conditionCategory: string;
  condition: string;
  procedures: string[];
  sex: string;
  race: string;
  ethnicity: string;
  smokingStatus: string;
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

const SEX_OPTIONS = ["Male", "Female"];
const SEX_WEIGHTS_BY_CONDITION: Record<string, number[]> = {
  Cardiovascular: [0.68, 0.32],
  Respiratory: [0.45, 0.55],
  Cancer: [0.35, 0.65],
  Neurologic: [0.55, 0.45],
};

const RACE_OPTIONS = [
  "White",
  "Black/African American",
  "Asian",
  "Other/Multiple",
];
const RACE_WEIGHTS_BY_CONDITION: Record<string, number[]> = {
  Cardiovascular: [0.45, 0.35, 0.10, 0.10],
  Respiratory: [0.60, 0.15, 0.15, 0.10],
  Cancer: [0.55, 0.20, 0.18, 0.07],
  Neurologic: [0.70, 0.12, 0.10, 0.08],
};

const ETHNICITY_OPTIONS = ["Hispanic/Latino", "Not Hispanic/Latino"];
const ETHNICITY_WEIGHTS_BY_CONDITION: Record<string, number[]> = {
  Cardiovascular: [0.25, 0.75],
  Respiratory: [0.30, 0.70],
  Cancer: [0.10, 0.90],
  Neurologic: [0.12, 0.88],
};

const SMOKING_OPTIONS = ["Never", "Former", "Current"];
const SMOKING_WEIGHTS_BY_CONDITION: Record<string, number[]> = {
  Cardiovascular: [0.20, 0.40, 0.40],
  Respiratory: [0.10, 0.30, 0.60],
  Cancer: [0.15, 0.35, 0.50],
  Neurologic: [0.55, 0.30, 0.15],
};

function weightedChoice(rng: () => number, options: string[], weights: number[]): string {
  const r = rng();
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (r < cumulative) return options[i];
  }
  return options[options.length - 1];
}

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
    const category = weightedChoice(rng, categories, categoryWeights);
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

    const sex = weightedChoice(rng, SEX_OPTIONS, SEX_WEIGHTS_BY_CONDITION[category]);
    const race = weightedChoice(rng, RACE_OPTIONS, RACE_WEIGHTS_BY_CONDITION[category]);
    const ethnicity = weightedChoice(rng, ETHNICITY_OPTIONS, ETHNICITY_WEIGHTS_BY_CONDITION[category]);
    const smokingStatus = weightedChoice(rng, SMOKING_OPTIONS, SMOKING_WEIGHTS_BY_CONDITION[category]);

    participants.push({
      conditionCategory: category,
      condition,
      procedures,
      sex,
      race,
      ethnicity,
      smokingStatus,
    });
  }

  return participants;
}

export const DEMO_PARTICIPANTS = generateParticipants();

export interface ActiveFilters {
  conditionCategories: string[];
  conditions: string[];
  procedures: string[];
  sex: string[];
  race: string[];
  ethnicity: string[];
  smokingStatus: string[];
}

export const EMPTY_FILTERS: ActiveFilters = {
  conditionCategories: [],
  conditions: [],
  procedures: [],
  sex: [],
  race: [],
  ethnicity: [],
  smokingStatus: [],
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
    if (filters.sex.length > 0 && !filters.sex.includes(p.sex)) return false;
    if (filters.race.length > 0 && !filters.race.includes(p.race))
      return false;
    if (
      filters.ethnicity.length > 0 &&
      !filters.ethnicity.includes(p.ethnicity)
    )
      return false;
    if (
      filters.smokingStatus.length > 0 &&
      !filters.smokingStatus.includes(p.smokingStatus)
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
        children: (CONDITIONS[name] ?? [])
          .filter((n) => cat.children.has(n))
          .map((n) => ({ name: n, value: cat.children.get(n)! })),
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

export interface SankeyNode {
  id: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const SANKEY_DIMENSIONS = [
  { key: "sex" as const, options: SEX_OPTIONS },
  { key: "race" as const, options: RACE_OPTIONS },
  { key: "ethnicity" as const, options: ETHNICITY_OPTIONS },
  { key: "smokingStatus" as const, options: SMOKING_OPTIONS },
];

export const SANKEY_COLUMN_LABELS = ["Sex", "Race", "Ethnicity", "Smoking"];

export function buildSankeyData(participants: Participant[]): SankeyData {
  if (participants.length === 0) {
    return { nodes: [], links: [] };
  }

  const nodes: SankeyNode[] = [];
  const nodeIds = new Set<string>();

  for (const dim of SANKEY_DIMENSIONS) {
    for (const option of dim.options) {
      const id = `${dim.key}:${option}`;
      nodeIds.add(id);
      nodes.push({ id });
    }
  }

  const linkCounts = new Map<string, number>();

  for (const p of participants) {
    for (let i = 0; i < SANKEY_DIMENSIONS.length - 1; i++) {
      const fromDim = SANKEY_DIMENSIONS[i];
      const toDim = SANKEY_DIMENSIONS[i + 1];
      const fromId = `${fromDim.key}:${p[fromDim.key]}`;
      const toId = `${toDim.key}:${p[toDim.key]}`;
      const key = `${fromId}|${toId}`;
      linkCounts.set(key, (linkCounts.get(key) ?? 0) + 1);
    }
  }

  const links: SankeyLink[] = [];
  for (const [key, value] of linkCounts) {
    const [source, target] = key.split("|");
    links.push({ source, target, value });
  }

  return { nodes, links };
}
