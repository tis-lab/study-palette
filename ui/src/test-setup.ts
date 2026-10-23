import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { vi } from "vitest";

// jsdom has no canvas for ECharts; list each series' data as "name: value" instead
vi.mock("echarts-for-react", () => ({
  default: ({
    option,
  }: {
    option: { series: { data: { name: string; value: number }[] }[] };
  }) =>
    createElement(
      "ul",
      { "aria-label": "chart" },
      option.series.flatMap((s) =>
        s.data.map((d) => createElement("li", { key: d.name }, `${d.name}: ${d.value}`)),
      ),
    ),
}));

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
