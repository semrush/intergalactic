import React from 'react';
import { Chart, Plot, YAxis, XAxis, Line, minMax } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';


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
      <Line x='x' y='y' duration={0}>
        <Line.Area y0='y0' y1='y1' />
        <Line.Null />
      </Line>
    </Plot>
  );
};

const data = Array(20)
      .fill({})
      .map((d, i) => {
        const y = i > 8 && i < 16 ? Math.abs(Math.sin(Math.exp(i))) * 10 : null;

        return {
          x: i,
          y,
          y0: y ? y - 2 : null,
          y1: y ? y + 2 : null,
        };
      });



export default Demo;
