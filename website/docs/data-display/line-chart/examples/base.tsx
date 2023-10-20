import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';
import resolveColor from '@semcore/utils/src/color';

export default () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={300}
      groupKey={'x'}
      xTicksCount={data.length / 2}
      colorMap={colorMap}
    />
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
    y2: Math.random() * 10,
  }));

const colorMap = {
  y1: resolveColor('blue-300'),
  y2: resolveColor('green-200'),
};
