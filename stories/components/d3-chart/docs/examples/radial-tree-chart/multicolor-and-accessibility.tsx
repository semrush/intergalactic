import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import LikeM from '@semcore/ui/icon/Like/m';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadialMockData from '../../../__mocks__/radial';

const Demo = () => {
  const width = 500;
  const height = 500;

  return (
    <Plot
      data={data}
      scale={[scaleLinear(), scaleLinear()]}
      width={width}
      height={height}
      patterns
    >
      <RadialTree>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon tag={LikeM} />
        </RadialTree.Radian>
        <RadialTree.Title>Movies</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};

const data = RadialMockData.MoviesWithPaletteColor;

export default Demo;
