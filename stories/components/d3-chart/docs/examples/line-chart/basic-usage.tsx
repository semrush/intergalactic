import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const Demo = () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey='x'
      xTicksCount={data.length / 2}
      aria-label='Line chart'
    />
  );
};

const data = LineMockData.TwoLines;

export default Demo;
