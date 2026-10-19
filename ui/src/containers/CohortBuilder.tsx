import { useId } from "react";
import { Typography } from "@mui/material";
import Search from "./Search";
import { CohortBuilderLayout, SnapshotPanel } from "./CohortBuilder.styles";

// ----------------------------------------------------------------------

export default function CohortBuilder() {
  const snapshotTitleId = useId();

  return (
    <CohortBuilderLayout>
      <Search />

      <SnapshotPanel aria-labelledby={snapshotTitleId}>
        <Typography id={snapshotTitleId} component="h2" variant="overline">
          Cohort Snapshot
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Based on current cohort
        </Typography>
      </SnapshotPanel>
    </CohortBuilderLayout>
  );
}
