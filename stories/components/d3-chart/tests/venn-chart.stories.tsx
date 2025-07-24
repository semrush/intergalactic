import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/venn-chart/basic-usage';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Venn-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};
