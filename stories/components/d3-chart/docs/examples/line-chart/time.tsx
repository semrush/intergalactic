import { Flex } from '@semcore/ui/base-components';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

function formatDate(value: any, options: any) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleTime()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

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
        <XAxis.Ticks>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <HoverLine.Tooltip x='time' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>
                  {formatDate(data[xIndex].time, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].line}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <Line x='time' y='line'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = LineMockData.Time;

export default Demo;
