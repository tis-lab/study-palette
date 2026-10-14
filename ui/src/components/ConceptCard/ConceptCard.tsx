import { useId, useState } from "react";
import { Button, Chip, Collapse, Stack } from "@mui/material";
import { SearchItem } from "../../api/graphql/queries/resolveTerms";
import ConceptCardDetails from "./ConceptCardDetails";
import {
  ConceptCardBody,
  ConceptCardLayout,
  ConceptCardMain,
  ConceptCardRoot,
  ConceptMeta,
  ConceptTitle,
  DetailsButton,
  ExpandIcon,
} from "./ConceptCard.styles";

function formatDomain(domain: string): string {
  return domain
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// ----------------------------------------------------------------------

/* Prop Types */
type ConceptAction = (concept: SearchItem) => void;

export interface Props {
  concept: SearchItem;
  isFirst: boolean;
  isLast: boolean;
  onInclude?: ConceptAction;
  onExclude?: ConceptAction;
}

/* Normalizes both search item types into the fields the card renders. */
interface CardView {
  id: string;
  label: string;
  harmonizedStudyCount: number;
  category: string | null;
  description: string | null;
  isHarmonizedVariable: boolean;
  variableNames: string[];
}

function toCardView(item: SearchItem): CardView {
  if (item.__typename === "BdcVariable") {
    return {
      id: item.name,
      label: item.label,
      harmonizedStudyCount: item.studyCount,
      category: item.domain ? formatDomain(item.domain) : null,
      description: null,
      isHarmonizedVariable: true,
      variableNames: [],
    };
  }

  return {
    id: item.id,
    label: item.label,
    harmonizedStudyCount: item.bdc.studyCount,
    category: item.category,
    description: item.description,
    isHarmonizedVariable: false,
    variableNames: item.bdc.variableNames,
  };
}

// ----------------------------------------------------------------------

export default function ConceptCard({
  concept,
  isFirst,
  isLast,
  onInclude,
  onExclude,
}: Props) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const view = toCardView(concept);

  const actions: { label: string; onClick?: ConceptAction }[] = [
    { label: "+ Include", onClick: onInclude },
    { label: "+ Exclude", onClick: onExclude },
  ];

  return (
    <ConceptCardRoot variant="outlined" isFirst={isFirst} isLast={isLast}>
      <ConceptCardBody>
        <ConceptCardLayout>
          <ConceptCardMain>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
            >
              <ConceptTitle component="h2" variant="subtitle2">
                {view.label}
              </ConceptTitle>

              {view.isHarmonizedVariable && (
                <Chip
                  label="Harmonized Variable"
                  size="small"
                  color="success"
                />
              )}
            </Stack>

            <ConceptMeta component="p" variant="caption" color="text.secondary">
              {view.id} · x studies
            </ConceptMeta>

            <DetailsButton
              size="small"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={detailsId}
              startIcon={<ExpandIcon open={open} />}
            >
              Details
            </DetailsButton>

            <Collapse in={open} id={detailsId} unmountOnExit>
              <ConceptCardDetails
                category={view.category ?? undefined}
                description={view.description}
                variableNames={view.variableNames}
              />
            </Collapse>
          </ConceptCardMain>

          <Stack direction="row" spacing={1} flexShrink={0}>
            {actions.map((a) => (
              <Button
                key={a.label}
                variant="outlined"
                onClick={() => a.onClick?.(concept)}
              >
                {a.label}
              </Button>
            ))}
          </Stack>
        </ConceptCardLayout>
      </ConceptCardBody>
    </ConceptCardRoot>
  );
}
