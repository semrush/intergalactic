import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const Demo = () => {
  return (
    <div style={{ width: '450px' }}>
      <Chart.Donut plotWidth={300} plotHeight={300} data={data} aria-label='Donut chart' />
    </div>
  );
};

const data = DonutMockData.Default;

export default Demo;
