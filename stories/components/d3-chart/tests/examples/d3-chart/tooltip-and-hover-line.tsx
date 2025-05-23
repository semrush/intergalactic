import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { scaleLinear, scaleTime } from 'd3-scale';

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
      <HoverLine.Tooltip x="time" wMin={100}>
        {({ xIndex }) => ({
          children: (
            <>
              <HoverLine.Tooltip.Title>
                {formatDate(data[xIndex].time, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </HoverLine.Tooltip.Title>
              <Flex justifyContent="space-between">
                <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                <Text bold>{data[xIndex].line}</Text>
              </Flex>
              <HoverLine.Tooltip.Footer>New data start tracking!</HoverLine.Tooltip.Footer>
            </>
          ),
        })}
      </HoverLine.Tooltip>
      <Line x="time" y="line">
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

// Заданный промежуток: 1 января 2024 – 20 января 2024
const startDate = new Date('2024-01-01');
const data = Array.from({ length: 20 }, (_, i) => ({
  time: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
  line: Math.sin(i / 3) * 4 + 5, // значения от ~1 до 9
}));

export default Demo;
