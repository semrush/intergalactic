import type { Meta } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/bar-horizontal-compact/basic_usage';
import { getChartArgTypes } from './examples/stories_props_helper';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Horizontal-Compact',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: BasicUsageProps,
};
