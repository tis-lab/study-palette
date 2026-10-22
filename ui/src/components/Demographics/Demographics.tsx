import { useId, useState } from "react";
import { Tab, Tabs, Typography, useTheme } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReactECharts from "echarts-for-react";
import type { SummaryResponse } from "../../api/graphql/queries/cohortSummary";
import { ECHARTS_FILL } from "../../charts";
import {
  cohortParticipants,
  demographicBreakdown,
  type DemographicSlot,
} from "../../utils/summary";
import EmptyState from "../EmptyState";
import { PanelSection, PanelTitle } from "../Panel/Panel.styles";
import { BarArea } from "./Demographics.styles";

// ----------------------------------------------------------------------

const SLOTS: { slot: DemographicSlot; label: string }[] = [
  { slot: "sex", label: "Sex" },
  { slot: "race", label: "Race" },
  { slot: "ethnicity", label: "Ethnicity" },
];

export interface Props {
  /** Absent until there is a cohort to describe. */
  summary?: SummaryResponse;
}

// ----------------------------------------------------------------------

export default function Demographics({ summary }: Props) {
  const titleId = useId();

  return (
    <PanelSection aria-labelledby={titleId}>
      <div>
        <PanelTitle id={titleId}>Demographics</PanelTitle>
        {summary && (
          <Typography variant="body2" color="text.secondary">
            {cohortParticipants(summary).toLocaleString()} participants ·{" "}
            {summary.studies.length} studies
          </Typography>
        )}
      </div>

      {summary ? (
        <Breakdown summary={summary} />
      ) : (
        <EmptyState
          icon={<BarChartIcon />}
          title="Add criteria to view demographics"
          description="Search for a concept to see the demographic distribution for your cohort."
        />
      )}
    </PanelSection>
  );
}

function Breakdown({ summary }: { summary: SummaryResponse }) {
  const theme = useTheme();
  const [slot, setSlot] = useState<DemographicSlot>("sex");

  const total = cohortParticipants(summary);
  const rows = demographicBreakdown(summary, slot);
  const percent = (count: number) => Math.round((count / total) * 100);

  const bars = {
    aria: { enabled: true },
    textStyle: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.secondary,
    },
    animation: false,
    grid: { left: 0, right: 80, top: 0, bottom: 0, containLabel: true },
    xAxis: { type: "value", max: total, show: false },
    yAxis: {
      type: "category",
      inverse: true,
      data: rows.map((r) => r.label),
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        barWidth: 10,
        showBackground: true,
        backgroundStyle: {
          color: theme.palette.grey[200],
          borderRadius: theme.shape.borderRadius,
        },
        itemStyle: {
          color: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadius,
        },
        label: {
          show: true,
          position: "right",
          color: theme.palette.text.primary,
          formatter: ({ value }: { value: number }) =>
            `${value.toLocaleString()} · ${percent(value)}%`,
        },
        data: rows.map((r) => ({ name: r.label, value: r.count })),
      },
    ],
  };

  return (
    <>
      <Tabs
        value={slot}
        onChange={(_, value: DemographicSlot) => setSlot(value)}
        variant="fullWidth"
      >
        {SLOTS.map((s) => (
          <Tab key={s.slot} value={s.slot} label={s.label} />
        ))}
      </Tabs>

      {rows.length > 0 ? (
        <BarArea rows={rows.length}>
          <ReactECharts option={bars} style={ECHARTS_FILL} />
        </BarArea>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Not reported for this cohort.
        </Typography>
      )}

      <Typography variant="caption" color="text.secondary">
        Counts are aggregated across studies. Categories may not total 100% when
        values are not reported.
      </Typography>
    </>
  );
}
