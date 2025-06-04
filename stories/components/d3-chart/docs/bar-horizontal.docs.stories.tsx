import type { Meta, StoryObj } from '@storybook/react';

import BackgroundExample from './examples/bar-horizontal/background';
import BarLabelsExample from './examples/bar-horizontal/bar-labels';
import BasicUsageExample from './examples/bar-horizontal/basic-usage';
import GroupedHorizontalExample from './examples/bar-horizontal/grouped-horizontal-bars';
import HorizontalBarExample from './examples/bar-horizontal/horizontal-bar';
import LegendAndPatternFillExample from './examples/bar-horizontal/legend-and-pattern-fill';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Horizontal-Chart',
};

export default meta;

export const Background: StoryObj = {
  render: BackgroundExample,
};

export const BarLabels: StoryObj = {
  render: BarLabelsExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const GroupedHorizontal: StoryObj = {
  render: GroupedHorizontalExample,
};

export const HorizontalBar: StoryObj = {
  render: HorizontalBarExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};