import React from 'react';
import { Plot, RadialTree } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/icon/Like/m';

const Demo = () => {
  const width = 500;
  const height = 500;

  const data = Array(12)
    .fill({})
    .map((_, index) => ({
      label: [
        'consectetur\nadipiscing',
        'elit, sed do\neiusmod tempor',
        'incididunt ut\nlabore et\ndolore',
        'magna aliqua',
        'Ut enim',
        'ad minim veniam',
        'quis nostrud\nexercitation',
        'ullamco\nlaboris\nnisi',
        'ut aliquip ex',
        'ea commodo',
        'consequat',
        'Duis aute',
        'irure dolor\nin',
        'reprehenderit',
      ][index],
      icon: LikeM,
    }));

  const textSize = 12;
  const lineHeight = textSize * 1.2;
  const textLines = ['Lorem ipsum', 'dolor', 'sit amet'];

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree color='chart-palette-order-9' textSize={textSize}>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <RadialTree.Title textSize={lineHeight} color='chart-palette-order-9'>
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

export default Demo;
