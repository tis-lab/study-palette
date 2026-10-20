import { useQuery } from "@tanstack/react-query";
import {
  getSearchItemKey,
  type SearchItem,
} from "../api/graphql/queries/resolveTerms";
import type { SummaryResponse } from "../api/graphql/queries/cohortSummary";
import { t2dFemaleSummary, t2dSummary } from "../mocks/SYNTHETIC.cohortSummary";

export interface Criteria {
  include: SearchItem[];
  exclude: SearchItem[];
}

// Mock until the summary API lands: one filter (search or criterion) returns
// the t2d example, more return its female follow-up.
async function fetchCohortSummary(
  seed: string,
  criteria: Criteria,
): Promise<SummaryResponse> {
  const filters =
    (seed ? 1 : 0) + criteria.include.length + criteria.exclude.length;
  return filters > 1 ? t2dFemaleSummary : t2dSummary;
}

export function useCohortSummary(searchText: string, criteria: Criteria) {
  const seed = searchText.trim();
  const include = criteria.include.map(getSearchItemKey);
  const exclude = criteria.exclude.map(getSearchItemKey);

  return useQuery({
    queryKey: ["cohortSummary", seed, include, exclude],
    queryFn: () => fetchCohortSummary(seed, criteria),
    enabled: seed.length > 0 || include.length + exclude.length > 0,
  });
}
