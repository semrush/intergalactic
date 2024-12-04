// Utils
// @ts-ignore
import { interpolateValue as intValue, PlotEventEmitter } from './utils';

export declare const interpolateValue: typeof intValue;
export declare function minMax(data: any, key: string | number): any;
export declare function calculateBubbleDomain(
  data: Array<{ value: number; x: number; y: number }>,
  key: 'x' | 'y',
  range: [number, number],
): [min: number, max: number];
export { PlotEventEmitter };

export { makeDataHintsContainer } from './a11y/hints';

// Color
/**
 * @deprecated
 * This export will be removed in the next major release.
 */
export declare const colors: { [key: string]: string };

export { default as Plot } from './Plot';
export * from './Plot';

export * from './Axis';
export * from './Hover';

export { default as ResponsiveContainer } from './ResponsiveContainer';
export * from './ResponsiveContainer';

export { default as Line } from './Line';
export * from './Line';

export { default as Bar } from './Bar';
export * from './Bar';

export { default as HorizontalBar } from './HorizontalBar';
export * from './HorizontalBar';

export { default as CompactHorizontalBar } from './CompactHorizontalBar';
export * from './CompactHorizontalBar';

export { default as GroupBar } from './GroupBar';
export * from './GroupBar';

export { default as StackBar } from './StackBar';
export * from './StackBar';

export { default as Area } from './Area';
export * from './Area';

export { default as StackedArea } from './StackedArea';
export * from './StackedArea';

export { default as Radar } from './Radar';
export * from './Radar';

export { default as Donut } from './Donut';
export * from './Donut';

export { default as Tooltip } from './Tooltip';
export * from './Tooltip';

export { default as ScatterPlot } from './ScatterPlot';
export * from './ScatterPlot';

export { default as Bubble } from './Bubble';
export * from './Bubble';

export * from './Reference';

export { default as Venn } from './Venn';
export * from './Venn';

/** It becomes resolvable after building and moving file to lib dir */

// @ts-ignore
export { default as RadialTree } from './RadialTree';

// @ts-ignore
export * from './RadialTree';

// @ts-ignore
export { ChartLegend, ChartLegendTable } from './component/ChartLegend';

// @ts-ignore
export * from './component/ChartLegend/LegendFlex/LegendFlex.type';
// @ts-ignore
export * from './component/ChartLegend/LegendTable/LegendTable.type';
// @ts-ignore
export * from './component/ChartLegend/LegendItem/LegendItem.type';

// @ts-ignore
export * from './Pattern';

export { default as Chart } from './component/Chart';
export * from './component/Chart/AbstractChart.type';
export * from './component/Chart/LineChart.type';
export * from './component/Chart/BarChart.type';
export * from './component/Chart/HistogramChart.type';
export * from './component/Chart/ScatterPlotChart.type';
export * from './component/Chart/AreaChart.type';
export * from './component/Chart/BubbleChart.type';
export * from './component/Chart/DonutChart.type';
export * from './component/Chart/VennChart.type';
export * from './component/Chart/RadarChart.type';
export * from './component/Chart/ScatterPlotChart.type';
export * from './component/Chart/CigaretteChart.type';

export { default as StackGroupBar } from './component/StackGroupBar/StackGroupBar';
