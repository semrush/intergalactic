import type { Meta, StoryObj } from '@storybook/react';

import BubbleChartExample from './examples/bubble-chart/bubble-chart';


const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bubble-Chart',
};

export default meta;

export const BubbleChart: StoryObj = {
  render: BubbleChartExample,
};