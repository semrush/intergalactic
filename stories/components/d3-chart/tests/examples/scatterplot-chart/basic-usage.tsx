import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <Chart.ScatterPlot
      data={data}
      plotWidth={500}
      plotHeight={300}
      groupKey={'x'}
      aria-label={'ScatterPlot chart'}
    />
  );
};

const data = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: (i % 5) + 1, 
}));

export default Demo;
