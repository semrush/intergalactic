import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import {
  Bar,
  HoverLine,
  HoverRect,
  Line,
  XAxis,
  Plot,
  YAxis,
  PlotEventEmitter,
} from '@semcore/d3-chart';

const eventEmitter = new PlotEventEmitter();

const Demo = () => {
  const [width, height] = [600, 300];
  const MARGIN = 80;

  const xScale = scaleBand()
    .domain(data.map((d) => String(d.date_chart)))
    .range([MARGIN, width - MARGIN])
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.download))])
    .range([height - MARGIN / 2, MARGIN / 2]);

  const getDate = (date: number) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  return (
    <>
      <Plot
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
        <HoverLine.Tooltip x="date_chart" wMin={100}>
          {({ xIndex }) => ({
            children: <>{data[xIndex]?.download}</>,
          })}
        </HoverLine.Tooltip>
        <Line x="date_chart" y="download">
          <Line.Dots display />
        </Line>
      </Plot>

      <Plot
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
        <XAxis>
          <XAxis.Ticks>
            {({ value, index }) => ({
              children: index % 2 ? '' : getDate(Number(value)),
            })}
          </XAxis.Ticks>
        </XAxis>
        <HoverRect.Tooltip x="date_chart" wMin={100}>
          {({ xIndex }) => ({
            children: <>{data[xIndex]?.download}</>,
          })}
        </HoverRect.Tooltip>
        <Bar x="date_chart" y="download" />
      </Plot>
    </>
  );
};

// Преобразуем date_chart в строку сразу для использования в scaleBand
const data = [...Array(10).keys()].map((i) => ({
  download: 172 + 10 * i,
  date_chart: String(1594791280000 + 1000000000 * i), // строка
}));

export default Demo;
