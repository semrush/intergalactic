import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/radar-chart/basic-usage';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Radar-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};
