import { Plot, ScatterPlot, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import ScatterplotMockData from '../../../__mocks__/scatterplot';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([-1, 21]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-1, 11]);

  return (
    <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot x='x' y='y1' color='chart-palette-order-1' />
      <ScatterPlot x='x' y='y2' color='chart-palette-order-2' />
      <ScatterPlot.Tooltip>
        {({ index, x, y, color }) => {
          return {
            children: (
              <>
                <ScatterPlot.Tooltip.Dot color={color}>Data</ScatterPlot.Tooltip.Dot>
                <Text tag='div'>
                  X axis
                  {/* @ts-ignore */}
                  {data[index][x]}
                </Text>
                <Text tag='div'>
                  Y axis
                  {/* @ts-ignore */}
                  {data[index][y]}
                </Text>
              </>
            ),
          };
        }}
      </ScatterPlot.Tooltip>
    </Plot>
  );
};

const data = ScatterplotMockData.TwoSetsWithValue;

export default Demo;
