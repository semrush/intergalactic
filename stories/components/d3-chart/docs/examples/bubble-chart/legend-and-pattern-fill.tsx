import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import BubbleMockData from '../../../__mocks__/bubble';

const legendProps = {
  shape: 'Checkbox' as const,
};

const Demo = () => {
  const width = 500;
  const height = 300;

  return (
    <Chart.Bubble
      data={data}
      plotWidth={width}
      plotHeight={height}
      legendProps={legendProps}
      patterns
      aria-label='Bubble chart with pattern fill'
    />
  );
};

const data = BubbleMockData.LabelAndColor;

export default Demo;
