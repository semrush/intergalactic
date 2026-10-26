import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const Demo = () => {
  const scale = scaleLinear().domain([0, 10]);

  return (
    <Chart.Radar
      data={data}
      groupKey='categories'
      plotWidth={500}
      plotHeight={500}
      scale={scale}
      circle
      showDots
      showLegend={false}
      aria-label='Radar chart'
    />
  );
};

const data = RadarMockData.Default;

export default Demo;
