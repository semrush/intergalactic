import DiffUp from '@semcore/icon/DiffUp/m';
import { Box, Flex } from '@semcore/ui/base-components';
import type { ScoreDonutChartProps } from '@semcore/ui/d3-chart';
import { Chart, Metric } from '@semcore/ui/d3-chart';
import Divider from '@semcore/ui/divider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

/**
 * `tooltipValueFormatter` receives `data.value` for both slices, so it formats the score
 * as a percent.
 */
function formatValue(value: unknown) {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return `${value}% score`;
  }

  return String(value);
}

type ScoreDonutChartStoryProps = Omit<ScoreDonutChartProps, 'patterns'> & {
  patterns?: ScoreDonutChartProps['patterns'] | false;
  /**
   * `innerLabel` is a ReactNode and cannot travel through `loadPage` as JSON, so the story
   * builds it. Turning it on is the only way to reach the `Donut.Label` branch.
   */
  withInnerLabel?: boolean;
  /** Set to true to replace the built-in tooltip value formatter with `formatValue`. */
  useCustomValueFormatter?: boolean;
  /**
   * Sets `legendProps.legendMap.value.label`. Empty string keeps the default `value` label.
   * It is the only way to reach the `legendData.label` branch of `getDefaultDataDefinitions`.
   */
  legendLabel?: string;
  /**
   * Hides the legend and renders a `Metric` (value + diff), a description and a divider to the
   * right of the donut, as in the "Donut chart + ChartLegend" Figma layout. The chart has no
   * slot for it, so the story composes it next to the chart.
   */
  withSideMetric?: boolean;
};

/** Storybook args: the story props plus the flattened legend type the helper un-flattens. */
type ScoreDonutChartStoryArgs = ScoreDonutChartStoryProps & {
  'legendProps.legendType'?: 'Flex' | 'Table';
};

type DemoComponent = ((props: ScoreDonutChartStoryArgs) => React.ReactElement) & {
  defaultProps: ScoreDonutChartStoryArgs;
};

const Demo: DemoComponent = (props: ScoreDonutChartStoryArgs) => {
  const {
    plotWidth,
    plotHeight,
    withInnerLabel,
    useCustomValueFormatter,
    legendLabel,
    withSideMetric,
    ...chartProps
  } = getPropsToChart<ScoreDonutChartStoryProps>(props);

  const typedChartProps = chartProps as ScoreDonutChartProps;
  const { legendProps: _legendProps, ...chartPropsWithoutLegend } = typedChartProps;
  // A custom legend label is meaningful only with a visible legend, so the override also
  // pins `showLegend: true` — the branch of the props union that accepts `legendProps`.
  const resolvedChartProps: ScoreDonutChartProps = withSideMetric
    ? { ...chartPropsWithoutLegend, showLegend: false }
    : legendLabel && typedChartProps.showLegend !== false
      ? {
          ...typedChartProps,
          showLegend: true,
          legendProps: { ...typedChartProps.legendProps, legendMap: { value: { label: legendLabel } } },
        }
      : typedChartProps;

  const onClickPieHandler = (key: string, event: React.SyntheticEvent) => {
    console.log('Clicked score donut pie:');
    console.log('→ Key:', key);
    console.log('→ Event:', event);
  };

  const chart = (
    <Chart.ScoreDonut
      data-testid='TEST'
      {...resolvedChartProps}
      aria-label='Score donut chart'
      {...(withInnerLabel
        ? {
            innerLabel: (
              <Text tag='tspan' fill='text-primary' size={400}>
                {`${chartProps.data.value}%`}
              </Text>
            ),
          }
        : {})}
      {...(useCustomValueFormatter ? { tooltipValueFormatter: formatValue } : {})}
      // The Figma layout uses a 180×180 donut; in a row the chart cannot measure its own size.
      {...(withSideMetric ? { plotWidth: 180, plotHeight: 180, w: 180, flex: 'none' } : {})}
      onClickPie={onClickPieHandler}
    />
  );

  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      {withSideMetric
        ? (
            <Flex gap={6} alignItems='flex-start'>
              {chart}
              <Box w={132} flex='none'>
                <Metric value='71,286' diffValue='4.5%' diffUse='good' diffIcon={DiffUp} />
                <Text tag='div' size={200} use='secondary'>
                  value name
                </Text>
                <Divider mt={2} />
              </Box>
            </Flex>
          )
        : chart}
    </Box>
  );
};

export const defaultProps: ScoreDonutChartStoryArgs = {
  ...getChartProps<ScoreDonutChartStoryProps>({
    data: { value: 40 },
    // Mirrors the component defaults. `innerRadius` is left out: Donut derives it from the
    // ring thickness when it is absent, and any fixed number here would change the look.
    marginX: 0,
    marginY: 0,
    halfsize: false,
    patterns: false,
    withInnerLabel: false,
    useCustomValueFormatter: false,
    legendLabel: '',
    withSideMetric: false,
  }),
  // The component defaults to a Table legend; the helper's baseline is Flex.
  'legendProps.legendType': 'Table',
};

Demo.defaultProps = defaultProps;

export default Demo;
