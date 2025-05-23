import React from 'react';
import { Chart } from '@semcore/d3-chart';

function formatDate(value: any) {
  const options = {
    month: 'short' as const,
    day: 'numeric' as const,
  };

  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  return (
    <Chart.Area
      groupKey="time"
      data={data}
      plotWidth={500}
      plotHeight={200}
      tooltipValueFormatter={formatDate}
      aria-label="Area chart"
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

export default Demo;
