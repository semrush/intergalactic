import React from 'react';

import MiniChart from '@semcore/mini-chart';
import { Flex } from '@semcore/flex-box';

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
    <Flex id='mylabel'>
      <MiniChart.TrendBar data={data} aria-hidden />
      <MiniChart.TrendBar data={data} loading={true} aria-label='test' />
      <MiniChart.TrendHistogram data={data} aria-labelledby={'mylabel'} />
      <MiniChart.TrendHistogram data={data} loading={true} aria-describedby={'mylabel'} />
    </Flex>
  );
};

export default Demo;
