import React from 'react';
// @ts-ignore
import MiniChart from 'intergalactic/mini-chart';
// @ts-ignore
import { Flex, Box } from 'intergalactic/flex-box';

const Demo = () => {
  const data = [10, 20, 50, 80, 45, 66];

  return (
    <Flex>
      <MiniChart.TrendLine data={data} />
      <MiniChart.TrendLine data={data} loading={true} />
      <MiniChart.TrendArea data={data} />
      <MiniChart.TrendArea data={data} loading={true} />
      <MiniChart.TrendLine data={data} lastPointColor={'chart-palette-order-4'} />
      <MiniChart.TrendArea data={data} lastPointColor={'chart-palette-order-7'} />
    </Flex>
  );
};

export default Demo;
