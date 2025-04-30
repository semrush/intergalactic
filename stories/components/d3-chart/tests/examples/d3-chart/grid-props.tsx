import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax, Bar } from '@semcore/d3-chart';
import { scaleLinear, scaleBand, } from 'd3-scale';
import Ellipsis from '@semcore/ellipsis';

const Demo = () => {
  const MARGIN = 40;
  const width = 300;
  const height = 200;

  const xScale1 = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale1 = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

    const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-1, 1]);

    const xScale2 = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data2.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale2 = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <>
    <Plot data={data} scale={[xScale1, yScale1]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks ticks={[0, 5, 10]} />
      </YAxis>
      <XAxis>
        <XAxis.Ticks ticks={xScale.ticks(width / 50)} />
      </XAxis>
      <Line x='x' y='y' />
    </Plot>

    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <XAxis>
        <XAxis.Ticks ticks={xScale.ticks()} />
      </XAxis>
      <YAxis>
        <YAxis.Ticks ticks={yScale.ticks(5)}>
          {({ value }) => ({
            children: yScale.tickFormat(5, '+%')(value/10),
          })}
        </YAxis.Ticks>
      </YAxis>
      <Line x='x' y='y' />
    </Plot>

    <Plot data={data2} scale={[xScale2, yScale2]} width={width} height={height}>
  <YAxis>
    <YAxis.Ticks />
    <YAxis.Grid />
    <YAxis.Title>YAxis title</YAxis.Title>
  </YAxis>
  <XAxis>
    <XAxis.Ticks ticks={xScale2.domain()}/>
    <XAxis.Title >XAxis title</XAxis.Title>
  </XAxis>
  <Bar x='category' y='bar' />
</Plot>

</>
  );
};

const data = Array(20)
  .fill({})
  .map((_, i) => ({
    x: i,
    y: Math.sin(i / 2) * 5 + 5,
  }));

  const data2 = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random() * 10,
  }));

export default Demo;
