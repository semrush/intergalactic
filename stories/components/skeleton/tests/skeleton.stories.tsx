import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '@semcore/skeleton';

import LineChartExample from './examples/skeleton-in-charts/line-chart-skeleton';
import AreaChartExample from './examples/skeleton-in-charts/area-chart-skeleton';
import BarChartExample from './examples/skeleton-in-charts/bar-chart-skeleton';
import BubbleChartExample from './examples/skeleton-in-charts/bubble-chart-skeleton';
import DonutChartExample from './examples/skeleton-in-charts/donut-chart-skeleton';
import HistogramChartExample from './examples/skeleton-in-charts/histogram-chart-skeleton';
import RadialChartExample from './examples/skeleton-in-charts/radial-tree-chart-skeleton';
import SkatterplotChartExample from './examples/skeleton-in-charts/skatterplot-chart-skeleton';
import VennChartExample from './examples/skeleton-in-charts/venn-chart-skeleton';


import SkeletonThemesExample from './examples/skeleton-themes';
import ObserveParentSizeExample from './examples/observe-parent-size';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton/Tests',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const VennChart: Story = {
  render: VennChartExample,
};

export const SkatterplotChart: Story = {
  render: SkatterplotChartExample,
};

export const LineChart: Story = {
  render: LineChartExample,
};

export const AreaChart: Story = {
  render: AreaChartExample,
};

export const BarChart: Story = {
  render: BarChartExample,
};

export const BubbleChart: Story = {
  render: BubbleChartExample,
};

export const DonutChart: Story = {
  render: DonutChartExample,
};

export const HistogramChart: Story = {
  render: HistogramChartExample,
};

export const RadialChart: Story = {
  render: RadialChartExample,
};


export const SkeletonThemes: Story = {
  render: SkeletonThemesExample,
};

export const ObserveParentSize: Story = {
  render: ObserveParentSizeExample,
};
