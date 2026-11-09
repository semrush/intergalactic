import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/score-donut-chart/basic-usage';
import HalfSizeExample from './examples/score-donut-chart/semi-donut';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Score-Donut-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const SemiDonut: StoryObj = {
  render: HalfSizeExample,
};
