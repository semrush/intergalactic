import { Chart } from '@semcore/d3-chart';
import React from 'react';

const Demo = () => {
  const onClickHandler = () => {
    console.log('Clicked scatterplot item');
  };
  return (
    <Chart.ScatterPlot
      data={data}
      plotWidth={500}
      plotHeight={300}
      groupKey='x'
      aria-label='ScatterPlot chart'
      onClickScatterItem={onClickHandler}
    />
  );
};

const data = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: (i % 5) + 1,
}));

export default Demo;
