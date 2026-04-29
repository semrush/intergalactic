import type { Meta, StoryObj } from '@storybook/react-vite';

import { getChartArgTypes } from './examples/stories_props_helper';
import BasicUsageExample, { defaultProps as ShowLegendPropExampleProps } from './examples/venn-chart/basic-usage';
import onClickVennExample from './examples/venn-chart/on-click-venn';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Venn-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: ShowLegendPropExampleProps,
};
export const onClickVenn: StoryObj = {
  render: onClickVennExample,
};
