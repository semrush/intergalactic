import type { Meta, StoryObj } from '@storybook/react-vite';

import BubbleChartExample from './examples/bubble-chart/bubble-chart';
import BubbleChartOnClickExample, { defaultProps as BasicUsageProps } from './examples/bubble-chart/bubble-chart-on-click';
import OnClickBubbleExample from './examples/bubble-chart/on-click-in-bubble';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bubble-Chart',
};

export default meta;

export const BubbleChart: StoryObj = {
  render: BubbleChartExample,
};

export const OnClickBubble: StoryObj = {
  render: OnClickBubbleExample,
};

export const BubbleChartOnClick: StoryObj<typeof BasicUsageProps> = {
  render: BubbleChartOnClickExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
  },
  args: BasicUsageProps,
};
