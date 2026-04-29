import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/line-chart/basic-usage';
import HiddenHoverPropExample from './examples/line-chart/disable-hover-line';
import LineAreWithEmptyExample from './examples/line-chart/line-area-with-empty';
import LinesExample from './examples/line-chart/lines';
import { getChartArgTypes } from './examples/stories_props_helper';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Line-Chart',
};
export default meta;
export const HiddenHoverProp: StoryObj = {
  render: HiddenHoverPropExample,
};
export const LineAreWithEmpty: StoryObj = {
  render: LineAreWithEmptyExample,
};
export const Lines: StoryObj = {
  render: LinesExample,
};
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: BasicUsageProps,
};
