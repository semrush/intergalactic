import type { Meta, StoryObj } from '@storybook/react';

import BubbleChartExample from './examples/bubble-chart/bubble-chart';
import BasicUsageExample from './examples/bubble-chart/basic-usage';
import ColorCustomizationExample from './examples/bubble-chart/color-customization';
import InitialdataLoadingExample from './examples/bubble-chart/initial-data-loading';
import LegendAndPatternFillExample from './examples/bubble-chart/legend-and-pattern-fill';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Bubble-Chart',
};

export default meta;

export const BubbleChart: StoryObj = {
  render: BubbleChartExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const ColorCustomization: StoryObj = {
  render: ColorCustomizationExample,
};

export const InitialdataLoading: StoryObj = {
  render: InitialdataLoadingExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};