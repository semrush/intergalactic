import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey={'category'}
      data={data}
      plotWidth={500}
      plotHeight={200}
      type={'stack'}
      aria-label={'Stacked bar chart'}
    />
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random() * 10,
    bar2: Math.random() * 10,
  }));

export default Demo;
