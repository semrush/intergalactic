import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import AreaMockData from '../../../__mocks__/area';

const Demo = () => {
  return (
    <Chart.Area
      groupKey='time'
      data={data}
      plotWidth={500}
      plotHeight={300}
      marginX={40}
      xTicksCount={5}
      yTicksCount={4}
      stacked={false}
      showDots
      showLegend
      legendProps={legendProps}
      aria-label='Area chart'
    />
  );
};

const data = AreaMockData.Interpolation;

const legendProps = {
  legendMap: {
    line1: { label: 'Line 1' },
    line2: { label: 'Line 2' },
  },
};

export default Demo;
