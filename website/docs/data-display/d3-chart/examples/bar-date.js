import React, { useState } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Bar, ResponsiveContainer, XAxis, Chart, YAxis } from '@semcore/d3-chart';

export default () => {
  const [[width, height], updateSize] = useState([0, 0]);
  const MARGIN = 40;

  const xScale = scaleBand()
    .domain(data.map((d) => d.date_chart))
    .range([MARGIN, width - MARGIN])
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.download))])
    .range([height - MARGIN, MARGIN]);

  const getDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  return (
    <ResponsiveContainer h={300} onResize={updateSize}>
      <Chart data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis ticks={xScale.domain()}>
          <XAxis.Ticks>
            {({ value, index }) => ({ children: index % 2 === 0 ? getDate(value) : '' })}
          </XAxis.Ticks>
        </XAxis>
        <Bar x="date_chart" y="download" />
      </Chart>
    </ResponsiveContainer>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  download: 172 + 10 * i,
  date_chart: 1594791280000 + 1000000000 * i,
}));
