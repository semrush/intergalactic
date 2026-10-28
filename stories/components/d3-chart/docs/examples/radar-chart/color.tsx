import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const colorMap = {
  data_1: 'chart-palette-order-1',
  data_2: 'chart-palette-order-2',
};

const Demo = () => {
  const scale = scaleLinear().domain([0, 10]);

  return (
    <Chart.Radar
      data={data}
      groupKey='categories'
      plotWidth={500}
      plotHeight={500}
      scale={scale}
      colorMap={colorMap}
      showDots
      showLegend={false}
      showTooltip={false}
      aria-label='Radar chart'
    />
  );
};

const data = RadarMockData.Default;

export default Demo;
