import type { interpolateValue } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import CigaretteMockData from '../../../__mocks__/d3-chart/cigarette';

function Demo() {
  return (
    <Chart.Cigarette
      data={data}
      plotWidth={400}
      plotHeight={28}
      showLegend={true}
      aria-label='Cigarette chart'
    />
  );
}

// @ts-ignore
const data = CigaretteMockData.EdgeCase as Record<string, number | typeof interpolateValue>;

export default Demo;
