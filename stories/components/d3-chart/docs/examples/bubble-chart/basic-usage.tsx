import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return <Chart.Bubble data={data} plotWidth={500} plotHeight={200} aria-label={'Bubble chart'} />;
};

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1' },
  { x: 1, y: 9, value: 40, label: 'label 2' },
  { x: 6, y: 2, value: 45634, label: 'label 3' },
  { x: 4, y: 7, value: 245, label: 'label 4' },
  { x: 9, y: 5, value: 7462, label: 'label 5' },
];

export default Demo;
