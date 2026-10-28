import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

const Demo = () => {
  return (
    <div style={{ width: '180px' }}>
      <Chart.ScoreDonut plotWidth={180} plotHeight={180} data={{ value: 20 }} aria-label='Score donut chart' showTooltip={true} />
    </div>
  );
};

export default Demo;
