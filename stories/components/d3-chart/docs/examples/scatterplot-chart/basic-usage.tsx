import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import ScatterplotMockData from '../../../__mocks__/scatterplot';

const Demo = () => {
  return (
    <Chart.ScatterPlot
      data={data}
      plotWidth={500}
      plotHeight={300}
      groupKey='x'
      aria-label='ScatterPlot chart'
    />
  );
};

const data = ScatterplotMockData.Default;

export default Demo;
