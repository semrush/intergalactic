import React from 'react';
import { SemiDonut } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

export default () => {
  const width = 300;
  const height = 300;

  const radius = Math.min(width, height) / 2 - 1;

  const data = {
    a: 3,
    b: 1,
    c: 2,
  };

  return (
    <svg width={width} height={height}>
      <SemiDonut
        data={data}
        innerRadius={100}
        outerRadius={radius}
        transform={`translate(${width / 2},${height / 2})`}
      >
        <SemiDonut.Pie dataKey="a" />
        <SemiDonut.Pie dataKey="b" color="#3AB011" />
        <SemiDonut.Pie dataKey="c" color="#890C85" />
        <SemiDonut.Label>
          <Text tag="tspan" x="0" dy="-1.2em" color="gray20" size={600}>
            71,240
          </Text>
          <Text tag="tspan" x="0" dy="1.2em" color="gray60" size={200}>
            Engagements
          </Text>
        </SemiDonut.Label>
      </SemiDonut>
    </svg>
  );
};
