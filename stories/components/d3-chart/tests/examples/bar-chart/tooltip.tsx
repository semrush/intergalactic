import React from 'react';
import { Plot, Bar, YAxis, XAxis, HoverRect } from '@semcore/d3-chart';
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
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Bar</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].bar}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
      <Bar x='category' y='bar' />
    </Plot>
  );
};

const data = [
  { category: 'Category 0', bar: 2 },
  { category: 'Category 1', bar: 4 },
  { category: 'Category 2', bar: 6 },
  { category: 'Category 3', bar: 8 },
  { category: 'Category 4', bar: 5 },
];

export default Demo;
