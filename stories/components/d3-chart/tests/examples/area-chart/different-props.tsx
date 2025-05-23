import React from 'react';
import { Chart, Area, Plot, YAxis, XAxis } from '@semcore/d3-chart';
import { scaleTime, scaleLinear } from 'd3-scale';
import { curveBasis, curveStep, curveCardinal } from 'd3-shape';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

function formatDate(value: Date) {
  const options = {
    month: 'short' as const,
    day: 'numeric' as const,
  };
  return new Intl.DateTimeFormat('en', options).format(value);
}
const MARGIN = 40;
const width = 500;
const height = 200;
const data1 = [
  { time: 0, stack1: 1, stack2: 4, stack3: 3 },
  { time: 1, stack1: 2, stack2: 3, stack3: 4 },
  { time: 2, stack1: 1, stack2: 4, stack3: 5 },
  { time: 3, stack1: 3, stack2: 2, stack3: 6 },
  { time: 4, stack1: 2, stack2: 4, stack3: 4 },
  { time: 5, stack1: 3, stack2: 4, stack3: 3 },
  { time: 6, stack1: 4, stack2: 1, stack3: 5 },
  { time: 7, stack1: 2, stack2: 5, stack3: 3 },
  { time: 8, stack1: 2, stack2: 6, stack3: 5 },
  { time: 9, stack1: 5, stack2: 5, stack3: 3 },
];

const xScale1 = scaleLinear()
  .range([MARGIN, width - MARGIN])
  .domain([0, 15]);

const yScale1 = scaleLinear()
  .range([height - MARGIN, MARGIN])
  .domain([0, 15]);

const Demo = () => {
  const data = [
    { time: new Date('2024-01-01'), lineA: 2, lineB: 3 },
    { time: new Date('2024-01-06'), lineA: 4, lineB: 2 },
    { time: new Date('2024-01-11'), lineA: 1, lineB: 5 },
    { time: new Date('2024-01-16'), lineA: 3, lineB: 4 },
    { time: new Date('2024-01-21'), lineA: 5, lineB: 1 },
  ];

  const times = data.map((d) => d.time.getTime());
  const maxY = Math.max(...data.map((d) => d.lineA + d.lineB));

  const xScale = scaleTime()
    .domain([new Date(Math.min(...times)), new Date(Math.max(...times))])
    .range([0, 500]);

  const yScale = scaleLinear().domain([0, maxY]).range([200, 0]);

  return (
    <Flex direction='column'>
      <Flex direction='row' gap={2}>
        <Flex direction='column'>
          <Text> Сhart with dots and custom curve</Text>
          <Chart.Area
            aria-label="Area with dots and custom curve"
            groupKey="time"
            data={data}
            plotWidth={500}
            plotHeight={200}
            xScale={xScale}
            yScale={yScale}
            showDots={true}
            stacked={false}
            curve={curveBasis}
          >
            <Area x="time" y="lineA" color="blue" />
            <Area x="time" y="lineB" color="red" />
          </Chart.Area>
        </Flex>
        <Flex direction='column'>
          <Text> No dots, stacked, with hidden line </Text>
          <Chart.Area
            aria-label="Stacked chart with hidden line"
            groupKey="time"
            data={data}
            plotWidth={500}
            plotHeight={200}
            xScale={xScale}
            yScale={yScale}
            showDots={false}
            stacked={true}
          >
            <Area x="time" y="lineA" color="blue" hide={true} />
            <Area x="time" y="lineB" color="orange" />
          </Chart.Area>
        </Flex>
      </Flex>
      <Flex direction='row' gap={2}>
        <Flex direction='column'>
          <Text>  Transparent area with animation duration and curveStep</Text>

          <Chart.Area
            aria-label="Transparent area with animation"
            groupKey="time"
            data={data}
            plotWidth={500}
            plotHeight={200}
            xScale={xScale}
            yScale={yScale}
            showDots={true}
            stacked={false}
            curve={curveStep}
          >
            <Area
              x="time"
              y="lineA"
              color="green"
              transparent={true}
              duration={1000}
            >
              <Area.Dots />
              <Area.Null />
            </Area>
            <Area
              x="time"
              y="lineB"
              color="purple"
              duration={500}
            />
          </Chart.Area>
        </Flex>
        <Flex direction='column'>
          <Text>dots display function</Text>

          <Plot data={data1} scale={[xScale1, yScale1]} width={500} height={200}>
            <YAxis ticks={yScale1.ticks()}>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Area x='time' y='stack1' curve={curveCardinal} duration={0}>
              <Area.Dots display={(i: number) => i % 2 === 0} />
            </Area>
          </Plot>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Demo;
