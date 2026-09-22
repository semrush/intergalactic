import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import AreaMockData from '../../../__mocks__/area';

const Demo = () => {
  return (
    <Chart.Area
      groupKey='time'
      data={data}
      plotWidth={500}
      plotHeight={200}
      aria-label='Area chart'
      showDeltaPercentInTooltip
      getPercentDelta={(key, index, data): number | null => {
        const first = data[0][key];
        const curr = data[index][key];

        if (typeof first !== 'number' || typeof curr !== 'number') return null;

        if (first === 0) return curr === 0 ? 0 : null;

        return ((curr - first) / Math.abs(first)) * 100;
      }}
    />
  );
};

const data = AreaMockData.Default;

export default Demo;
