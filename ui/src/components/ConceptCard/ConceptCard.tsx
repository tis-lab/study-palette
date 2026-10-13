import { useId, useState } from "react";
import { Button, Collapse, Stack } from "@mui/material";
import { Term } from "../../api/graphql/queries/resolveTerms";
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

// ----------------------------------------------------------------------

/* Prop Types */
type ConceptAction = (concept: Term) => void;

export interface Props {
  concept: Term;
  isFirst: boolean;
  isLast: boolean;
  onInclude?: ConceptAction;
  onExclude?: ConceptAction;
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
                {concept.label}
              </ConceptTitle>
            </Stack>

            <ConceptMeta component="p" variant="caption" color="text.secondary">
              {concept.id}
              {/* · {concept?.studies ?? 0} studies */}
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
                category={concept?.category}
                description={concept?.description}
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
