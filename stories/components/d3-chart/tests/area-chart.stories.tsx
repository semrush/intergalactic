import type { Meta, StoryObj } from '@storybook/react-vite';

import AreaExample from './examples/area-chart/area';
import BasicUsageExample from './examples/area-chart/basic-usage';
import CustomLineExample from './examples/area-chart/custom-line';
import DifferentPropsExample from './examples/area-chart/different-props';
import InterpolationExample from './examples/area-chart/interpolation';
import LegendPatternExample from './examples/area-chart/legend-and-pattern-fill';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Area-Chart',
};

export default meta;

export const DifferentProps: StoryObj = {
  render: DifferentPropsExample,
};

export const CustomLine: StoryObj = {
  render: CustomLineExample,
};

export const LegendPattern: StoryObj = {
  render: LegendPatternExample,
};

export const Interpolation: StoryObj = {
  render: InterpolationExample,
};

export const Area: StoryObj = {
  render: AreaExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};
