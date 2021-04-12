import React from 'react';
import { Chart, Donut } from '@semcore/d3-chart';

export default () => {
  return (
    <Chart width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.NotData />
        <Donut.Pie dataKey="a" />
        <Donut.Pie dataKey="b" color="#3AB011" />
        <Donut.Pie dataKey="c" color="#890C85" />
      </Donut>
    </Chart>
  );
};

const data = {
  a: 0,
  b: 0,
  c: 0,
};
