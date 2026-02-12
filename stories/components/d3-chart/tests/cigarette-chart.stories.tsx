import type { Meta } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as basicUsageProps } from './examples/cigarette-chart/basic-usage';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Cigarette-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    showPercentValueInTooltip: { control: { type: 'boolean' } },
  }),
  args: basicUsageProps,
};
