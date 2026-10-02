import { ReactNode, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  // Chip,
  Button,
  Typography,
  Collapse,
  Stack,
  type SxProps,
  type Theme,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { PrimaryButton } from "./Button";
import { Term } from "../api/graphql/queries/resolveTerms";

// ----------------------------------------------------------------------

/* Styles */
const RADIUS = 12;
const BORDER = "#D1D5DC";
const NAVY = "#1E3A5F";

// const chipBase: SxProps<Theme> = {
//   fontWeight: 500,
//   fontSize: 12,
//   borderRadius: "999px",
// };

// const chipStyles = {
//   harmonized: { bgcolor: "#D5F5E3", color: "#0E7A4B" },
//   parent: { bgcolor: "#C6E4FA", color: "#0B2545" },
// } as const;

// ----------------------------------------------------------------------

/* Prop Types */
type ConceptAction = (concept: Term) => void;

interface ConceptCardProps {
  concept: Term;
  isFirst: boolean;
  isLast: boolean;
  onInclude?: ConceptAction;
  onExclude?: ConceptAction;
}

interface DetailFieldProps {
  label: string;
  value: ReactNode;
  sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

export function DetailField({ label, value, sx }: DetailFieldProps) {
  return (
    <Box sx={[{ minWidth: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography
        component="dt"
        sx={{
          fontSize: 12,
          lineHeight: 1.4,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#9CA3AF",
        }}
      >
        {label}
      </Typography>
      <Typography
        component="dd"
        sx={{
          m: 0,
          mt: 0.25,
          fontSize: 14,
          fontWeight: 600,
          color: "#1F2937",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function ConceptCard({
  concept,
  isFirst,
  isLast,
  onInclude,
  onExclude,
}: ConceptCardProps) {
  const [open, setOpen] = useState(false);

  const actions: { label: string; onClick?: ConceptAction }[] = [
    { label: "+ Include", onClick: onInclude },
    { label: "+ Exclude", onClick: onExclude },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${BORDER}`,
        // Only the outer corners of the group are rounded
        borderTopLeftRadius: isFirst ? RADIUS : 0,
        borderTopRightRadius: isFirst ? RADIUS : 0,
        borderBottomLeftRadius: isLast ? RADIUS : 0,
        borderBottomRightRadius: isLast ? RADIUS : 0,
        // Collapse shared borders so adjacent cards show a single 1px line
        ...(!isFirst && { borderTop: "none" }),
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <Box sx={{ minWidth: 0, width: "100%" }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, fontSize: 14, color: "#101828" }}
              >
                {concept.label}
              </Typography>
              {/* {concept?.harmonized && (
                <Chip
                  label="Harmonized Variable"
                  size="small"
                  sx={[chipBase, chipStyles.harmonized] as SxProps<Theme>}
                />
              )}
              {concept?.parent && (
                <Chip
                  label="Parent Concept"
                  size="small"
                  sx={[chipBase, chipStyles.parent] as SxProps<Theme>}
                />
              )} */}
            </Stack>

            <Typography sx={{ mt: 0.75, fontSize: 12, color: "#6A7282" }}>
              {concept.id} · {/*  {concept?.studies ?? 0} studies */}
            </Typography>

            <Button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              startIcon={
                <ChevronRight
                  sx={{
                    transition: "transform 150ms",
                    transform: open ? "rotate(90deg)" : "none",
                  }}
                />
              }
              sx={{
                mt: 1.5,
                ml: -1,
                px: 1,
                textTransform: "none",
                color: NAVY,
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 600,
                fontSize: 13,
                "& .MuiButton-startIcon": { mr: 0.5 },
              }}
            >
              Details
            </Button>

            <Collapse in={open} unmountOnExit>
              <Box
                sx={{
                  p: 1.5,
                  color: "#374151",
                  fontSize: 14,
                  backgroundColor: "#F8FAFC",
                  border: `1px solid #F1F5F9`,
                  borderRadius: "12px",
                  width: "100%",
                }}
              >
                {concept?.category && (
                  <DetailField label="category" value={concept.category} />
                )}
                {concept?.description && (
                  <DetailField
                    label="description"
                    value={concept.description}
                  />
                )}
              </Box>
            </Collapse>
          </Box>

          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
            {actions.map((a) => (
              <PrimaryButton
                key={a.label}
                variant="outlined"
                onClick={() => a.onClick?.(concept)}
              >
                {a.label}
              </PrimaryButton>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
