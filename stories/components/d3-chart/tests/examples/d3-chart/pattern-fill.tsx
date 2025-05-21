import React from 'react';
import { Chart } from '@semcore/d3-chart';
import { curveCardinal } from 'd3-shape';

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey="time"
      stacked
      curve={curveCardinal}
      patterns
      showXAxis={false}
      aria-label="Area chart"
    />
  );
};

const data = [
  {
    time: new Date('2025-01-01'),
    stack1: 1,
    stack2: 2,
    stack3: 1.5,
  },
  {
    time: new Date('2025-01-06'),
    stack1: 2,
    stack2: 2.5,
    stack3: 2,
  },
  {
    time: new Date('2025-01-11'),
    stack1: 3,
    stack2: 2,
    stack3: 2.5,
  },
  {
    time: new Date('2025-01-16'),
    stack1: 2.5,
    stack2: 3,
    stack3: 1,
  },
  {
    time: new Date('2025-01-21'),
    stack1: 1.5,
    stack2: 2,
    stack3: 3,
  },
];

export default Demo;
