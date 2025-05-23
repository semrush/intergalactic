import React from 'react';
import { Plot, Bubble, XAxis, YAxis } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/typography';

const Demo = () => {
  const MARGIN = 40;
  const LEFT_MARGIN = 60;  // больше отступ слева
  const BOTTOM_MARGIN = 60; // больше отступ снизу
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([LEFT_MARGIN, width - MARGIN])  // левый отступ больше
    .domain([-4, 14]);

  const yScale = scaleLinear()
    .range([height - BOTTOM_MARGIN, MARGIN]) // нижний отступ больше
    .domain([-4, 14]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Bubble x='x' y='y' value='value' />
      <Bubble.Tooltip>
        {({ index }) => {
          return {
            children: (
              <>
                <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                <Text tag='div'>X axis {data[index].x}</Text>
                <Text tag='div'>Y axis {data[index].y}</Text>
                <Text tag='div'>Value {data[index].value}</Text>
              </>
            ),
          };
        }}
      </Bubble.Tooltip>
    </Plot>
  );
};

const data = [
  { x: 1, y: 2, value: 200 },
  { x: 5, y: 6, value: 400 },
  { x: 6, y: 7, value: 600 },
  { x: 8, y: 9, value: 800 },
  { x: 10, y: 11, value: 1000 },
  { x: 6, y: 8, value: 900 },
  { x: 7, y: 6, value: 700 },
  { x: 8, y: 4, value: 500 },
  { x: 9, y: 2, value: 300 },
  { x: 10, y: 1, value: 100 },
];

export default Demo;
