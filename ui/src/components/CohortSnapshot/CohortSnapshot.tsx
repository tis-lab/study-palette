import { useId } from "react";
import { CircularProgress, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";
import type { SummaryResponse } from "../../api/graphql/queries/cohortSummary";
import {
  Donut,
  DonutCaption,
  DonutCenter,
  FILL_PARENT,
  SnapshotFooter,
  SnapshotPanel,
  SnapshotTitle,
} from "./CohortSnapshot.styles";

const CATALYST_BLUE = "#1A568C";
const GRAY = "#D9D9D9";

// ----------------------------------------------------------------------

export interface Props {
  summary?: SummaryResponse;
  /** Everyone who could be in a cohort; the donut shows the cohort against it. */
  availableParticipants: number;
  isLoading?: boolean;
}

// ----------------------------------------------------------------------

export default function CohortSnapshot({
  summary,
  availableParticipants,
  isLoading = false,
}: Props) {
  const titleId = useId();

  // Estimated: a participant in two studies is counted twice
  const participants =
    summary?.studies.reduce((sum, s) => sum + s.participant_count, 0) ?? 0;
  const donut = {
    series: [
      {
        type: "pie",
        radius: ["82%", "100%"],
        startAngle: 90,
        silent: true,
        animation: false,
        label: { show: false },
        data: [
          {
            name: "In cohort",
            value: participants,
            itemStyle: { color: CATALYST_BLUE },
          },
          {
            name: "Not in cohort",
            value: Math.max(availableParticipants - participants, 0),
            itemStyle: { color: GRAY },
          },
        ],
      },
    ],
  };

  return (
    <SnapshotPanel aria-labelledby={titleId}>
      <div>
        <SnapshotTitle id={titleId}>
          Cohort Snapshot
        </SnapshotTitle>
        <Typography variant="body2" color="text.secondary">
          Based on current cohort
        </Typography>
      </div>

      {isLoading && <CircularProgress aria-label="Loading cohort snapshot" />}

      {!isLoading && !summary && (
        <Typography variant="body2" color="text.secondary">
          Include or exclude concepts to see your cohort.
        </Typography>
      )}

      {!isLoading && summary && (
        <>
          <Donut>
            <ReactECharts option={donut} style={FILL_PARENT} />
            <DonutCenter>
              <Typography variant="h5" component="p">
                {participants.toLocaleString()}
              </Typography>
              <DonutCaption variant="caption">Estimated Participants</DonutCaption>
              <DonutCaption variant="caption" color="text.secondary">
                of {availableParticipants.toLocaleString()} available
              </DonutCaption>
            </DonutCenter>
          </Donut>

          <SnapshotFooter>
            <Typography variant="body2">
              Studies: <strong>{summary.studies.length}</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Participant count is estimated until query is executed
            </Typography>
          </SnapshotFooter>
        </>
      )}
    </SnapshotPanel>
  );
}
