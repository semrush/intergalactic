import React from 'react';
import { Chart, Area } from '@semcore/d3-chart';
import { scaleTime, scaleLinear } from 'd3-scale';

function formatDate(value: Date) {
  const options = {
    month: 'short' as const,
    day: 'numeric' as const,
  };
  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  const data = [
    { time: new Date('2024-01-01'), lineA: 2, lineB: 3 },
    { time: new Date('2024-01-06'), lineA: 4, lineB: 2 },
    { time: new Date('2024-01-11'), lineA: 1, lineB: 5 },
    { time: new Date('2024-01-16'), lineA: 3, lineB: 4 },
    { time: new Date('2024-01-21'), lineA: 5, lineB: 1 },
  ];

  const times = data.map((d) => d.time.getTime());
  const maxY = Math.max(
    ...data.map((d) => d.lineA + d.lineB) 
  );

  const xScale = scaleTime()
    .domain([new Date(Math.min(...times)), new Date(Math.max(...times))])
    .range([0, 500]);

  const yScale = scaleLinear()
    .domain([0, maxY])
    .range([200, 0]);

  return (
    <>
    <Chart.Area
      aria-label="Stacked area chart"
      groupKey="time"
      data={data}
      plotWidth={500}
      plotHeight={200}
      tooltipValueFormatter={formatDate}
      xScale={xScale}
      yScale={yScale}
      showDots
      stacked = {false}
    >
      <Area x="time" y="lineA" color="blue">
        <Area.Dots />
        <Area.Null />
      </Area>
      <Area x="time" y="lineB" color="orange">
        <Area.Dots />
        <Area.Null />
      </Area>
    </Chart.Area>
    <Chart.Area
      aria-label="Stacked area chart no dots"
      groupKey="time"
      data={data}
      plotWidth={500}
      plotHeight={200}
      tooltipValueFormatter={formatDate}
      xScale={xScale}
      yScale={yScale}
      showDots = {false}
      stacked = {false}
    >
      <Area x="time" y="lineA" color="blue">
        <Area.Dots />
        <Area.Null />
      </Area>
      <Area x="time" y="lineB" color="orange">
        <Area.Dots />
        <Area.Null />
      </Area>
    </Chart.Area>

    <Chart.Area
  aria-label="Stacked area chart no dots"
  groupKey="time"
  data={data}
  plotWidth={500}
  plotHeight={200}
  tooltipValueFormatter={formatDate}
  xScale={xScale}
  yScale={yScale}
  stacked={true}
>
  <Area x="time" y="lineA" color="blue" hide={true}>
    <Area.Dots />
    <Area.Null />
  </Area>
  <Area
    x="time"
    y="lineB"
    color="orange"
    transparent={true}
  >
    <Area.Dots />
    <Area.Null />
  </Area>
</Chart.Area>

    </>
  );
};

export default Demo;
