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
 * `data` scaled by 10, with decimal tails added, so the diagram keeps the shape it has by
 * default and only the numbers change. An intersection must never exceed the sets it
 * belongs to, otherwise the layout degenerates into overlapping blobs — which is why the
 * values cannot simply be replaced with arbitrary decimals.
 *
 * Hover each area and compare the value in the tooltip with the expectation:
 *
 * area    | raw value | expected | actually shown
 * --------|-----------|----------|----------------
 * G       | 2004.5678 |  2,004.6 | 2004.5678
 * F       | 2000.049  |  2,000.0 | 2000.049
 * C       | 4999.95   |  5,000.0 | 4999.95     <- rounds across the thousand boundary
 * U       |    1.7391 |      1.7 | 1.7391
 * G/F     | 1000.4999 |  1,000.5 | 1000.4999
 * G/C     |  999.96   |  1,000.0 | 999.96
 * F/C     | 1000.04   |  1,000.0 | 1000.04
 * G/F/C   | 1000      |  1,000   | 1000        <- integer: only the grouping is missing
 *
 * The integer row is why the defect is easy to miss: a Venn chart built on whole numbers
 * renders almost identically with and without the formatter.
 */
const fractionalData = {
  'G': 2004.5678,
  'F': 2000.049,
  'C': 4999.95,
  'U': 1.7391,
  'G/F': 1000.4999,
  'G/C': 999.96,
  'F/C': 1000.04,
  'G/F/C': 1000,
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
