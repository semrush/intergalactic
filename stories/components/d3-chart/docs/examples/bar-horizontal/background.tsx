import { Flex } from '@semcore/ui/base-components';
import { Plot, HorizontalBar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, 10]);
  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis hide={false}>
        <YAxis.Ticks primaryText />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverRect.Tooltip y='category' wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[yIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Bar</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].bar}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
      <HorizontalBar x='bar' y='category'>
        <HorizontalBar.Background />
      </HorizontalBar>
    </Plot>
  );
};
const data = BarMockData.Default;

export default Demo;
