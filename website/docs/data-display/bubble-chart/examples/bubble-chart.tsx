import React from 'react';
import { Plot, Bubble, XAxis, YAxis } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([-4, 14]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
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

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
    value: Math.random() * 1000,
  }));

export default Demo;
