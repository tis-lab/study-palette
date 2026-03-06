import type { OverviewData } from "./OverviewCharts";

export const DEMO_OVERVIEW: OverviewData = {
  conditions: [
    { name: "Cardiovascular", value: 45200, children: [
      { name: "Coronary artery disease", value: 18500 },
      { name: "Heart failure", value: 12300 },
      { name: "Hypertension", value: 14400 },
    ]},
    { name: "Respiratory", value: 22800, children: [
      { name: "Asthma", value: 9400 },
      { name: "COPD", value: 8200 },
      { name: "Lung fibrosis", value: 5200 },
    ]},
    { name: "Cancer", value: 15600, children: [
      { name: "Lung cancer", value: 7800 },
      { name: "Breast cancer", value: 4900 },
      { name: "Colorectal cancer", value: 2900 },
    ]},
    { name: "Neurologic", value: 11400, children: [
      { name: "Stroke", value: 6100 },
      { name: "Alzheimer's", value: 3200 },
      { name: "Parkinson's", value: 2100 },
    ]},
  ],
  procedures: [
    { name: "Echocardiography", value: 28700 },
    { name: "Spirometry", value: 19200 },
    { name: "CT imaging", value: 15800 },
    { name: "Blood panel", value: 42100 },
    { name: "Genetic sequencing", value: 31500 },
  ],
};
