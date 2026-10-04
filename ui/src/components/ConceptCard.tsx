import { ReactNode, useId, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Stack,
  Typography,
  styled,
  type SxProps,
  type Theme,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { Term } from "../api/graphql/queries/resolveTerms";

// ----------------------------------------------------------------------

/* Styles */
interface ConceptCardRootProps {
  isFirst: boolean;
  isLast: boolean;
}

const ConceptCardRoot = styled(Card, {
  name: "CohortConceptCard",
  slot: "Root",
  shouldForwardProp: (prop) => prop !== "isFirst" && prop !== "isLast",
})<ConceptCardRootProps>(({ isFirst, isLast }) => ({
  // Outer corners inherit the theme's Card radius; only flatten inner corners
  ...(!isFirst && {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: "none", // adjacent cards share a single line
  }),
  ...(!isLast && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }),
}));

const ConceptCardDetails = styled("dl", {
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
      <Typography
        component="dd"
        variant="body2"
        sx={{
          m: 0,
          mt: 0.25,
          fontWeight: "fontWeightMedium",
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
  const detailsId = useId();

  const actions: { label: string; onClick?: ConceptAction }[] = [
    { label: "+ Include", onClick: onInclude },
    { label: "+ Exclude", onClick: onExclude },
  ];

  return (
    <ConceptCardRoot variant="outlined" isFirst={isFirst} isLast={isLast}>
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
                component="h2"
                variant="subtitle2"
                sx={{ fontWeight: "fontWeightBold" }}
              >
                {concept.label}
              </Typography>
            </Stack>

            <Typography
              component="p"
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.75 }}
            >
              {concept.id}
              {/* · {concept?.studies ?? 0} studies */}
            </Typography>

            <Button
              size="small"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={detailsId}
              startIcon={
                <ChevronRight
                  sx={(theme) => ({
                    transition: theme.transitions.create("transform", {
                      duration: theme.transitions.duration.shortest,
                    }),
                    transform: open ? "rotate(90deg)" : "none",
                  })}
                />
              }
              sx={{
                mt: 1.5,
                ml: -1,
                px: 1,
                "& .MuiButton-startIcon": { mr: 0.5 },
              }}
            >
              Details
            </Button>

            <Collapse in={open} id={detailsId} unmountOnExit>
              <ConceptCardDetails>
                {concept?.category && (
                  <DetailField label="category" value={concept.category} />
                )}
                {concept?.description && (
                  <DetailField
                    label="description"
                    value={concept.description}
                  />
                )}
              </ConceptCardDetails>
            </Collapse>
          </Box>

          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
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
        </Box>
      </CardContent>
    </ConceptCardRoot>
  );
}
