import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax } from 'intergalactic/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from 'intergalactic/typography';

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
                <Text tag='div'>X axis {data[index][x]}</Text>
                <Text tag='div'>Y axis {data[index][y]}</Text>
                <Text tag='div'>Value {data[index][value]}</Text>
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
    y: Math.random() * 10,
    value: i,
  }));

export default Demo;
