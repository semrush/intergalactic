import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey='category'
      data={data}
      plotWidth={500}
      plotHeight={300}
      invertAxis={true}
      aria-label='CompactHorizontalBar chart'
    />
  );
};

const data = [
  { category: 'Category 0', bar: 2.5 },
  { category: 'Category 1', bar: 4.7 },
  { category: 'Category 2', bar: 1.2 },
  { category: 'Category 3', bar: 6.9 },
  { category: 'Category 4', bar: 3.3 },
];

export default Demo;
