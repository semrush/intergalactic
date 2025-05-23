import React from 'react';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
import { Area, minMax, Plot, XAxis, YAxis } from '@semcore/d3-chart';

const customLineStyles = { strokeWidth: 4, stroke: 'pink' };

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
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Area x='x' y='y' curve={curveCardinal}>
        <Area.Line style={customLineStyles} />
      </Area>
    </Plot>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => {
    return {
      x: i,
      y: Math.random() * 10,
    };
  });

export default Demo;
