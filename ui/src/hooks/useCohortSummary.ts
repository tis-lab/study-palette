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

// Mock until the summary API is available: one criterion returns the type 2
// diabetes example, more than one returns its narrower female follow-up.
async function fetchCohortSummary(criteria: Criteria): Promise<SummaryResponse> {
  const count = criteria.include.length + criteria.exclude.length;
  return count > 1 ? t2dFemaleSummary : t2dSummary;
}

export function useCohortSummary(criteria: Criteria) {
  const include = criteria.include.map(getSearchItemKey);
  const exclude = criteria.exclude.map(getSearchItemKey);

  return useQuery({
    queryKey: ["cohortSummary", include, exclude],
    queryFn: () => fetchCohortSummary(criteria),
    enabled: include.length + exclude.length > 0,
  });
}
