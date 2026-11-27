import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as basicUsageProps } from './examples/donut-chart/basic-usage';
import OnClickPieExample, { defaultProps as onClickPieProps } from './examples/donut-chart/on-click-pie';
import { getNoAxisChartArgTypes, legendTypeControl } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Donut-Chart',
};

export default meta;

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getNoAxisChartArgTypes({
    ...legendTypeControl,
    innerRadius: { control: { type: 'number', min: 0 } },
    halfsize: { control: { type: 'boolean' } },
    innerLabel: { control: 'text' },
    innerDescription: { control: 'text' },
    logClickPie: { control: { type: 'boolean' } },
  }),
  args: basicUsageProps,
};

export const OnClickPie: StoryObj = {
  render: OnClickPieExample,
  argTypes: {
    showLabel: { control: { type: 'boolean' } },
  },
  args: onClickPieProps,
};
