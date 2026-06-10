import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadialMockData from '../../../__mocks__/radial';

const Demo = () => {
  const width = 500;
  const height = 500;

  const textSize = 12;
  const lineHeight = textSize * 1.2;
  const textLines = ['Lorem ipsum', 'dolor', 'sit amet'];

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree color='blue-500' textSize={textSize}>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <RadialTree.Title textSize={lineHeight} color='blue-500'>
          {textLines.map((line, lineIndex) => (
            <tspan
              key={line}
              x={width / 2}
              y={height / 2 + (-(textLines.length - 1) / 2 + lineIndex) * lineHeight}
            >
              {line}
            </tspan>
          ))}
        </RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};

const data = RadialMockData.MultilineText;

export default Demo;
