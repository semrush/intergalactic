import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/stacked-area-chart/basic-usage';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Stacked-Area-Chart',
};
export default meta;
export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
  },
  args: BasicUsageProps,
};
