import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

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
      <Line x='x' y='y1' duration = {0} color ='yellow'>
        <Line.Dots display />
      </Line>

      <Line x='x' y='y2' duration = {0} transparent={true}>
        <Line.Dots display />
      </Line>

      <Line x='x' y='y3' duration = {0} color ='red' hide>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = Array(20)
      .fill({})
      .map((d, i) => {
        const y1 = Math.abs(Math.sin(Math.exp(i))) * 10;
        const y2 = Math.abs(Math.cos(Math.exp(i))) * 10;
        const y3 = Math.abs(Math.cos(Math.exp(i))) * 5;
        return {
          x: i,
          y1: i === 2 || i === 3 ? null : y1,
          y2: y2,
          y3: y3,
        };
      });

export default Demo;
