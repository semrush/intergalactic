import type { Meta, StoryObj } from '@storybook/react';

import AreaExample from './examples/area-chart/area';
import BasicUsageExample from './examples/area-chart/basic-usage';
import CustomLineExample from './examples/area-chart/custom-line';
import EdgeCasesExample from './examples/area-chart/edge-cases';
import InterpolationExample from './examples/area-chart/interpolation';
import LegendAndPatternFillExample from './examples/area-chart/legend-and-pattern-fill';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Area-Chart',
};

export default meta;

export const Area: StoryObj = {
  render: AreaExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const CustomLine: StoryObj = {
  render: CustomLineExample,
};

export const EdgeCases: StoryObj = {
  render: EdgeCasesExample,
};

export const Interpolation: StoryObj = {
  render: InterpolationExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};