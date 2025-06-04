import type { Meta, StoryObj } from '@storybook/react';

import DonutExample from './examples/donut-chart/donut';
import BasicUsageExample from './examples/donut-chart/basic-usage';
import DonutControlledHighlightExample from './examples/donut-chart/donut-controlled-highlight';
import EdgeCasesExample from './examples/donut-chart/edge-cases';
import SemiDonutExample from './examples/donut-chart/semi-donut';
import LegendAndPatternFillExample from './examples/donut-chart/legend-and-pattern-fill';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Donut-Chart',
};

export default meta;

export const Donut: StoryObj = {
  render: DonutExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const DonutControlledHighlight: StoryObj = {
  render: DonutControlledHighlightExample,
};

export const EdgeCases: StoryObj = {
  render: EdgeCasesExample,
};

export const SemiDonut: StoryObj = {
  render: SemiDonutExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};