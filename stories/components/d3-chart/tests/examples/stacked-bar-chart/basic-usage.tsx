import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  const data = [
    { bar: 'Bar 1', Category1: 5, Category2: 8 },
    { bar: 'Bar 2', Category1: 7, Category2: 3 },
    { bar: 'Bar 3', Category1: 4, Category2: 6 },
    { bar: 'Bar 4', Category1: 9, Category2: 2 },
    { bar: 'Bar 5', Category1: 6, Category2: 7 },
  ];

  return (
    <Chart.Bar
      groupKey={'bar'}
      data={data}
      plotWidth={500}
      plotHeight={200}
      type={'stack'}
      aria-label={'Stacked bar chart'}
    />
  );
};

export default Demo;
