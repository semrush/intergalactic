import type { Meta } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/score-bar-chart/basic-usage';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Score-Bar-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: {
    mode: { control: 'select', options: ['default', 'compact'] },
  },
  args: BasicUsageProps,
};
