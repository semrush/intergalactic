import React from 'react';
import { Plot, RadialTree } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/icon/Like/m';

export default () => {
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
      <RadialTree centralMargin={85} color="#AB6CFE">
        <circle r={60} cx={width / 2} cy={height / 2} fill="#AB6CFE" />
        <RadialTree.Title fill="#FFFFFF">Sleeping</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};
