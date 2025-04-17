import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
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

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    bar: `Bar ${i + 1}`,
    Category1: Math.random() * 10,
    Category2: Math.random() * 10,
  }));

export default Demo;
