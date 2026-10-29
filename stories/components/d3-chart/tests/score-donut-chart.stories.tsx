import type { Meta } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as basicUsageProps } from './examples/score-donut-chart/basic-usage';
import { getChartArgTypes, legendTypeControl } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Score-Donut-Chart',
};

export default meta;

const hidden = { table: { disable: true } } as const;

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    ...legendTypeControl,
    data: { control: { type: 'object' } },
    innerRadius: { control: { type: 'number', min: 0, max: 150 } },
    halfsize: { control: { type: 'boolean' } },
    withInnerLabel: { control: { type: 'boolean' } },
    useCustomValueFormatter: { control: { type: 'boolean' } },
    legendLabel: { control: 'text' },
    withSideMetric: { control: { type: 'boolean' } },
    // Omitted from ScoreDonutChartProps.
    showTotalInTooltip: hidden,
    showDeltaPercentInTooltip: hidden,
    deltaPercentGrowthColor: hidden,
    // Not used by a donut: there are no axes and one tooltip per slice.
    invertAxis: hidden,
    showXAxis: hidden,
    showYAxis: hidden,
    xTicksCount: hidden,
    yTicksCount: hidden,
    multilineXTicks: hidden,
    multilineYTicks: hidden,
    tooltipViewType: hidden,
    showPercentValueInTooltip: hidden,
  }),
  args: basicUsageProps,
};
