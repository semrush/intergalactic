import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import AreaMockData from '../../../__mocks__/area';

function formatDate(value: any) {
  const options = {
    month: 'short' as const,
    day: 'numeric' as const,
  };

  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        resize: 'both',
        overflow: 'auto',
        height: '200px',
      }}
    >
      <Chart.Area
        groupKey='time'
        data={data}
        // plotWidth={500}
        // plotHeight={200}
        tooltipValueFormatter={formatDate}
        aria-label='Area chart'
      />
    </div>
  );
};

const data = AreaMockData.Interpolation;

export default Demo;
