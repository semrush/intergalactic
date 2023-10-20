import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';
import resolveColor from '@semcore/utils/src/color';

export default () => {
  return (
    <Chart.Bar
      groupKey={'category'}
      data={data}
      plotWidth={500}
      plotHeight={300}
      type={'stack'}
      colorMap={lineColors}
    />
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random() * 10,
    bar2: Math.random() * 10,
  }));

const lineColors = {
  bar1: resolveColor('blue-300'),
  bar2: resolveColor('green-200'),
};
