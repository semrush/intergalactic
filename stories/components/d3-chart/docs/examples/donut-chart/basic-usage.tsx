import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <div style={{ width: '450px' }}>
      <Chart.Donut plotWidth={300} plotHeight={300} data={data} aria-label={'Donut chart'} />
    </div>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};

export default Demo;
