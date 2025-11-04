import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as ShowLegendPropExampleProps } from './examples/venn-chart/basic-usage';
import onClickVennExample from './examples/venn-chart/on-click-venn';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Venn-Chart',
};

export default meta;

export const BasicUsage: StoryObj<typeof ShowLegendPropExampleProps> = {
  render: BasicUsageExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
  },
  args: ShowLegendPropExampleProps,
};

export const onClickVenn: StoryObj = {
  render: onClickVennExample,
};
