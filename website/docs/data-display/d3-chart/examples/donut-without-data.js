import React from 'react';
import { Donut } from '@semcore/d3-chart';

export default () => {
  const width = 300;
  const height = 300;

  const radius = Math.min(width, height) / 2 - 1;

  const data = {
    a: 0,
    b: 0,
    c: 0,
  };

  return (
    <svg width={width} height={height}>
      <Donut
        data={data}
        innerRadius={100}
        outerRadius={radius}
        transform={`translate(${width / 2},${height / 2})`}
      >
        <Donut.Pie dataKey="a" />
        <Donut.Pie dataKey="b" color="#3AB011" />
        <Donut.Pie dataKey="c" color="#890C85" />
      </Donut>
    </svg>
  );
};
