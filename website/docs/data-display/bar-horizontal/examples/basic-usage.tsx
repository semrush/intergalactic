import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey={'category'}
      data={data}
      plotWidth={500}
      plotHeight={300}
      invertAxis={true}
      aria-label={'CompactHorizontalBar chart'}
    />
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `C.${i}`,
    bar: Math.random() * 10,
  }));

export default Demo;
