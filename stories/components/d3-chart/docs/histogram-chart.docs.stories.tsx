import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/histogram-chart/basic-usage';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Histogram-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};
