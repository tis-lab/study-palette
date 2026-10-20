import { useId } from "react";
import { CircularProgress, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";
import type { SummaryResponse } from "../../api/graphql/queries/cohortSummary";
import { CATALYST_BLUE, ECHARTS_FILL, NEUTRAL_GRAY } from "../../charts";
import { cohortParticipants } from "../../utils/summary";
import { Panel, PanelTitle } from "../Panel/Panel.styles";
import {
  Donut,
  DonutCaption,
  DonutCenter,
  SnapshotFooter,
} from "./CohortSnapshot.styles";

// ----------------------------------------------------------------------

export interface Props {
  /** Without one, everyone available is shown. */
  summary?: SummaryResponse;
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

  const participants = summary
    ? cohortParticipants(summary)
    : availableParticipants;

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
            itemStyle: { color: NEUTRAL_GRAY },
          },
        ],
      },
    ],
  };

  return (
    <Panel aria-labelledby={titleId}>
      <div>
        <PanelTitle id={titleId}>Cohort Snapshot</PanelTitle>
        <Typography variant="body2" color="text.secondary">
          Based on current cohort
        </Typography>
      </div>

      {isLoading ? (
        <CircularProgress aria-label="Loading cohort snapshot" />
      ) : (
        <>
          <Donut>
            <ReactECharts option={donut} style={ECHARTS_FILL} />
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
            {summary && (
              <Typography variant="body2">
                Studies: <strong>{summary.studies.length}</strong>
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              Participant count is estimated until query is executed
            </Typography>
          </SnapshotFooter>
        </>
      )}
    </Panel>
  );
}
