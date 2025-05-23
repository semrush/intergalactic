import React from 'react';
import { Plot, GroupBar, YAxis, XAxis, HoverRect } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

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

const data = [
  { category: 'Category 0', bar1: 2, bar2: 4 },
  { category: 'Category 1', bar1: 5, bar2: 3 },
  { category: 'Category 2', bar1: 7, bar2: 6 },
  { category: 'Category 3', bar1: 4, bar2: 5 },
  { category: 'Category 4', bar1: 6, bar2: 2 },
];

export default Demo;
