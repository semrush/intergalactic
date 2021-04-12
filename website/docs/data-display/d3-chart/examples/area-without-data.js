import React from 'react';
import { Chart, XAxis, YAxis, minMax, HoverLine, Tooltip, Area } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Chart data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis ticks={yScale.ticks()}>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis ticks={xScale.ticks()}>
        <XAxis.Ticks />
      </XAxis>
      <Tooltip tag={HoverLine} x="x" wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{data[xIndex].x}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Tooltip.Dot mr={4}>Line</Tooltip.Dot>
                  <Text bold>{data[xIndex].y ?? 'n/a'}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <Area x="x" y="y">
        <Area.Dots />
        <Area.Null />
      </Area>
    </Chart>
  );
};

const data = [
  { x: 0, y: 1 },
  { x: 1, y: 4 },
  { x: 2, y: null },
  { x: 3, y: null },
  { x: 4, y: 1 },
  { x: 5, y: null },
];
