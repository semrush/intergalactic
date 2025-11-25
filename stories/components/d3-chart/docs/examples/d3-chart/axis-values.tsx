import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

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
        <XAxis.Ticks ticks={xScale.ticks()} />
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

const data = LineMockData.Default.map((d) => ({ ...d, y: d.y >= 5 ? d.y / 10 : -(d.y / 10) }));

export default Demo;
