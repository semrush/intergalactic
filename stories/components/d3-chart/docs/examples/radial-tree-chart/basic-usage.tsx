import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadialMockData from '../../../__mocks__/radial';

const Demo = () => {
  const width = 500;
  const height = 500;

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree color='blue-400'>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <RadialTree.Title>Sleeping</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};

const data = RadialMockData.Default;

export default Demo;
