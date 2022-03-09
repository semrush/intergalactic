import React from 'react';
import { Plot, Bar, YAxis, XAxis, HoverRect, Tooltip, colors } from '@semcore/d3-chart';
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
      <Tooltip tag={HoverRect} x="category" wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{data[xIndex].category}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['green-02']}>
                    Positive
                  </Tooltip.Dot>
                  <Text bold>{data[xIndex].bar1}</Text>
                </Flex>
                <Flex justifyContent="space-between" mt={2}>
                  <Tooltip.Dot mr={4} color={colors['orange-04']}>
                    Negative
                  </Tooltip.Dot>
                  <Text bold>{data[xIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <Bar x="category" y="bar1" color={colors['green-02']} />
      <Bar x="category" y="bar2" color={colors['orange-04']} />
      <XAxis position={0} />
    </Plot>
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random().toFixed(1) * 10,
    bar2: -Math.random().toFixed(1) * 10,
  }));
