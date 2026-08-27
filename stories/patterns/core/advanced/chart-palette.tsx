import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { chartPaletteLines } from './chart-palette-data';

const Demo = () => {
  return (
    <Chart.Line
      data={chartPaletteLines}
      plotWidth={600}
      plotHeight={300}
      groupKey='x'
      xTicksCount={chartPaletteLines.length / 2}
      showLegend
      aria-label='Line chart with twenty-four lines'
    />
  );
};

export default Demo;
