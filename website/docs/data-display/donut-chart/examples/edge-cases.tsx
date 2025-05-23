import React from 'react';
import { Plot, Donut, colors } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <Plot width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.EmptyData />
        <Donut.Pie dataKey='a' name='a' />
        <Donut.Pie dataKey='b' name='b' />
        <Donut.Pie dataKey='c' name='c' />
      </Donut>
    </Plot>
  );
};

const data = {
  a: 0,
  b: 0,
  c: 0,
};

export default Demo;
