import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/score-bar-chart/basic-usage';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Score-Bar-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};
