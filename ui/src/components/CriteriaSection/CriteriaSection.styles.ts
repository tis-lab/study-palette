import { Stack, styled } from "@mui/material";

export const CriteriaSectionRoot = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const CriteriaList = styled(Stack)({
  width: "100%",
});
