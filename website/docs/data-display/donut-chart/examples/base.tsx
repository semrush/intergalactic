import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';
import resolveColor from '@semcore/utils/src/color';

export default () => {
  return (
    <div style={{ width: '450px' }}>
      <Chart.Donut plotWidth={300} plotHeight={300} data={data} colorMap={colorMap} />;
    </div>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};

const colorMap = {
  a: resolveColor('blue-300'),
  b: resolveColor('green-200'),
  c: resolveColor('red-200'),
};
