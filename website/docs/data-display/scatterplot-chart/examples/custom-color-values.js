import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax, Tooltip } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/typography';

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
      <ScatterPlot x="x" y="y1" value="value" color="#2BB3FF" valueColor="#008ff8" />
      <ScatterPlot x="x" y="y2" value="value" color="#59DDAA" valueColor="#00C192" />
      <Tooltip>
        {({ xIndex, x, y, value }) => {
          return {
            children: (
              <>
                <Tooltip.Title>Data</Tooltip.Title>
                <Text tag="div">X axis {data[xIndex][x]}</Text>
                <Text tag="div">Y axis {data[xIndex][y]}</Text>
                <Text tag="div">Value {data[xIndex][value]}</Text>
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
    y1: Math.random().toFixed(1) * 10,
    y2: Math.random().toFixed(1) * 10,
    value: i,
  }));
