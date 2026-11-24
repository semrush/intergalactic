import type { Meta, StoryObj } from '@storybook/react-vite';

import StackedAreaLegendPatternsExample from './examples/stacked_area_legend_patterns';
import SyncTooltipsExample from './examples/sync_tooltips';

const meta: Meta = {
  title: 'Components/d3Charts/Advanced',
};

export default meta;

export const SyncTooltips: StoryObj = {
  render: SyncTooltipsExample,
};

export const StackedAreaLegendPatterns: StoryObj = {
  render: StackedAreaLegendPatternsExample,
};
