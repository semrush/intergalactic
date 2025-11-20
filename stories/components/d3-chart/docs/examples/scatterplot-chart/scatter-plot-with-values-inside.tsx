import { Plot, ScatterPlot, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import ScatterplotMockData from '../../../__mocks__/d3-chart/scatterplot';

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
      <ScatterPlot x='x' y='y' value='value' />
      <ScatterPlot.Tooltip>
        {({ index, x, y, value }) => {
          return {
            children: (
              <>
                <ScatterPlot.Tooltip.Title>Data</ScatterPlot.Tooltip.Title>
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
                <Text tag='div'>
                  Value
                  {/* @ts-ignore */}
                  {data[index][value]}
                </Text>
              </>
            ),
          };
        }}
      </ScatterPlot.Tooltip>
    </Plot>
  );
};

const data = ScatterplotMockData.DefaultWithValue;

export default Demo;
