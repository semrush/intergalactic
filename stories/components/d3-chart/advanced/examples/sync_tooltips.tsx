import { Box } from '@semcore/ui/base-components';
import { Chart, PlotEventEmitter } from '@semcore/ui/d3-chart';
import { scaleBand } from 'd3-scale';
import React from 'react';

const ee = new PlotEventEmitter();

const Demo = () => {
  const plotWidth = 500;
  const marginY = 40;
  const range = [marginY, plotWidth - 6]; // 6 - default plotPadding

  return (
    <Box>
      here will be charts

      <Chart.Line
        data={data1}
        plotWidth={plotWidth}
        plotHeight={220}
        groupKey='x'
        aria-label='Line chart'
        eventEmitter={ee}
        // @ts-ignore
        xScale={scaleBand(data1.map((item) => item.x), range)}
      />

      <Chart.Bar
        groupKey='x'
        data={data2}
        plotWidth={plotWidth}
        plotHeight={300}
        aria-label='Bar chart'
        eventEmitter={ee}
        xScale={scaleBand(data2.map((item) => item.x), range)}
      />

      <Chart.Area
        groupKey='x'
        data={data3}
        plotWidth={plotWidth}
        plotHeight={180}
        aria-label='Area chart'
        eventEmitter={ee}
        // @ts-ignore
        xScale={scaleBand(data3.map((item) => item.x), range)}
      />
    </Box>
  );
};

export default Demo;

const data1 = Array(10)
  .fill({})
  .map((d, i) => ({
    x: i,
    line1: Math.random() * 10,
    line2: Math.random() * 10,
  }));
const data2 = Array(10)
  .fill({})
  .map((d, i) => ({
    x: i,
    bar1: Math.random() * 10,
    bar2: Math.random() * 10,
  })); ;
const data3 = Array(10)
  .fill({})
  .map((d, i) => ({
    x: i,
    line1: Math.random() * 10,
    line2: Math.random() * 10,
  }));
