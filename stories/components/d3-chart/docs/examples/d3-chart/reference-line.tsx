import { Plot, ReferenceLine, ReferenceStripes, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const data = LineMockData.Months;
const yTicks = [0, 10000, 20000, 30000];

const monthCenter = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 15);
const nextMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);

const Demo = () => {
  const MARGIN = { top: 28, right: 48, bottom: 32, left: 16 };
  const width = 500;
  const height = 220;
  const plotWidth = width - MARGIN.left - MARGIN.right;
  const monthWidth = plotWidth / data.length;
  const lastMonth = data[data.length - 1].time;

  const xScale = scaleTime()
    .range([MARGIN.left, width - MARGIN.right])
    .domain([data[0].time, nextMonth(lastMonth)]);

  const yScale = scaleLinear()
    .range([height - MARGIN.bottom, MARGIN.top])
    .domain([0, 30000]);

  return (
    <Plot
      data={data}
      scale={[xScale, yScale]}
      width={width}
      height={height}
      aria-label='Line chart'
    >
      <YAxis position='right' ticks={yTicks}>
        <YAxis.Ticks>
          {({ value }) => ({
            children: value === 0 ? '0' : `${value / 1000}K`,
          })}
        </YAxis.Ticks>
        <YAxis.Grid />
      </YAxis>
      <XAxis ticks={data.map((d) => monthCenter(d.time))}>
        <XAxis.Ticks>
          {({ value }) => ({
            children: new Intl.DateTimeFormat('en', { month: 'short' }).format(value),
          })}
        </XAxis.Ticks>
      </XAxis>
      <ReferenceLine value={monthCenter(data[1].time)} />
      <ReferenceLine value={monthCenter(data[2].time)} area={monthWidth} />
      <ReferenceStripes
        value={data[4].time}
        endValue={nextMonth(data[4].time)}
        use='good'
        title='Wow!'
        subTitle='+10%'
      />
    </Plot>
  );
};

export default Demo;
