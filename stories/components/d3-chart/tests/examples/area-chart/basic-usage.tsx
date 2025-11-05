import type { AreaChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps } from '../stories_props_helper';

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
  return (
    <Chart.Area
      {...props}
      aria-label='Area chart'
      tooltipValueFormatter={formatDate}
      onClickArea={onClickHandler}
    />
  );
};

const data = [
  { time: new Date('2024-01-01'), line: 2 },
  { time: new Date('2024-01-06'), line: 4 },
  { time: new Date('2024-01-11'), line: 3 },
  { time: new Date('2024-01-16'), line: 6 },
  { time: new Date('2024-01-21'), line: 5 },
  { time: new Date('2024-01-26'), line: 7 },
  { time: new Date('2024-01-31'), line: 6 },
  { time: new Date('2024-02-05'), line: 8 },
  { time: new Date('2024-02-10'), line: 9 },
  { time: new Date('2024-02-15'), line: 10 },
];

export const defaultProps = getChartProps<AreaChartProps>({
  showDots: true,
  stacked: false,
  groupKey: 'time',
  data,
});

Demo.defaultProps = defaultProps;

export default Demo;
