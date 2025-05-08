import type { Meta, StoryObj } from '@storybook/react';


import DateFormatWithTooltipExample from './examples/bar-chart/date-format-with-tooltip';
import BarsPropsExample from './examples/bar-chart/bars-props';


const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Chart',
};

export default meta;



export const DateFormatWithTooltip: StoryObj = {
  render: DateFormatWithTooltipExample,
};

export const BarsProps: StoryObj = {
  render: BarsPropsExample,
};
