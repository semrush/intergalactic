import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax, Chart } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { curveCardinal } from 'd3-shape';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Flex direction='column'>
    <Text>Curve prop in lines with dots</Text>
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine.Tooltip x='x' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{data[xIndex].x}</HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].y}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <Line x='x' y='y' curve={curveCardinal}>
        <Line.Dots />
      </Line>
    </Plot>

    <Text>Curve prop in Chart no dots</Text>
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'x'}
      xTicksCount={data.length / 2}
      aria-label={'Line chart'}
      curve={curveCardinal}
    />
    </Flex>
  );
};

const data = Array(20)
      .fill({})
      .map((d, i) => {
        const y = Math.abs(Math.sin(Math.exp(i))) * 10;
        return {
          x: i,
          y: y,
        };
      });

export default Demo;
