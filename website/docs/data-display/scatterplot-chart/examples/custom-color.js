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
    <Plot scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot data={data} x="x" y="y" value="value" />
      <ScatterPlot data={data2} x="x" y="y" value="value" color="#59DDAA" valueColor="#00C192" />
      <Tooltip>
        {({ dataRow }) => {
          return {
            children: (
              <>
                <Tooltip.Title>Data</Tooltip.Title>
                <Text tag="div">X axis {dataRow.x}</Text>
                <Text tag="div">Y axis {dataRow.y}</Text>
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
    y: Math.random().toFixed(1) * 10,
    value: i,
  }));

const data2 = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random().toFixed(1) * 10,
    value: i,
  }));
