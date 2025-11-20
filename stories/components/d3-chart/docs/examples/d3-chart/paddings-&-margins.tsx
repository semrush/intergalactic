import { Plot, Line, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/d3-chart/line';

const Demo = () => {
  const MARGIN = 100;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(minMax(data, 'y'));

  return (
    <Plot
      data={data}
      scale={[xScale, yScale]}
      width={width}
      height={height}
      style={{ border: '1px solid' }}
    >
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = LineMockData.Default;

export default Demo;
