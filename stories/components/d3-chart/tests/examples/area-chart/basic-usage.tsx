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

const Demo = (props: AreaChartProps) => {
  const onClickHandler = (index: number, event: React.SyntheticEvent) => {
    const clickedItem = data[index];
    console.log('Clicked area chart point:');
    console.log('→ Index:', index);
    console.log('→ Data item:', clickedItem);
    console.log('→ Event:', event);
  };
  const { plotWidth, plotHeight, ...chartProps } = getPropsToChart(props);
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
        {...chartProps}
        aria-label='Area chart'
        tooltipValueFormatter={formatDate}
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

export const defaultProps = getChartProps<AreaChartProps>({
  showDots: true,
  stacked: false,
  groupKey: 'time',
  data,
});

Demo.defaultProps = defaultProps;

export default Demo;
