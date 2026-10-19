import { useId } from "react";
import { Typography } from "@mui/material";
import ConceptCard from "../ConceptCard";
import {
  getSearchItemKey,
  type SearchItem,
} from "../../api/graphql/queries/resolveTerms";
import { CriteriaList, CriteriaSectionRoot } from "./CriteriaSection.styles";

// ----------------------------------------------------------------------

export interface Props {
  title: string;
  items: SearchItem[];
  onRemove: (item: SearchItem) => void;
}

// ----------------------------------------------------------------------

export default function CriteriaSection({ title, items, onRemove }: Props) {
  const titleId = useId();

  if (items.length === 0) return null;

  const actions = [{ label: "Remove", onClick: onRemove }];

  return (
    <CriteriaSectionRoot aria-labelledby={titleId}>
      <Typography id={titleId} component="h2" variant="overline">
        {title}
      </Typography>
      <CriteriaList>
        {items.map((item, i) => (
          <ConceptCard
            key={getSearchItemKey(item)}
            concept={item}
            isFirst={i === 0}
            isLast={i === items.length - 1}
            actions={actions}
            showDetails={false}
          />
        ))}
      </CriteriaList>
    </CriteriaSectionRoot>
  );
}
