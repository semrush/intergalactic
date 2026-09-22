import { Box } from '@semcore/ui/base-components';
import type { BubbleChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

type BubbleChartStoryProps = BubbleChartProps & {
  /**
   * Swaps in a dataset whose `x`, `y` and `value` all carry decimals.
   *
   * `BubbleChart.renderTooltip` prints `data[index].x`, `.y` and `.value` directly instead
   * of running them through `AbstractChart.tooltipValueFormatter`, so the raw numbers reach
   * the DOM: all three lines should be rounded to one decimal place and have their
   * thousands grouped, and none of them is. The default dataset holds whole numbers only,
   * which hides the defect entirely.
   */
  fractionalValues?: boolean;
};

const Demo = (props: BubbleChartStoryProps) => {
  const { plotWidth, plotHeight, fractionalValues, ...chartProps } = getPropsToChart(props);

  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      <Chart.Bubble
        {...(chartProps as BubbleChartProps)}
        aria-label='Bubble chart'
        {...(fractionalValues ? { data: fractionalData } : {})}
      />
    </Box>
  );
};

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1' },
  { x: 1, y: 9, value: 40, label: 'label 2' },
  { x: 6, y: 2, value: 45634, label: 'label 3' },
  { x: 4, y: 7, value: 245, label: 'label 4' },
  { x: 9, y: 5, value: 7462, label: 'label 5' },
];

/**
 * Same layout as `data` — the coordinates only gain a fractional tail, so the bubbles stay
 * where they were. Hover each one and compare the three tooltip lines with the expectation:
 *
 * label         | X axis             | Y axis               | Value
 * --------------|--------------------|----------------------|--------------------------
 * fractions     | 1.7391  -> 1.7     | 7.8999   -> 7.9      | 1234.5678 -> 1,234.6
 * rounds up     | 0.96    -> 1.0     | 99.95    -> 100.0    | 45634.55  -> 45,634.6
 * long tail     | 3.14159 -> 3.1     | 2.71828  -> 2.7      | 7462.999  -> 7,463.0
 * whole numbers | 6       -> 6       | 4        -> 4        | 5040      -> 5,040
 *
 * The last row is the control: whole numbers look right today except for the missing
 * thousands separator on `value`.
 */
const fractionalData = [
  { x: 1.7391, y: 7.8999, value: 1234.5678, label: 'fractions' },
  { x: 0.96, y: 99.95, value: 45634.55, label: 'rounds up' },
  { x: 3.14159, y: 2.71828, value: 7462.999, label: 'long tail' },
  { x: 6, y: 4, value: 5040, label: 'whole numbers' },
];

export const defaultProps = getChartProps<BubbleChartStoryProps>({
  data,
  // Off by default: the existing visual tests screenshot this story, and swapping the
  // dataset would move every bubble.
  fractionalValues: false,
});

Demo.defaultProps = defaultProps;

export default Demo;
