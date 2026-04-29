import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/bubble-chart/basic-usage';
import type { defaultProps as UsageProps } from './examples/bubble-chart/bubble-chart-on-click';
import BubbleChartOnClickExample from './examples/bubble-chart/bubble-chart-on-click';
import OnClickBubbleExample from './examples/bubble-chart/on-click-in-bubble';
import { getChartArgTypes } from './examples/stories_props_helper';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bubble-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: BasicUsageProps,
};
export const OnClickBubble: StoryObj = {
  render: OnClickBubbleExample,
};
export const BubbleChartOnClick: StoryObj<typeof UsageProps> = {
  render: BubbleChartOnClickExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
  },
  args: BasicUsageProps,
};
