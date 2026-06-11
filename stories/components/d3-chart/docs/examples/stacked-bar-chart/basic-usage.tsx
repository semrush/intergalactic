import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import StackedBarMockData from '../../../__mocks__/stacked-bar';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey='bar'
      data={data}
      plotWidth={500}
      plotHeight={200}
      type='stack'
      aria-label='Stacked bar chart'
    />
  );
};

const data = StackedBarMockData.Default;

export default Demo;
