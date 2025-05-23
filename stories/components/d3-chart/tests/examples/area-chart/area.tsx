import React from 'react';
import { Plot, XAxis, YAxis, minMax, Area } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';

function formatDate(value: any, options: any) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

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
        <XAxis.Ticks ticks={data.map((d) => +d.time)}>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <Area x='time' y='line' curve={curveCardinal}>
        <Area.Dots display />
      </Area>
    </Plot>
  );
};

const baseDate = new Date('2024-01-01');
const data = [
  { time: new Date(baseDate.getTime() + 0 * 86400000), line: 2 },
  { time: new Date(baseDate.getTime() + 1 * 86400000), line: 4 },
  { time: new Date(baseDate.getTime() + 2 * 86400000), line: 6 },
  { time: new Date(baseDate.getTime() + 3 * 86400000), line: 3 },
  { time: new Date(baseDate.getTime() + 4 * 86400000), line: 5 },
  { time: new Date(baseDate.getTime() + 5 * 86400000), line: 7 },
  { time: new Date(baseDate.getTime() + 6 * 86400000), line: 6 },
  { time: new Date(baseDate.getTime() + 7 * 86400000), line: 4 },
  { time: new Date(baseDate.getTime() + 8 * 86400000), line: 5 },
  { time: new Date(baseDate.getTime() + 9 * 86400000), line: 3 },
];

export default Demo;
