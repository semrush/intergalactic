import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Bar, HoverLine, HoverRect, Line, Tooltip, XAxis, Chart, YAxis } from '@semcore/d3-chart';
import EventEmitter from '@semcore/utils/lib/eventEmitter';

const eventEmitter = new EventEmitter();

export default () => {
  const [width, height] = [600, 300];
  const MARGIN = 80;

  const xScale = scaleBand()
    .domain(data.map((d) => d.date_chart))
    .range([MARGIN, width - MARGIN])
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.download))])
    .range([height - MARGIN / 2, MARGIN / 2]);

  const getDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  return (
    <>
      <Chart
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        eventEmitter={eventEmitter}
      >
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <Tooltip tag={HoverLine} x="date_chart" wMin={100}>
          {({ xIndex }) => {
            return {
              children: data[xIndex]?.download,
            };
          }}
        </Tooltip>
        <Line x="date_chart" y="download">
          <Line.Dots display />
        </Line>
      </Chart>
      <Chart
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        eventEmitter={eventEmitter}
      >
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis ticks={xScale.domain()}>
          <XAxis.Ticks>
            {({ value, index }) => ({ children: index % 2 === 0 ? getDate(value) : '' })}
          </XAxis.Ticks>
        </XAxis>
        <Tooltip tag={HoverRect} x="date_chart" wMin={100}>
          {({ xIndex }) => {
            return {
              children: data[xIndex]?.download,
            };
          }}
        </Tooltip>
        <Bar x="date_chart" y="download" />
      </Chart>
    </>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  download: 172 + 10 * i,
  date_chart: 1594791280000 + 1000000000 * i,
}));
