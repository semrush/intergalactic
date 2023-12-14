import React from 'react';
import {
  Plot,
  XAxis,
  YAxis,
  minMax,
  StackedArea,
  HoverLine,
  makeDataHintsContainer,
  LegendItem,
  ChartLegend,
} from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex, Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { curveCardinal } from 'd3-shape';
import resolveColor from '@semcore/utils/lib/color';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const lineColors = {
  1: resolveColor('blue-300'),
  2: resolveColor('green-200'),
  3: resolveColor('orange-400'),
};

const dataHints = makeDataHintsContainer();

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  const legendItems = Object.keys(data[0])
    .filter((name) => name !== 'time')
    .map((item) => {
      return {
        id: item,
        label: `Stack ${item}`,
        checked: true,
        color: lineColors[item],
      };
    });

  return (
    <>
      <ChartLegend dataHints={dataHints} items={legendItems} shape={'Square'} />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
      >
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks ticks={data.map((d) => +d.time)}>
            {({ value }) => ({
              children: formatDate(value, {
                month: 'short',
                day: 'numeric',
              }),
            })}
          </XAxis.Ticks>
        </XAxis>
        <StackedArea x='time'>
          <StackedArea.Area y='1' color={lineColors[1]} curve={curveCardinal}>
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y='2' fill='#59DDAA50' color={lineColors[2]} curve={curveCardinal}>
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y='3' fill='#FF622D50' color={lineColors[3]} curve={curveCardinal}>
            <StackedArea.Area.Dots />
          </StackedArea.Area>
        </StackedArea>
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
                    <HoverLine.Tooltip.Dot mr={4} color={lineColors[1]}>
                      {legendItems[0].label}
                    </HoverLine.Tooltip.Dot>
                    <Text bold>{data[xIndex][1]}</Text>
                  </Flex>
                  <Flex mt={2} justifyContent='space-between'>
                    <HoverLine.Tooltip.Dot mr={4} color={lineColors[2]}>
                      {legendItems[1].label}
                    </HoverLine.Tooltip.Dot>
                    <Text bold>{data[xIndex][2]}</Text>
                  </Flex>
                  <Flex mt={2} justifyContent='space-between'>
                    <HoverLine.Tooltip.Dot mr={4} color={lineColors[3]}>
                      {legendItems[2].label}
                    </HoverLine.Tooltip.Dot>
                    <Text bold>{data[xIndex][3]}</Text>
                  </Flex>
                  <Flex mt={2} justifyContent='space-between'>
                    <Box mr={4}>Total</Box>
                    <Text bold>{data[xIndex][1] + data[xIndex][2] + data[xIndex][3]}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </HoverLine.Tooltip>
      </Plot>
    </>
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  1: Math.random() * 5,
  2: Math.random() * 5,
  3: Math.random() * 5,
}));
