import { Box } from '@semcore/ui/base-components';
import type { VennChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

type VennChartStoryProps = VennChartProps & {
  /**
   * Swaps in a dataset whose areas carry decimals.
   *
   * `VennChart.renderTooltip` renders `data[dataKey]` directly instead of running it
   * through `AbstractChart.tooltipValueFormatter`, so the raw number reaches the DOM: the
   * value should be rounded to one decimal place and have its thousands grouped, and it is
   * not. The default dataset holds whole numbers only, which hides the defect entirely.
   */
  fractionalValues?: boolean;
};

const Demo = (props: VennChartStoryProps) => {
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
      <Chart.Venn
        {...(chartProps as VennChartProps)}
        aria-label='Venn chart'
        {...(fractionalValues ? { data: fractionalData } : {})}
      />
    </Box>
  );
};

const data = {
  'G': 200,
  'F': 200,
  'C': 500,
  'U': 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

/**
 * Same set layout as `data`, with decimals added. Hover each area and compare the value in
 * the tooltip with the expectation:
 *
 * area    | raw value | expected  | actually shown
 * --------|-----------|-----------|----------------
 * G       | 1234.5678 |   1,234.6 | 1234.5678
 * F       |    7.8999 |       7.9 | 7.8999
 * C       | 2000.0004 |   2,000.0 | 2000.0004
 * U       |    0.4999 |       0.5 | 0.4999
 * G/F     |    1.7391 |       1.7 | 1.7391
 * G/C     |  100000   | 100,000   | 100000       <- integer: only the grouping is missing
 * F/C     |   99.95   |     100.0 | 99.95
 * G/F/C   |   50      |      50   | 50           <- integer: looks correct either way
 *
 * The integer rows are why the defect is easy to miss: a Venn chart built on whole numbers
 * renders almost identically with and without the formatter.
 */
const fractionalData = {
  'G': 1234.5678,
  'F': 7.8999,
  'C': 2000.0004,
  'U': 0.4999,
  'G/F': 1.7391,
  'G/C': 100000,
  'F/C': 99.95,
  'G/F/C': 50,
};

const legendProps = {

  legendMap: {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
    U: { label: 'Uniq' },
  },
};

export const defaultProps = getChartProps<VennChartProps>({
  data,
  showLegend: true,
  legendProps,
});

export default Demo;
