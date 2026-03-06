import type { Study } from "./types";

export interface DemoCondition {
  condition_concept: string;
  condition_status: string;
  count: number;
}

export interface DemoDemographics {
  sex: string;
  count: number;
}

export const DEMO_STUDIES: Study[] = [
  {
    id: "phs000209",
    name: "CARe: Candidate Gene Association Resource",
    description: "Multi-ethnic cohort study of cardiovascular, lung, blood, and sleep disorders.",
    participant_count: 40181,
    data_types: ["Genomic", "Phenotypic", "Clinical"],
  },
  {
    id: "phs000179",
    name: "MESA: Multi-Ethnic Study of Atherosclerosis",
    description: "Prospective study of subclinical cardiovascular disease progression.",
    participant_count: 6814,
    data_types: ["Imaging", "Genomic", "Phenotypic"],
  },
  {
    id: "phs000286",
    name: "ARIC: Atherosclerosis Risk in Communities",
    description: "Community-based prospective cohort study of cardiovascular disease etiology.",
    participant_count: 15792,
    data_types: ["Genomic", "Phenotypic", "Clinical", "Imaging"],
  },
  {
    id: "phs001024",
    name: "JHS: Jackson Heart Study",
    description: "Prospective study of cardiovascular disease among African Americans.",
    participant_count: 5306,
    data_types: ["Genomic", "Phenotypic", "Clinical"],
  },
];

export const DEMO_CONDITIONS: Record<string, DemoCondition[]> = {
  phs000209: [
    { condition_concept: "Coronary artery disease", condition_status: "PRESENT", count: 8200 },
    { condition_concept: "Coronary artery disease", condition_status: "ABSENT", count: 31981 },
    { condition_concept: "Heart failure", condition_status: "PRESENT", count: 5100 },
    { condition_concept: "Heart failure", condition_status: "ABSENT", count: 35081 },
    { condition_concept: "Asthma", condition_status: "PRESENT", count: 4700 },
    { condition_concept: "Asthma", condition_status: "ABSENT", count: 35481 },
  ],
  phs000179: [
    { condition_concept: "Atherosclerosis", condition_status: "PRESENT", count: 2840 },
    { condition_concept: "Atherosclerosis", condition_status: "ABSENT", count: 3974 },
    { condition_concept: "Hypertension", condition_status: "PRESENT", count: 3100 },
    { condition_concept: "Hypertension", condition_status: "ABSENT", count: 3714 },
    { condition_concept: "Diabetes mellitus", condition_status: "PRESENT", count: 920 },
    { condition_concept: "Diabetes mellitus", condition_status: "ABSENT", count: 5894 },
  ],
  phs000286: [
    { condition_concept: "Coronary artery disease", condition_status: "PRESENT", count: 4200 },
    { condition_concept: "Coronary artery disease", condition_status: "ABSENT", count: 11592 },
    { condition_concept: "Stroke", condition_status: "PRESENT", count: 1800 },
    { condition_concept: "Stroke", condition_status: "ABSENT", count: 13992 },
    { condition_concept: "Hypertension", condition_status: "PRESENT", count: 6300 },
    { condition_concept: "Hypertension", condition_status: "ABSENT", count: 9492 },
  ],
  phs001024: [
    { condition_concept: "Hypertension", condition_status: "PRESENT", count: 3400 },
    { condition_concept: "Hypertension", condition_status: "ABSENT", count: 1906 },
    { condition_concept: "Diabetes mellitus", condition_status: "PRESENT", count: 1200 },
    { condition_concept: "Diabetes mellitus", condition_status: "ABSENT", count: 4106 },
    { condition_concept: "Obesity", condition_status: "PRESENT", count: 2650 },
    { condition_concept: "Obesity", condition_status: "ABSENT", count: 2656 },
  ],
};

export const DEMO_DEMOGRAPHICS: Record<string, DemoDemographics[]> = {
  phs000209: [
    { sex: "OMOP:8507", count: 19280 },
    { sex: "OMOP:8532", count: 20901 },
  ],
  phs000179: [
    { sex: "OMOP:8507", count: 3254 },
    { sex: "OMOP:8532", count: 3560 },
  ],
  phs000286: [
    { sex: "OMOP:8507", count: 7120 },
    { sex: "OMOP:8532", count: 8672 },
  ],
  phs001024: [
    { sex: "OMOP:8507", count: 1814 },
    { sex: "OMOP:8532", count: 3492 },
  ],
};
