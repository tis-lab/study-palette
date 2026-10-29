// A toy UI: reads contract documents through types generated from the LinkML
// schema. No interface here is written by hand; when the schema changes,
// `make -C contracts` regenerates them and the compiler shows what broke.
//
//   make -C contracts client                                  type-check
//   node --experimental-transform-types contracts/toy/client.ts   run against the toy server

import type { SummaryResponse, Term } from "../generated/typescript/summary.ts";

const API = "http://127.0.0.1:8001";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`);
  if (!response.ok) throw new Error(`${path}: ${response.status} ${await response.text()}`);
  return (await response.json()) as T;
}

const summary = await get<SummaryResponse>("/summary/t2d");

// Every term the response mentions is inside it, so labels need no second call.
const labels = new Map((summary.terms ?? []).map((term) => [term.curie, term.label]));
console.log(`Searched for ${labels.get(summary.seed ?? "") ?? summary.seed} in ${summary.release}`);

for (const study of summary.studies ?? []) {
  console.log(`  ${study.research_study}: ${study.participant_count} participants`);
}

// The terms contract on its own: resolve one CURIE.
const seed = await get<Term>(`/terms/${summary.seed}`);
console.log(`Resolved ${seed.curie} -> ${seed.label}`);
