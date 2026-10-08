import DiffDown from '@semcore/icon/DiffDown/m';
import DiffUp from '@semcore/icon/DiffUp/m';
import { Flex } from '@semcore/ui/base-components';
import type { BaseLegendProps, LegendTableProps, LineChartProps } from '@semcore/ui/d3-chart';
import { Chart, Metric } from '@semcore/ui/d3-chart';
import React from 'react';

import LineMockData from '../../../__mocks__/line';
import { getChartProps, getPropsToChart } from '../stories_props_helper';

export type DiffIconMode = 'none' | 'up' | 'down' | 'mixed';

export type DiffUseMode = 'good' | 'bad' | 'neutral' | 'mixed';

export type MetricLinkMode = 'none' | 'single' | 'all';

export type LegendPosition = 'bottom' | 'right';

type LegendTableWithHighlight = LegendTableProps;

type LegendWithMetricsStoryProps = Omit<
  LineChartProps,
  'data' | 'groupKey' | 'patterns' | 'legendProps'
> & {
  'legendProps'?: Partial<BaseLegendProps>;
  'aria-label'?: string;
  'patterns'?: boolean;
  'metricsPerItem'?: 1 | 2;
  'diffIcon'?: DiffIconMode;
  'diffUse'?: DiffUseMode;
  'diffValue'?: string;
  'metricLink'?: MetricLinkMode;
  'href'?: string;
  'legendPosition'?: LegendPosition;
  'w'?: number;
};

const data = LineMockData.ThreeLines;
const series = Object.keys(data[0]).filter((key) => key !== 'x');

const diffIcons: Record<'up' | 'down', typeof DiffUp> = {
  up: DiffUp,
  down: DiffDown,
};

const Demo = (props: LegendWithMetricsStoryProps) => {
  const {
    metricsPerItem = 1,
    diffIcon = 'mixed',
    diffUse = 'mixed',
    diffValue = '12',
    metricLink = 'single',
    href = '/some-report',
    legendPosition = 'bottom',
    legendProps = {},
    patterns = false,
    w,
    plotWidth,
    plotHeight,
    showLegend: _showLegend,
    'aria-label': legendAriaLabel,
    ...chartProps
  } = getPropsToChart<LegendWithMetricsStoryProps>(props);

  const {
    size = 'm',
    shape = 'Checkbox',
    disableHoverItems = false,
    disableSelectItems = false,
  } = legendProps;

  const resolveDiffUse = (index: number) =>
    diffUse === 'mixed' ? (['good', 'bad', 'neutral'] as const)[index % 3] : diffUse;

  const resolveDiffIcon = (index: number): typeof DiffUp | undefined => {
    if (diffIcon === 'none') return undefined;
    if (diffIcon !== 'mixed') return diffIcons[diffIcon];

    return index % 3 === 0 ? DiffUp : index % 3 === 1 ? DiffDown : undefined;
  };

  const resolveHref = (index: number) => {
    if (metricLink === 'none') return undefined;
    if (metricLink === 'all') return href;

    return index === 0 ? href : undefined;
  };

  const buildMetrics = (index: number) =>
    Array.from({ length: metricsPerItem }, (_, metricIndex) => {
      const icon = resolveDiffIcon(index);
      // Only the first metric of a row is ever a link, so a linked and a plain metric sit
      // side by side at `metricsPerItem: 2` and the hover states can be told apart.
      const metricHref = metricIndex === 0 ? resolveHref(index) : undefined;

      return (
        <Metric
          key={metricIndex}
          value={`${((42 * (index + 3)) / 10 + metricIndex).toFixed(1)}%`}
          diffValue={diffValue}
          diffUse={resolveDiffUse(index)}
          {...(icon ? { diffIcon: icon } : {})}
          {...(metricHref ? { href: metricHref } : {})}
        />
      );
    });

  const items = series.map((id, index) => ({
    id,
    label: `Line ${index + 1}`,
    color: `chart-palette-order-${index + 1}`,
    rows: buildMetrics(index),
  }));

  const tableProps: Partial<BaseLegendProps> = {
    'legendType': 'Table',
    'legendMap': items.reduce((acc, item) => {
      // @ts-expect-error this is just an exapmle
      acc[item.id] = item;
      return acc;
    }, {}),
    size,
    shape,
    disableHoverItems,
    disableSelectItems,
    ...(patterns ? { patterns: true as const } : {}),
    'aria-label': legendAriaLabel ?? 'Chart legend with metrics',
  };

  return (
    <Flex
      direction={legendPosition === 'right' ? 'row' : 'column'}
      gap={4}
      alignItems='flex-start'
      data-testid='legend-with-metrics'
    >
      <Chart.Line
        {...(chartProps as Omit<LineChartProps, 'legendProps'>)}
        data={data}
        groupKey='x'
        plotWidth={plotWidth}
        plotHeight={plotHeight}
        showLegend={true}
        legendProps={tableProps}
        {...(patterns ? { patterns: true as const } : {})}
        aria-label='Line chart with a metrics legend'
      />
    </Flex>
  );
};

export const defaultProps = getChartProps<LegendWithMetricsStoryProps>({
  'metricsPerItem': 1,
  'diffIcon': 'mixed',
  'diffUse': 'mixed',
  'diffValue': '12',
  'metricLink': 'single',
  'href': '/some-report',
  'patterns': false,
  'legendPosition': 'bottom',
  'aria-label': 'Chart legend with metrics',
});

Demo.defaultProps = defaultProps;

export default Demo;
