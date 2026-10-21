import { useState } from "react";
import Search from "./Search";
import CohortCriteria from "../components/CohortCriteria";
import CohortSnapshot from "../components/CohortSnapshot";
import Demographics from "../components/Demographics";
import { useCohortSummary, type Criteria } from "../hooks/useCohortSummary";
import { AVAILABLE_PARTICIPANTS_PLACEHOLDER } from "../mocks/SYNTHETIC.cohortSummary";
import {
  getSearchItemKey,
  type SearchItem,
} from "../api/graphql/queries/resolveTerms";
import { CohortBuilderLayout, Column } from "./CohortBuilder.styles";

// ----------------------------------------------------------------------

type CriteriaKind = keyof Criteria;

const without = (items: SearchItem[], item: SearchItem) =>
  items.filter((i) => getSearchItemKey(i) !== getSearchItemKey(item));

export default function CohortBuilder() {
  const [searchText, setSearchText] = useState("");
  const [criteria, setCriteria] = useState<Criteria>({
    include: [],
    exclude: [],
  });
  const summary = useCohortSummary(searchText, criteria);

  // An item is in at most one list, at most once
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
      <Column>
        <Search
          onSearch={setSearchText}
          onInclude={add("include")}
          onExclude={add("exclude")}
        />
        <CohortCriteria criteria={criteria} onRemove={remove} />
      </Column>

      <Column>
        <CohortSnapshot
          summary={summary.data}
          availableParticipants={AVAILABLE_PARTICIPANTS_PLACEHOLDER}
          isLoading={summary.isLoading}
          error={summary.error}
        />
        {summary.data && <Demographics summary={summary.data} />}
      </Column>
    </CohortBuilderLayout>
  );
}
