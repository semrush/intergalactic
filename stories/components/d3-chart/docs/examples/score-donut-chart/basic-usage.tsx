import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

const Demo = () => {
  return (
    <div style={{ width: '450px' }}>
      <Chart.ScoreDonut plotWidth={300} plotHeight={300} data={{ value: 20 }} aria-label='Score donut chart' />
    </div>
  );
};

export default Demo;
