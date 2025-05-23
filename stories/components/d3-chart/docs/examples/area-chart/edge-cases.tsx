import React from 'react';
import { Plot, XAxis, YAxis, minMax, HoverLine, Area } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
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
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine.Tooltip x='x' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{data[xIndex].x}</HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].y ?? 'n/a'}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <Area x='x' y='y'>
        <Area.Null />
        <Area.Dots />
      </Area>
    </Plot>
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

export default Demo;
