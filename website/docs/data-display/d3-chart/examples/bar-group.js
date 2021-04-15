import React from 'react';
import { Plot, GroupBar, YAxis, XAxis, HoverRect, Tooltip, colors } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis ticks={yScale.ticks()}>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis ticks={xScale.domain()}>
        <XAxis.Ticks />
      </XAxis>
      <Tooltip tag={HoverRect} x="category" wMin={100}>
        {({ xIndex }) => ({
          children: (
            <>
              <Tooltip.Title>{data[xIndex].category}</Tooltip.Title>
              <Flex justifyContent="space-between">
                <Tooltip.Dot mr={4}>Bar 1</Tooltip.Dot>
                <Text bold>{data[xIndex].bar}</Text>
              </Flex>
              <Flex mt={2} justifyContent="space-between">
                <Tooltip.Dot mr={4} color={colors['green-01']}>
                  Bar 2
                </Tooltip.Dot>
                <Text bold>{data[xIndex].bar1}</Text>
              </Flex>
            </>
          ),
        })}
      </Tooltip>
      <GroupBar x="category">
        <GroupBar.Bar y="bar" />
        <GroupBar.Bar y="bar1" color={colors['green-01']} />
      </GroupBar>
    </Plot>
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random().toFixed(1) * 10,
    bar1: Math.random().toFixed(1) * 10,
  }));
