import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  return (
    <Chart.Histogram
      groupKey='category'
      data={data}
      plotWidth={500}
      plotHeight={300}
      aria-label='Histogram chart'
    />
  );
};

const data = BarMockData.Default;

export default Demo;
