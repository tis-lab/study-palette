import { Tooltip } from "@mui/material";
import parseCurie from "../../utils/parseCurie";
import { ReactNode } from "react";
import {
  CategoryRoot,
  DetailFieldRoot,
  DetailsRoot,
  DetailTerm,
  DetailValue,
  SourceChip,
} from "./ConceptCardDetails.styles";

// ----------------------------------------------------------------------

/* Styles */

// ----------------------------------------------------------------------

/* Prop Types */
interface Props {
  category?: string;
  description?: string | null;
}

interface DetailFieldProps {
  label: string;
  value: ReactNode;
}

const SOURCE_NAMES: Record<string, string> = {
  biolink: "Biolink Model",
};

// ----------------------------------------------------------------------

/** Must be rendered inside a <dl> (e.g. ConceptCardDetails). */
export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <DetailFieldRoot>
      <DetailTerm component="dt" variant="overline" color="text.secondary">
        {label}
      </DetailTerm>
      <DetailValue>{value}</DetailValue>
    </DetailFieldRoot>
  );
}

export function CategoryValue({ value }: { value: string }) {
  const parsed = parseCurie(value);

  return (
    <CategoryRoot>
      <span>{parsed.label}</span>
      {parsed.source && (
        <Tooltip
          title={`${SOURCE_NAMES[parsed.source] ?? parsed.source} · ${parsed.raw}`}
        >
          <SourceChip label={parsed.source} size="small" variant="outlined" />
        </Tooltip>
      )}
    </CategoryRoot>
  );
}

export default function ConceptCardDetails({ category, description }: Props) {
  return (
    <DetailsRoot>
      {category && (
        <DetailField
          label="category"
          value={<CategoryValue value={category} />}
        />
      )}
      {description && <DetailField label="description" value={description} />}
    </DetailsRoot>
  );
}
