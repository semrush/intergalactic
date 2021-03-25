import React from 'react';
import { XYPlot, Line, XAxis, YAxis, HoverLine, Tooltip, minMax } from '@semcore/d3-chart';
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
    <XYPlot data={data} scale={[xScale, yScale]} width={width} height={height}>
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
                  <Text bold>{data[xIndex].y}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <Line x="x" y="y" curve>
        <Line.Dots />
      </Line>
    </XYPlot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random().toFixed(1) * 10,
  }));
