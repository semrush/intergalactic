import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import {
  Bar,
  HoverLine,
  HoverRect,
  Line,
  Tooltip as TooltipChart,
  XAxis,
  XYPlot,
  YAxis,
} from '@semcore/d3-chart';
import EventEmitter from '@semcore/utils/lib/eventEmitter';

const EventEmitterBar = new EventEmitter();
const EventEmitterLine = new EventEmitter();

EventEmitterBar.subscribe('onNearestXY', ([pX, pY], isMaster = true) => {
  if (isMaster) {
    EventEmitterLine.emit('onNearestXY', [pX, pY], false);
  }
});

EventEmitterLine.subscribe('onNearestXY', ([pX, pY], isSlave = true) => {
  if (isSlave) {
    EventEmitterBar.emit('onNearestXY', [pX, pY], false);
  }
});

export default () => {
  const [width, height] = [600, 300];
  const MARGIN = 80;
  c;

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
      <XYPlot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        eventEmitter={EventEmitterLine}
      >
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <TooltipChart tag={HoverLine} x="date_chart" wMin={100}>
          {({ xIndex }) => {
            return {
              children: data[xIndex]?.download,
            };
          }}
        </TooltipChart>
        <Line x="date_chart" y="download">
          <Line.Dots display />
        </Line>
      </XYPlot>
      <XYPlot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        eventEmitter={EventEmitterBar}
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
        <TooltipChart tag={HoverRect} x="date_chart" wMin={100}>
          {({ xIndex }) => {
            return {
              children: data[xIndex]?.download,
            };
          }}
        </TooltipChart>
        <Bar x="date_chart" y="download" />
      </XYPlot>
    </>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  download: 172 + 10 * i,
  date_chart: 1594791280000 + 1000000000 * i,
}));
