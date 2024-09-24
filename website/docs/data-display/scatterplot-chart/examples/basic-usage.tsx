import React from 'react';
import { Chart } from 'intergalactic/d3-chart';

const Demo = () => {
  return <Chart.ScatterPlot data={data} plotWidth={500} plotHeight={300} groupKey={'x'} aria-lable={'ScatterPlot chart'} />;
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));

export default Demo;
