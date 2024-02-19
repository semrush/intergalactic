import React from 'react';
import { Plot, GroupBar, YAxis, XAxis, HoverRect, colors } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
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
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => ({
          children: (
            <>
              <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
              <Flex justifyContent='space-between'>
                <HoverRect.Tooltip.Dot mr={4}>Bar 1</HoverRect.Tooltip.Dot>
                <Text bold>{data[xIndex].bar1}</Text>
              </Flex>
              <Flex mt={2} justifyContent='space-between'>
                <HoverRect.Tooltip.Dot mr={4}>Bar 2</HoverRect.Tooltip.Dot>
                <Text bold>{data[xIndex].bar2}</Text>
              </Flex>
            </>
          ),
        })}
      </HoverRect.Tooltip>
      <GroupBar x='category'>
        <GroupBar.Bar y='bar1' />
        <GroupBar.Bar y='bar2' />
      </GroupBar>
    </Plot>
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random() * 10,
    bar2: Math.random() * 10,
  }));

export default Demo;
