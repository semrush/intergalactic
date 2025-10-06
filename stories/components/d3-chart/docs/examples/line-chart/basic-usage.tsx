import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

const Demo = () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey='x'
      xTicksCount={data.length / 2}
      aria-label='Line chart'
    />
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    line1: Math.random() * 10,
    line2: Math.random() * 10,
  }));

export default Demo;
