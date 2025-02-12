import React from 'react';
import { Plot, YAxis, minMax, StackedArea } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <StackedArea x='time'>
        <StackedArea.Area y='stack1' curve={curveCardinal} patterns='crosses'>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack2' curve={curveCardinal} patterns='linesDouble'>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack3' curve={curveCardinal} patterns='linesDoubleHorizontal'>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
    </Plot>
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));

export default Demo;
