import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey={'category'}
      data={data}
      plotWidth={500}
      plotHeight={300}
      aria-label={'Bar chart'}
    />
  );
};

const data = [
  { category: 'Category 0', bar: 2 },
  { category: 'Category 1', bar: 5 },
  { category: 'Category 2', bar: 7 },
  { category: 'Category 3', bar: 4 },
  { category: 'Category 4', bar: 8 },
];

export default Demo;
