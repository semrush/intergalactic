import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as basicUsageProps } from './examples/donut-chart/basic-usage';
import DonutPropsExample, {
  defaultProps as donutPropsExampleProps,
} from './examples/donut-chart/donut-props';
import OnClickPieExample from './examples/donut-chart/on-click-pie';
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

export const DonutProps = {
  render: DonutPropsExample,
  argTypes: {
    innerRadius: { control: { type: 'number', min: 0, max: 150 } },
    outerRadius: { control: { type: 'number', min: 0, max: 150 } },
    paddingAngle: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
    halfsize: { control: { type: 'boolean' } },
    patterns: { control: { type: 'boolean' } },
    showLabel: { control: { type: 'boolean' } },
    showTooltip: { control: { type: 'boolean' } },
    data: { control: { type: 'object' } },
  },
  args: donutPropsExampleProps,
};

export const OnClickPie: StoryObj = {
  render: OnClickPieExample,
};
