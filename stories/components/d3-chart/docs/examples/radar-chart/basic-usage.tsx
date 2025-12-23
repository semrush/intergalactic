import { Chart, colors } from '@semcore/ui/d3-chart';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const Demo = () => {
  return (
    <Chart.Radar
      data={data}
      groupKey='categories'
      plotWidth={400}
      plotHeight={400}
      aria-label='Radar chart'
    />
  );
};

const data = RadarMockData.Default;

export default Demo;
