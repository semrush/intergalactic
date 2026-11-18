import { Box, Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type PatternDasharrayStoryProps = {
  /** Number of line series; each gets the next default pattern and its dasharray. */
  seriesCount?: number;
  patterns?: boolean;
};

const POINTS = 12;
const DASHARRAYS_COUNT = 8;

// Parallel lines with a fixed gap, so the dash of each series is easy to compare.
const getData = (seriesCount: number) =>
  Array.from({ length: POINTS }, (_, x) => {
    const point: Record<string, number> = { x };

    for (let index = 0; index < seriesCount; index++) {
      point[`line${index + 1}`] = (seriesCount - index) * 10 + (x % 2);
    }

    return point;
  });

const Demo = (props: PatternDasharrayStoryProps) => {
  const { seriesCount = 8, patterns = true } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [dashes, setDashes] = React.useState<(string | null)[]>([]);

  React.useEffect(() => {
    const lines = ref.current?.querySelectorAll('[data-ui-name="Line"]') ?? [];
    setDashes([...lines].map((line) => line.getAttribute('stroke-dasharray')));
  }, [seriesCount, patterns]);

  return (
    <Flex gap={8}>
      <Box ref={ref}>
        <Chart.Line
          data={getData(seriesCount)}
          groupKey='x'
          plotWidth={500}
          plotHeight={400}
          patterns={patterns}
          showDots={false}
          showLegend
          duration={0}
          aria-label='Line chart with pattern dasharrays'
        />
      </Box>
      <Flex direction='column' gap={1} data-testid='dasharray-list'>
        <Text size={300} bold>
          stroke-dasharray by series
        </Text>
        {dashes.map((dash, index) => {
          // There are 8 distinct dasharrays, so a repeat is expected only after a full cycle of 8 series.
          const sameAs = dashes.slice(0, index).lastIndexOf(dash);
          const isTooClose = dash !== null && sameAs !== -1 && index - sameAs < DASHARRAYS_COUNT;

          return (
            <Text key={index} size={200} color={isTooClose ? 'text-critical' : undefined}>
              Line
              {' '}
              {index + 1}
              :
              {' '}
              {dash ?? 'none'}
              {isTooClose && ` — same as Line ${sameAs + 1}, only ${index - sameAs} series apart`}
            </Text>
          );
        })}
      </Flex>
    </Flex>
  );
};

export const defaultProps: PatternDasharrayStoryProps = {
  seriesCount: 8,
  patterns: true,
};

export default Demo;
