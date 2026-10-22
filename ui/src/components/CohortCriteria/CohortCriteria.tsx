import { useId } from "react";
import { CardContent, Chip, Stack, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CriteriaSection from "../CriteriaSection";
import { EmptyCard } from "../EmptyState/EmptyState.styles";
import { Panel, PanelTitle } from "../Panel/Panel.styles";
import type { SearchItem } from "../../api/graphql/queries/resolveTerms";
import type { Criteria } from "../../hooks/useCohortSummary";
import { Header, Sections } from "./CohortCriteria.styles";

// ----------------------------------------------------------------------

export interface Props {
  criteria: Criteria;
  onRemove: (kind: keyof Criteria) => (item: SearchItem) => void;
}

// ----------------------------------------------------------------------

export default function CohortCriteria({ criteria, onRemove }: Props) {
  const titleId = useId();
  const total = criteria.include.length + criteria.exclude.length;

  return (
    <Panel as="section" aria-labelledby={titleId}>
      <Header>
        <div>
          <PanelTitle id={titleId}>Cohort Criteria</PanelTitle>
          <Typography variant="body2" color="text.secondary">
            Define who should and should not be part of this cohort.
          </Typography>
        </div>
        <Chip
          label={`${total} ${total === 1 ? "criterion" : "criteria"}`}
          size="small"
        />
      </Header>

      {total === 0 ? (
        <EmptyCard elevation={0}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <FilterListIcon color="action" />
              <div>
                <Typography variant="subtitle2" component="p">
                  No criteria added yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Search above, then add a concept as Include or Exclude.
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </EmptyCard>
      ) : (
        <Sections>
          <CriteriaSection
            title="Include"
            emptyText="No inclusion criteria added"
            items={criteria.include}
            onRemove={onRemove("include")}
          />
          <CriteriaSection
            title="Exclude"
            emptyText="No exclusion criteria added"
            items={criteria.exclude}
            onRemove={onRemove("exclude")}
          />
        </Sections>
      )}
    </Panel>
  );
}
