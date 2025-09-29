import { Chart, interpolateValue } from '@semcore/ui/d3-chart';
import React from 'react';

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

const data: Record<string, number | typeof interpolateValue> = {
  Cats: 3524,
  Dogs: interpolateValue,
  Capybaras: 6135,
  // @ts-ignore
  Hamsters: null,
  Birds: 1823,
};

export default Demo;
