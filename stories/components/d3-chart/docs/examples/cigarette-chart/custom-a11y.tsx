import type { PlotSummarizerConfig } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import CigaretteMockData from '../../../__mocks__/d3-chart/cigarette';

const a11yAltTextConfig: PlotSummarizerConfig = {
  valuesFormatter: (value: unknown) => {
    const numericValue = typeof value === 'number' ? value : Number(value);
    const percent = ((numericValue / sum) * 100).toFixed(2);
    return `${numericValue} (${percent}%)`;
  },
};

function Demo() {
  return (
    <Chart.Cigarette
      data={data}
      plotWidth={400}
      plotHeight={28}
      showLegend={true}
      a11yAltTextConfig={a11yAltTextConfig}
      aria-label='Cigarette chart'
    />
  );
}

const data = CigaretteMockData.Default;

const sum = Object.values(data).reduce((acc, item) => acc + item, 0);

export default Demo;
