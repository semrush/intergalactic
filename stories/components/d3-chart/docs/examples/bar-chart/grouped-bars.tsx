import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  const width = 500;
  const height = 300;

  return (
    <Chart.Bar
      data={data}
      plotWidth={width}
      plotHeight={height}
      type='group'
      groupKey='category'
      aria-label='Group bar chart'
    />
  );
};

const data = BarMockData.TwoBars;

export default Demo;
