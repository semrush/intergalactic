import { Plot, RadialTree } from '@semcore/d3-chart';
import LikeM from '@semcore/icon/Like/m';
import { scaleLinear } from 'd3-scale';
import React from 'react';

const Demo = () => {
  const width = 500;
  const height = 500;

  const data = Array(12)
    .fill({})
    .map((_, i) => ({
      label: `Sheep ${i + 1}`,
      icon: LikeM,
    }));

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree color='chart-palette-order-9'>
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

export default Demo;
