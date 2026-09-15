import { Box } from '@semcore/ui/base-components';
import type { AreaChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

function formatDate(value: any) {
  const options = {
    month: 'short' as const,
    day: 'numeric' as const,
  };

  return new Intl.DateTimeFormat('en', options).format(value);
}

type AreaChartStoryProps = AreaChartProps & {
  /** Set to false to fall back to the built-in tooltip value formatter. */
  useCustomValueFormatter?: boolean;
  /**
   * Swaps in a dataset where `line` drops to 0 in the middle.
   *
   * `getPercentDelta` cannot divide by a previous value of 0, so that series has no
   * delta on the next point while `line2` still has one. Together with
   * `showDeltaPercentInTooltip` this is the mixed row that no other dataset produces.
   */
  withZeroValue?: boolean;
};

const Demo = (props: AreaChartStoryProps) => {
  const onClickHandler = (index: number, event: React.SyntheticEvent) => {
    const clickedItem = data[index];
    console.log('Clicked area chart point:');
    console.log('→ Index:', index);
    console.log('→ Data item:', clickedItem);
    console.log('→ Event:', event);
  };
  const { plotWidth, plotHeight, useCustomValueFormatter, withZeroValue, ...chartProps } = getPropsToChart(props);
  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      <Chart.Area
        {...(chartProps as AreaChartProps)}
        aria-label='Area chart'
        {...(withZeroValue ? { data: dataWithZeroValue } : {})}
        {...(useCustomValueFormatter ? { tooltipValueFormatter: formatDate } : {})}
        onClickArea={onClickHandler}
      />
    </Box>
  );
};

const data = [
  { time: new Date('2024-01-01'), line: 2, line2: 3 },
  { time: new Date('2024-01-06'), line: 4, line2: 3 },
  { time: new Date('2024-01-11'), line: 3, line2: 3 },
  { time: new Date('2024-01-16'), line: 6, line2: 4 },
  { time: new Date('2024-01-21'), line: 5, line2: 3 },
  { time: new Date('2024-01-26'), line: 7, line2: 5 },
  { time: new Date('2024-01-31'), line: 6, line2: 2 },
  { time: new Date('2024-02-05'), line: 8, line2: 5 },
  { time: new Date('2024-02-10'), line: 9, line2: 7 },
  { time: new Date('2024-02-15'), line: 10, line2: 8 },
];

/**
 * Same shape as `data`, but `line` sits at 0 on Jan 11.
 *
 * Hovering Jan 16 then gives `line` no delta (its previous value is 0) while `line2`
 * still has one, so the tooltip switches to three columns and the `line` row only fills
 * two of them.
 */
const dataWithZeroValue = [
  { time: new Date('2024-01-01'), line: 2, line2: 3 },
  { time: new Date('2024-01-06'), line: 4, line2: 3 },
  { time: new Date('2024-01-11'), line: 0, line2: 3 },
  { time: new Date('2024-01-16'), line: 6, line2: 4 },
  { time: new Date('2024-01-21'), line: 5, line2: 3 },
  { time: new Date('2024-01-26'), line: 7, line2: 5 },
  { time: new Date('2024-01-31'), line: 6, line2: 2 },
  { time: new Date('2024-02-05'), line: 8, line2: 5 },
  { time: new Date('2024-02-10'), line: 9, line2: 7 },
  { time: new Date('2024-02-15'), line: 10, line2: 8 },
];

export const defaultProps = getChartProps<AreaChartStoryProps>({
  showDots: true,
  stacked: false,
  groupKey: 'time',
  data,
  // Keep the custom formatter on by default so existing snapshots stay stable.
  // Browser tests flip it off to exercise the built-in formatter.
  useCustomValueFormatter: true,
  withZeroValue: false,
});

Demo.defaultProps = defaultProps;

export default Demo;
