import { Box, Flex } from '@semcore/ui/base-components';
import Skeleton, {
  AreaChartSkeleton,
  BarChartSkeleton,
  BubbleChartSkeleton,
  CompactHorizontalBarChartSkeleton,
  DonutChartSkeleton,
  HistogramChartSkeleton,
  LineChartSkeleton,
  RadialTreeChartSkeleton,
  ScatterPlotChartSkeleton,
  VennChartSkeleton,
} from '@semcore/ui/skeleton';
import type { NSSkeleton } from '@semcore/ui/skeleton';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = NSSkeleton.Props & {
  /** Line / Area chart skeletons only */
  type?: 'linear' | 'monotone';
  /** Bar / Histogram chart skeletons only */
  layout?: 'horizontal' | 'vertical';
  /** Donut chart skeleton only */
  halfsize?: boolean;
  /** Number of lines in the plain Skeleton control group */
  amount?: string | number;
  /** Width of the last line in the plain Skeleton control group */
  textWidth?: string | number;
  /** Demo-only knob: puts everything on the inverted background */
  invertedBackground?: boolean;
  /** Demo-only knob: width of the parent box (to exercise observeParentSize) */
  parentWidth?: number;
};

/** Skeleton.Text places every next line at `20 * index`, this step is not configurable */
const LINE_STEP = 20;

const Demo = (props: ExampleProps) => {
  const {
    theme,
    duration,
    hidden,
    locale,
    observeParentSize,
    type,
    layout,
    halfsize,
    amount,
    textWidth,
    invertedBackground,
    parentWidth,
    w,
    h,
    m,
    p,
  } = props;

  const lines = Number(amount) || 1;

  const common = {
    theme,
    duration,
    hidden,
    locale,
    observeParentSize,
    ...(w !== undefined && { w }),
    ...(h !== undefined && { h }),
    ...(m !== undefined && { m }),
    ...(p !== undefined && { p }),
  };

  const charts: Array<[string, () => React.ReactNode]> = [
    ['LineChartSkeleton', () => <LineChartSkeleton {...common} type={type} />],
    ['AreaChartSkeleton', () => <AreaChartSkeleton {...common} type={type} />],
    ['BarChartSkeleton', () => <BarChartSkeleton {...common} layout={layout} />],
    ['HistogramChartSkeleton', () => <HistogramChartSkeleton {...common} layout={layout} />],
    ['CompactHorizontalBarChartSkeleton', () => <CompactHorizontalBarChartSkeleton {...common} />],
    ['DonutChartSkeleton', () => <DonutChartSkeleton {...common} halfsize={halfsize} />],
    ['ScatterPlotChartSkeleton', () => <ScatterPlotChartSkeleton {...common} />],
    ['BubbleChartSkeleton', () => <BubbleChartSkeleton {...common} />],
    ['VennChartSkeleton', () => <VennChartSkeleton {...common} />],
    ['RadialTreeChartSkeleton', () => <RadialTreeChartSkeleton {...common} />],
  ];

  const labelColor = invertedBackground ? 'text-primary-invert' : 'text-secondary';

  return (
    <Flex
      direction='column'
      gap={6}
      p={4}
      data-testid='chart-skeletons-demo'
      style={
        invertedBackground
          ? {
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            }
          : undefined
      }
    >
      <Flex direction='column' gap={1} data-testid='plain-skeleton'>
        <Text size={100} color={labelColor}>
          Skeleton (control group - reacts to theme)
        </Text>
        <Box w={parentWidth} data-testid='skeleton-parent'>
          {/* Skeleton.Text hardcodes a 20px step between lines, so the height of a line
              must stay below it and the next block has to start after 20 * amount. */}
          <Skeleton h={LINE_STEP * lines + LINE_STEP} {...common}>
            <Skeleton.Text amount={amount} />
            <Skeleton.Text y={LINE_STEP * lines} w={textWidth} />
          </Skeleton>
        </Box>
      </Flex>

      <Flex gap={6} flexWrap alignItems='flex-start' data-testid='chart-skeletons'>
        {charts.map(([name, renderChart]) => (
          <Flex key={name} direction='column' gap={1} data-testid={`chart-${name}`}>
            <Text size={100} color={labelColor}>
              {name}
            </Text>
            <Box w={parentWidth}>{renderChart()}</Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export const defaultChartSkeletonProps: ExampleProps = {
  theme: 'default',
  duration: 2000,
  hidden: false,
  locale: 'en',
  observeParentSize: false,
  type: 'linear',
  layout: 'horizontal',
  halfsize: false,
  amount: 1,
  textWidth: '60%',
  invertedBackground: false,
  parentWidth: 300,
};

Demo.defaultProps = defaultChartSkeletonProps;

export default Demo;
