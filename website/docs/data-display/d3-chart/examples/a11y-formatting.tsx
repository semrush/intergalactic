import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax, PlotSummarizerConfig } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

const a11yAltTextConfig: PlotSummarizerConfig = {
  titlesFormatter: (title) => {
    if (title === 'y') return 'Money volume';
    if (title === 'x') return 'Time';
  },
  valuesFormatter: (value, column) => {
    if (column === 'y') {
      return `$${Number(value).toFixed(2)}`;
    }
    if (column === 'x') {
      return `${value} s.`;
    }
  },
};

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
    <Plot
      data={data}
      scale={[xScale, yScale]}
      width={width}
      height={height}
      a11yAltTextConfig={a11yAltTextConfig}
    >
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Line x='x' y='y'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));

export default Demo;
