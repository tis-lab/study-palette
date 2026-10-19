import { useState } from "react";
import Search from "./Search";
import CriteriaSection from "../components/CriteriaSection";
import CohortSnapshot from "../components/CohortSnapshot";
import { useCohortSummary, type Criteria } from "../hooks/useCohortSummary";
import { AVAILABLE_PARTICIPANTS_PLACEHOLDER } from "../mocks/SYNTHETIC.cohortSummary";
import {
  getSearchItemKey,
  type SearchItem,
} from "../api/graphql/queries/resolveTerms";
import { CohortBuilderLayout, MainColumn } from "./CohortBuilder.styles";

// ----------------------------------------------------------------------

type CriteriaKind = keyof Criteria;

const without = (items: SearchItem[], item: SearchItem) =>
  items.filter((i) => getSearchItemKey(i) !== getSearchItemKey(item));

export default function CohortBuilder() {
  const [criteria, setCriteria] = useState<Criteria>({
    include: [],
    exclude: [],
  });
  const summary = useCohortSummary(criteria);

  // A concept is either included or excluded, never both, and never twice
  const add = (kind: CriteriaKind) => (item: SearchItem) =>
    setCriteria((prev) => ({
      include: without(prev.include, item),
      exclude: without(prev.exclude, item),
      [kind]: [...without(prev[kind], item), item],
    }));

  const remove = (kind: CriteriaKind) => (item: SearchItem) =>
    setCriteria((prev) => ({ ...prev, [kind]: without(prev[kind], item) }));

  return (
    <CohortBuilderLayout>
      <MainColumn>
        <Search onInclude={add("include")} onExclude={add("exclude")} />
        <CriteriaSection
          title="Include"
          items={criteria.include}
          onRemove={remove("include")}
        />
        <CriteriaSection
          title="Exclude"
          items={criteria.exclude}
          onRemove={remove("exclude")}
        />
      </MainColumn>

      <CohortSnapshot
        summary={summary.data}
        availableParticipants={AVAILABLE_PARTICIPANTS_PLACEHOLDER}
        isLoading={summary.isLoading}
      />
    </CohortBuilderLayout>
  );
}
