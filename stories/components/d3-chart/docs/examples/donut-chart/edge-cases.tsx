import { Plot, Donut } from '@semcore/ui/d3-chart';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

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

const data = DonutMockData.EdgeCase;

export default Demo;
