import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizableLegendExample, { defaultProps as args } from './examples/chart-legend/customizable_legend';
import LegendTableDataExample, { defaultProps as legendTableArgs } from './examples/chart-legend/legend-table-data';

const meta: Meta = {
  title: 'Components/d3Charts/tests/ChartLegend',
};

export default meta;

export const LegendTableData: StoryObj<typeof legendTableArgs> = {
  render: LegendTableDataExample,
  argTypes: {
    size: { control: 'select', options: ['m', 'l'] },
    w: { control: { type: 'number', min: 120, max: 400, step: 1 } },
    highlightedItem: { control: { type: 'number', min: -1, max: 5, step: 1 } },
    columnsCount: { control: 'select', options: [1, 2] },
  },
  args: legendTableArgs,
};

export const CustomizableLegend = {
  render: CustomizableLegendExample,
  argTypes: {
    'size': { control: 'select', options: ['m', 'l'] },
    'shape': { control: 'select', options: ['Checkbox', 'Circle', 'Pattern'] },
    'direction': { control: 'select', options: ['row', 'column'] },
    'patterns': { control: 'boolean' },
    'items': { control: 'object' },
    'highlightedItem': { control: { type: 'number', min: -1, max: 4, step: 1 } },
    'withTrend': { control: 'boolean' },
    'trendLabel': { control: 'text' },
    'trendIsVisible': { control: 'boolean' },
    'withSuffix': { control: 'boolean' },
    'aria-label': { control: 'text' },
    'onChangeVisibleItem': { action: 'onChangeVisibleItem' },
    'onMouseEnterItem': { action: 'onMouseEnterItem' },
    'onMouseLeaveItem': { action: 'onMouseLeaveItem' },
  },
  args,
};
