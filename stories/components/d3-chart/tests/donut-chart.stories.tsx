import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as basicUsageProps } from './examples/donut-chart/basic-usage';
import DonutPropsExample from './examples/donut-chart/donut-props';
import ShowLegendPropExample, { defaultProps as ShowLegendPropExampleProps } from './examples/donut-chart/donut-show-legend-prop';
import LegendAndPatternFillExample from './examples/donut-chart/legend-and-pattern-fill';
import OnClickPieExample from './examples/donut-chart/on-click-pie';
import SemiDonutExample from './examples/donut-chart/semi-donut';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Donut-Chart',
};

export default meta;

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: basicUsageProps,
};

export const DonutProps: StoryObj = {
  render: DonutPropsExample,
};

export const SemiDonutWithOneActive: StoryObj = {
  render: SemiDonutExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};

export const OnClickPie: StoryObj = {
  render: OnClickPieExample,
};

export const ShowLegendProp: StoryObj<typeof ShowLegendPropExampleProps> = {
  render: ShowLegendPropExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
    data: {
      control: 'object',
    },
  },
  args: ShowLegendPropExampleProps,
};
