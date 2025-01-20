import React from 'react';
import { Chart } from '@semcore/d3-chart';
import { curveCardinal } from 'd3-shape';

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'time'}
      stacked={true}
      curve={curveCardinal}
      patterns
      showXAxis={false}
      aria-label={'Area chart'}
    />
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));

export default Demo;
