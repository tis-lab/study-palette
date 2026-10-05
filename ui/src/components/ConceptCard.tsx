import { useId, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { Term } from "../api/graphql/queries/resolveTerms";
import ConceptCardDetails from "./ConceptCardDetails";

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

// ----------------------------------------------------------------------

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
              <ConceptCardDetails
                category={concept?.category}
                description={concept?.description}
              />
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
