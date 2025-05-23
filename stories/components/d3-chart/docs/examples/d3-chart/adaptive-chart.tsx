import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Line, minMax, ResponsiveContainer, XAxis, Plot, YAxis } from '@semcore/d3-chart';

const Demo = () => {
  const [[width, height], setSize] = React.useState([0, 0]);
  const MARGIN = 40;
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <ResponsiveContainer h={300} onResize={setSize}>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Line x='x' y='y'>
          <Line.Dots display />
        </Line>
      </Plot>
    </ResponsiveContainer>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));

export default Demo;
