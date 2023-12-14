import React from 'react';
import { Chart, colors } from '@semcore/ui/d3-chart';

export default () => {
  return <Chart.Radar data={data} groupKey={'categories'} plotWidth={400} plotHeight={400} />;
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
