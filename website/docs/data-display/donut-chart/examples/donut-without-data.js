import React from 'react';
import { Plot, Donut, colors } from '@semcore/d3-chart';

export default () => {
  return (
    <Plot width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.EmptyData />
        <Donut.Pie dataKey="a" />
        <Donut.Pie dataKey="b" color={colors['green-02']} />
        <Donut.Pie dataKey="c" color={colors['pink-03']} />
      </Donut>
    </Plot>
  );
};

const data = {
  a: 0,
  b: 0,
  c: 0,
};
