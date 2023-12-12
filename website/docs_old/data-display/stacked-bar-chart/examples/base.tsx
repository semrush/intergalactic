import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';

export default () => {
  return (
    <Chart.Bar groupKey={'category'} data={data} plotWidth={500} plotHeight={300} type={'stack'} />
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random() * 10,
    bar2: Math.random() * 10,
  }));
