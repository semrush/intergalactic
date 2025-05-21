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

const baseDate = new Date('2024-01-01');
const data = Array.from({ length: 10 }, (_, i) => ({
  time: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000), 
  line: Math.random() * 10,
}));

export default Demo;
