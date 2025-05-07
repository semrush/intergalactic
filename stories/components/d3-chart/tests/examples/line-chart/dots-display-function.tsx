import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';

const displayDots = (index: number, active: boolean, single: boolean) => {
  if (single || active) return true;
  return index < 10;
};

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Line x='x' y='y' curve={curveCardinal}>
        <Line.Dots display={displayDots} />
      </Line>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));

export default Demo;
