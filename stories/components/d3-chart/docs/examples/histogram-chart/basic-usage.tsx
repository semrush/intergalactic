import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import HistogramMockData from '../../../__mocks__/histogram';

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

const data = HistogramMockData.Default;

export default Demo;
