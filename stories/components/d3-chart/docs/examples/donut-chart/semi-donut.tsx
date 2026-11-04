import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const Demo = () => {
  return (
    <Chart.Donut w={180} h={90} halfsize={true} showLegend={false} data={data} aria-label='Donut chart' innerLabel={['71,240', 'Engagements']} />
  );
};

const data = DonutMockData.Default;

export default Demo;
