import { Flex } from '@semcore/ui/base-components';
import { Plot, Bar, YAxis, XAxis, HoverRect, colors } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

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
    .domain([-10, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <XAxis position={0} />
      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Positive</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].bar1}</Text>
                </Flex>
                <Flex justifyContent='space-between' mt={2}>
                  <HoverRect.Tooltip.Dot mr={4}>Negative</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
      <Bar x='category' y='bar1' color='blue-400' />
      <Bar x='category' y='bar2' color='red-300' />
    </Plot>
  );
};

const data = BarMockData.TwoBarsNegative;

export default Demo;
