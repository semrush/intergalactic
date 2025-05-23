import React from 'react';
import { Chart, PlotSummarizerConfig } from '@semcore/d3-chart';
const data = {
  Cats: 3524,
  Dogs: 1344,
  Capybaras: 6135,
  Hamsters: 14,
  Birds: 1823,
};

const sum = Object.values(data).reduce((acc, item) => acc + item, 0);

const a11yAltTextConfig: PlotSummarizerConfig = {
  valuesFormatter: (value: number) => {
    const percent = Number((value / sum) * 100).toFixed(2);

    return `${value} (${percent}%).`;
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
      aria-label={'Cigarette chart'}
    />
  );
}

export default Demo;
