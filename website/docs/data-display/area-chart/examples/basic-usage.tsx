import React from 'react';
import { Chart } from '@semcore/d3-chart';

function formatDate(value) {
  const options = {
    month: 'short' as const,
    day: 'numeric' as const,
  };

  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  return (
    <Chart.Area
      groupKey={'time'}
      data={data}
      plotWidth={500}
      plotHeight={200}
      tooltipValueFormatter={formatDate}
      aria-label={'Area chart'}
    />
  );
};

const date = new Date();
const data = Array(10)
  .fill({})
  .map((d, i) => {
    return {
      time: new Date(date.setDate(date.getDate() + 5)),
      line: Math.random() * 10,
    };
  });

export default Demo;
