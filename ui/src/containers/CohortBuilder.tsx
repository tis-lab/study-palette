import { useId, useState } from "react";
import { Typography } from "@mui/material";
import Search from "./Search";
import CriteriaSection from "../components/CriteriaSection";
import type { Criteria } from "../hooks/useCohortSummary";
import {
  getSearchItemKey,
  type SearchItem,
} from "../api/graphql/queries/resolveTerms";
import {
  CohortBuilderLayout,
  MainColumn,
  SnapshotPanel,
} from "./CohortBuilder.styles";

// ----------------------------------------------------------------------

type CriteriaKind = keyof Criteria;

const without = (items: SearchItem[], item: SearchItem) =>
  items.filter((i) => getSearchItemKey(i) !== getSearchItemKey(item));

export default function CohortBuilder() {
  const snapshotTitleId = useId();
  const [criteria, setCriteria] = useState<Criteria>({
    include: [],
    exclude: [],
  });

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

      <SnapshotPanel aria-labelledby={snapshotTitleId}>
        <Typography id={snapshotTitleId} component="h2" variant="overline">
          Cohort Snapshot
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Based on current cohort
        </Typography>
      </SnapshotPanel>
    </CohortBuilderLayout>
  );
}
