import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/stacked-area-chart/basic-usage';
import EdgeCasesExample from './examples/stacked-area-chart/edge-cases';
import LegendAndPatternFillExample from './examples/stacked-area-chart/legend-and-pattern-fill';
import StackedAreaExample from './examples/stacked-area-chart/stacked-area';
const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Stacked-Area-Chart',
};
export default meta;
export const StackedArea: StoryObj = {
  render: StackedAreaExample,
};
export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};
export const EdgeCases: StoryObj = {
  render: EdgeCasesExample,
};
export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};
