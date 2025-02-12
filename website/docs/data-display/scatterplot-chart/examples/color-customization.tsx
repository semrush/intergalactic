import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/typography';

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
      <ScatterPlot x='x' y='y1' color='#2BB3FF' />
      <ScatterPlot x='x' y='y2' color='#59DDAA' />
      <ScatterPlot.Tooltip>
        {({ index, x, y, color }) => {
          return {
            children: (
              <>
                <ScatterPlot.Tooltip.Dot color={color}>Data</ScatterPlot.Tooltip.Dot>
                <Text tag='div'>X axis {data[index][x]}</Text>
                <Text tag='div'>Y axis {data[index][y]}</Text>
              </>
            ),
          };
        }}
      </ScatterPlot.Tooltip>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
    y2: Math.random() * 10,
  }));

export default Demo;
