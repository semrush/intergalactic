import { Chart } from '@semcore/d3-chart';
import React from 'react';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey='category'
      data={data}
      plotWidth={500}
      plotHeight={300}
      aria-label='Bar chart'
    />
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random() * 10,
  }));

export default Demo;
