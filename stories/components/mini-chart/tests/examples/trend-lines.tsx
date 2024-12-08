import React from 'react';

import MiniChart from '@semcore/mini-chart';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
  const data = [10, 20, 50, 80, 45, 66];

  return (
    <Flex id="mylabel">
      <MiniChart.TrendLine data={data} aria-hidden/>
      <MiniChart.TrendLine data={data} loading={true}  aria-label="test"/>
      <MiniChart.TrendArea data={data} aria-labelledby={'mylabel'}/>
      <MiniChart.TrendArea data={data} loading={true} aria-describedby={'mylabel'}/>
      <MiniChart.TrendLine data={data} lastPointColor={'chart-palette-order-4'} />
      <MiniChart.TrendArea data={data} lastPointColor={'chart-palette-order-7'} />
    </Flex>
  );
};

export default Demo;
