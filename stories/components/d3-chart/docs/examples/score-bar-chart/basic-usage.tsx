import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  return (
    <Chart.ScoreBar
      data={data}
      aria-label='ScoreBar chart'
    />
  );
};

const data = BarMockData.WithValue;

export default Demo;
