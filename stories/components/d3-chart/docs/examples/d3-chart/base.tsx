import { Plot, Line, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/d3-chart/line';

const Demo = () => {
  const width = 500;
  const height = 300;

  const xScale = scaleLinear().range([0, width]).domain(minMax(data, 'x'));

  const yScale = scaleLinear().range([height, 0]).domain(minMax(data, 'y'));

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = LineMockData.Default;

export default Demo;
