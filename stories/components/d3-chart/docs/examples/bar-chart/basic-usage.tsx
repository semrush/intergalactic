import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const links = [
  'https://google.com',
  'https://semrush.com',
  'https://wroclaw.pl',
];

const Demo = () => {
  return (
    <Chart.Bar
      groupKey='category'
      data={data}
      plotWidth={500}
      plotHeight={300}
      aria-label='Bar chart'
      getLink={(index) => links[index]}
    />
  );
};

const data = BarMockData.Default;

export default Demo;
