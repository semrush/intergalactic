import React from 'react';
// @ts-ignore
import MiniChart from 'intergalactic/mini-chart';
// @ts-ignore
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const data = [
    { value: 10 },
    { value: 20 },
    { value: 50 },
    { value: 80, color: 'chart-palette-order-1' },
    { value: 45 },
    { value: 66, color: 'chart-palette-order-5' },
  ];

  return (
    <Flex>
      <MiniChart.TrendBar data={data} />
      <MiniChart.TrendBar data={data} loading={true} />
      <MiniChart.TrendHistogram data={data} />
      <MiniChart.TrendHistogram data={data} loading={true} />
    </Flex>
  );
};

export default Demo;
