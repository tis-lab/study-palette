import {
  Box,
  Chip,
  Tooltip,
  Typography,
  styled,
  type SxProps,
  type Theme,
} from "@mui/material";
import parseCurie from "../utils/parseCurie";
import { ReactNode } from "react";

// ----------------------------------------------------------------------

/* Styles */
const DetailsRoot = styled("dl", {
  name: "CohortConceptCard",
  slot: "Details",
})(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(1.5),
  display: "grid",
  gap: theme.spacing(1),
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

// ----------------------------------------------------------------------

/* Prop Types */
interface Props {
  category?: string;
  description?: string | null;
}

interface DetailFieldProps {
  label: string;
  value: ReactNode;
  sx?: SxProps<Theme>;
}

const SOURCE_NAMES: Record<string, string> = {
  biolink: "Biolink Model",
};

// ----------------------------------------------------------------------

/** Must be rendered inside a <dl> (e.g. ConceptCardDetails). */
export function DetailField({ label, value, sx }: DetailFieldProps) {
  return (
    <Box sx={[{ minWidth: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography
        component="dt"
        variant="overline"
        color="text.secondary"
        sx={{ lineHeight: 1.4 }}
      >
        {label}
      </Typography>
      <Box
        component="dd"
        sx={(theme) => ({
          ...theme.typography.body2,
          m: 0,
          mt: 0.25,
          fontWeight: theme.typography.fontWeightMedium,
          overflowWrap: "anywhere",
        })}
      >
        {value}
      </Box>
    </Box>
  );
}

export function CategoryValue({ value }: { value: string }) {
  const parsed = parseCurie(value);

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      <span>{parsed.label}</span>
      {parsed.source && (
        <Tooltip
          title={`${SOURCE_NAMES[parsed.source] ?? parsed.source} · ${parsed.raw}`}
        >
          <Chip
            label={parsed.source}
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: "0.6875rem",
              fontWeight: "fontWeightMedium",
              color: "text.secondary",
            }}
          />
        </Tooltip>
      )}
    </Box>
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
