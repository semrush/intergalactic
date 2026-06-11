import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey='category'
      data={data}
      plotWidth={500}
      plotHeight={300}
      invertAxis={true}
      aria-label='CompactHorizontalBar chart'
    />
  );
};

const data = BarMockData.Default.map((d, i) => ({ ...d, category: `C.${i}` }));

export default Demo;
