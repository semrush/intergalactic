import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const Demo = () => {
  return (
    <div style={{ width: '340px' }}>
      <Chart.Donut
        colorMap={{ other: 'chart-data-other-value' }}
        plotWidth={180}
        plotHeight={180}
        data={data}
        aria-label='Donut chart'
      />
    </div>
  );
};

const data = DonutMockData.WithOther;

export default Demo;
