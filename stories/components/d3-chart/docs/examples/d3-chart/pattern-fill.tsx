import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import StackedAreaMockData from '../../../__mocks__/stacked-area';

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey='time'
      stacked={true}
      patterns
      showXAxis={false}
      aria-label='Area chart'
    />
  );
};

const data = StackedAreaMockData.Default;

export default Demo;
