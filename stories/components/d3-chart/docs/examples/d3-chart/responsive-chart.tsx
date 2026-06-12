import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import AreaMockData from '../../../__mocks__/area';

function formatDate(value: any) {
  const options = {
    month: 'short' as const,
    day: 'numeric' as const,
  };

  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  return (
    <Chart.Area
      w='100%'
      h={200}
      groupKey='time'
      data={data}
      tooltipValueFormatter={formatDate}
      aria-label='Area chart'
    />
  );
};

const data = AreaMockData.Default;

export default Demo;
