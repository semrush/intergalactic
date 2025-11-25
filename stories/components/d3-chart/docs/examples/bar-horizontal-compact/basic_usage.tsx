import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  return (
    <Chart.CompactHorizontalBar
      y='category'
      x='value'
      data={data}
      plotWidth={500}
      plotHeight={450}
      aria-label='CompactHorizontalBar chart'
    />
  );
};

const data = BarMockData.WithValue;

export default Demo;
