import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadialMockData from '../../../__mocks__/d3-chart/radial';

const Demo = () => {
  const width = 500;
  const height = 500;

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree centralMargin={85} color='blue-400'>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <circle r={60} cx={width / 2} cy={height / 2} fill='#008FF8' />
        <RadialTree.Title color='white'>Sleeping</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};

const data = RadialMockData.Default;

export default Demo;
