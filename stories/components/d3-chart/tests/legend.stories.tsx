import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizableLegendExample, { defaultProps as args } from './examples/chart-legend/customizable_legend';
import LegendTableDataExample, { defaultProps as legendTableArgs } from './examples/chart-legend/legend-table-data';
import LegendWithMetricsExample, { defaultProps as legendWithMetricsArgs } from './examples/chart-legend/legend-with-metrics';
import { getChartArgTypes } from './examples/stories_props_helper';

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
    itemsCount: { control: { type: 'number', min: 0, max: 6, step: 1 } },
  },
  args: legendTableArgs,
};

export const LegendWithMetrics = {
  render: LegendWithMetricsExample,
  argTypes: getChartArgTypes({
    'metricsPerItem': { control: 'select', options: [1, 2] },
    'diffIcon': { control: 'select', options: ['none', 'up', 'down', 'mixed'] },
    'diffUse': { control: 'select', options: ['good', 'bad', 'neutral', 'mixed'] },
    'diffValue': { control: 'text' },
    'metricLink': { control: 'select', options: ['none', 'single', 'all'] },
    'href': { control: 'text' },
    'highlightedItem': { control: { type: 'number', min: -1, max: 2, step: 1 } },
    'legendPosition': { control: 'select', options: ['bottom', 'right'] },
    'w': { control: { type: 'number' } },
    'aria-label': { control: 'text' },
    // The chart's own legend can only build `columns`, so this story always renders its own
    // rows legend and forces `showLegend={false}` — the control would do nothing.
    'showLegend': { table: { disable: true } },
    'legendProps.legendType': { table: { disable: true } },
  }),
  args: legendWithMetricsArgs,
};

export const CustomizableLegend = {
  render: CustomizableLegendExample,
  argTypes: {
    'size': { control: 'select', options: ['m', 'l'] },
    'shape': { control: 'select', options: ['Checkbox', 'Circle', 'Pattern'] },
    'direction': { control: 'select', options: ['row', 'column'] },
    'patterns': { control: 'boolean' },
    'items': { control: 'object' },
    'itemsCount': { control: { type: 'number', min: 0, max: 5, step: 1 } },
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
