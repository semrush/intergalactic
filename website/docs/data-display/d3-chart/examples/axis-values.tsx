import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from 'intergalactic/d3-chart';
import { scaleLinear } from 'd3-scale';
import Icon from '@semcore/icon/Video/m';

const size = 16;
const TickFormatter = ({ value, x, y }) => {
  return (
    <foreignObject
      transform={`translate(${x - size / 2},${y + 8})`}
      width={`${size}px`}
      height={`${size}px`}
    >
      {value === 10 ? 'V' : <Icon />}
    </foreignObject>
  );
};

const Demo = () => {
  const MARGIN = 60;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-1, 1]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <XAxis>
        <XAxis.Ticks ticks={xScale.ticks()}>
          {({ value, x, y, index }) => ({
            children: index % 2 === 0 ? value : <TickFormatter value={value} x={x} y={y} />,
          })}
        </XAxis.Ticks>
      </XAxis>
      <YAxis>
        <YAxis.Ticks ticks={yScale.ticks(5)}>
          {({ value }) => ({
            children: yScale.tickFormat(5, '+%')(value),
          })}
        </YAxis.Ticks>
      </YAxis>
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: (Math.random() > 0.5 ? 1 : -1) * Math.random(),
  }));

export default Demo;
