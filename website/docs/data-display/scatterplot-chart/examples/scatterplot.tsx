import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax, Tooltip } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/ui/typography';

export default () => {
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
    <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot x="x" y="y" />
      <Tooltip>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>Data</Tooltip.Title>
                <Text tag="div">X axis {data[xIndex].x}</Text>
                <Text tag="div">Y axis {data[xIndex].y}</Text>
              </>
            ),
          };
        }}
      </Tooltip>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
