import { Box, Flex } from '@semcore/ui/base-components';
import type { Pattern } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type PatternDasharrayStoryProps = {
  /** Number of line series; each gets the next default pattern and its dasharray. */
  seriesCount?: number;
  patterns?: boolean;
  /** With `patterns`, passes CUSTOM_PATTERNS instead of the default ones. */
  customPatterns?: boolean;
};

const square = <path d='M0 0h20v20H0z' />;

// Each custom pattern only differs by its dasharray.
const CUSTOM_DASHARRAYS = ['3 3', '10 2', '1 5'];

const CUSTOM_PATTERNS: Pattern[] = CUSTOM_DASHARRAYS.map((dasharray) => ({
  fill: { viewBox: '0 0 20 20', children: square },
  symbol: { viewBox: '0 0 20 20', size: [16, 16], children: square },
  dasharray,
}));

const POINTS = 12;
const DASHARRAYS_COUNT = 12;

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
  const { seriesCount = 8, patterns = true, customPatterns = false } = props;
  const patternsConfig = patterns ? (customPatterns ? CUSTOM_PATTERNS : true) : undefined;
  // A dash may repeat only after every distinct dasharray of the set was used once.
  const cycle = customPatterns ? CUSTOM_DASHARRAYS.length : DASHARRAYS_COUNT;
  const ref = React.useRef<HTMLDivElement>(null);
  const [dashes, setDashes] = React.useState<(string | null)[]>([]);

  // Read the dashes from the rendered lines, so the list shows what the chart really draws
  React.useEffect(() => {
    const lines = ref.current?.querySelectorAll('[data-ui-name="Line"]') ?? [];
    setDashes(Array.from(lines, (line) => line.getAttribute('stroke-dasharray')));
  }, [seriesCount, patternsConfig]);

  return (
    <Flex gap={8}>
      <Box ref={ref}>
        <Chart.Line
          data={getData(seriesCount)}
          groupKey='x'
          plotWidth={500}
          plotHeight={400}
          patterns={patternsConfig}
          showDots={false}
          showLegend
          duration={0}
          aria-label='Line chart with pattern dasharrays'
        />
      </Box>
      <Flex direction='column' gap={1}>
        <Text size={300} bold>
          stroke-dasharray by series
        </Text>
        {dashes.map((dash, index) => {
          // The nearest line above with the same dash; a repeat is fine only a full cycle later.
          const sameAs = dashes.slice(0, index).lastIndexOf(dash);
          const isRepeat = dash !== null && sameAs !== -1;
          const isTooClose = isRepeat && index - sameAs < cycle;
          const warning = isTooClose ? ` — same as Line ${sameAs + 1}, only ${index - sameAs} series apart` : '';

          return (
            <Text key={index} size={200} color={isTooClose ? 'text-critical' : undefined}>
              {`Line ${index + 1}: ${dash ?? 'none'}${warning}`}
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
  customPatterns: false,
};

export default Demo;
