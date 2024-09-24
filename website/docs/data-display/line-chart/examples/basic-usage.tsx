import React from 'react';
import { Chart } from 'intergalactic/d3-chart';

const Demo = () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'x'}
      xTicksCount={data.length / 2}
      aria-lable={'Line chart'}
    />
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
    y2: Math.random() * 10,
  }));

export default Demo;
