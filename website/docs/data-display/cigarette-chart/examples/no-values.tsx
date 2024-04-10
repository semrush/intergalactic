import React from 'react';
import { Chart, interpolateValue } from 'intergalactic/d3-chart';

function Demo() {
  return <Chart.Cigarette data={data} plotWidth={400} plotHeight={28} showLegend={true} />;
}

const data: Record<string, number | typeof interpolateValue> = {
  Cats: 3524,
  Dogs: interpolateValue,
  Capybaras: 6135,
  Hamsters: null,
  Birds: 1823,
};

export default Demo;
