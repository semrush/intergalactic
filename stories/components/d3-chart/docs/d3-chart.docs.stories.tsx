import type { Meta, StoryObj } from '@storybook/react';

import A11yFormattingExample from './examples/d3-chart/a11y-formatting';
import AdaptiveChartExample from './examples/d3-chart/adaptive-chart';
import AdditionalLinesExample from './examples/d3-chart/additional-lines';
import AxesExample from './examples/d3-chart/axes';
import AxesTitlesExample from './examples/d3-chart/axes-titles';
import AxesValuesExample from './examples/d3-chart/axis-values';
import BaseExample from './examples/d3-chart/base';
import ChartLegengExample from './examples/d3-chart/chart-legend';
import CustomPatternsExample from './examples/d3-chart/custom-patterns';
import EnforcingPatternsExample from './examples/d3-chart/enforcing-patterns';
import ExportToImageExample from './examples/d3-chart/export-to-image';
import LowLevelComponentsUseExample from './examples/d3-chart/low-level-components-use';
import PaddingMarginsExample from './examples/d3-chart/paddings-&-margins';
import PatternFillExample from './examples/d3-chart/pattern-fill';
import ReferenceLineExample from './examples/d3-chart/reference-line';
import SynchronousChartsExample from './examples/d3-chart/synchronous-charts';
import TooltipExample from './examples/d3-chart/tooltip';
import TooltipControlExample from './examples/d3-chart/tooltip-control';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/D3-Chart',
};

export default meta;

export const A11yFormatting: StoryObj = {
  render: A11yFormattingExample,
};

export const AdaptiveChart: StoryObj = {
  render: AdaptiveChartExample,
};

export const AdditionalLines: StoryObj = {
  render: AdditionalLinesExample,
};

export const Axes: StoryObj = {
  render: AxesExample,
};

export const AxesTitles: StoryObj = {
  render: AxesTitlesExample,
};

export const AxesValues: StoryObj = {
  render: AxesValuesExample,
};

export const Base: StoryObj = {
  render: BaseExample,
};

export const Tooltip: StoryObj = {
  render: TooltipExample,
};

export const ChartLegeng: StoryObj = {
  render: ChartLegengExample,
};

export const CustomPatterns: StoryObj = {
  render: CustomPatternsExample,
};

export const EnforcingPatterns: StoryObj = {
  render: EnforcingPatternsExample,
};

export const ExportToImage: StoryObj = {
  render: ExportToImageExample,
};

export const LowLevelComponentsUse: StoryObj = {
  render: LowLevelComponentsUseExample,
};

export const PaddingMargins: StoryObj = {
  render: PaddingMarginsExample,
};

export const PatternFill: StoryObj = {
  render: PatternFillExample,
};

export const ReferenceLine: StoryObj = {
  render: ReferenceLineExample,
};

export const SynchronousCharts: StoryObj = {
  render: SynchronousChartsExample,
};

export const TooltipControl: StoryObj = {
  render: TooltipControlExample,
};