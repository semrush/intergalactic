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
      colorMap={colorMap}
      showDots
      showTooltip={false}
      patterns
      legendProps={legendProps}
      aria-label='Radar chart'
    />
  );
};

const data = RadarMockData.Default;

const colorMap = {
  data_1: '--intergalactic-chart-palette-order-1',
  data_2: '--intergalactic-chart-palette-order-2',
};

const legendProps = {
  legendMap: Object.keys(data)
    .filter((name) => name !== 'categories')
    .reduce<Record<string, { label: string }>>((acc, key, index) => {
      acc[key] = { label: `Category ${index + 1}` };

      return acc;
    }, {}),
};

export default Demo;
