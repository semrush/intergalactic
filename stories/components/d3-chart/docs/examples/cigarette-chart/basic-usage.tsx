import React from 'react';
import { Chart } from '@semcore/d3-chart';

function Demo() {
  return (
    <Chart.Cigarette data={data} plotWidth={400} plotHeight={28} aria-label={'Cigarette chart'} />
  );
}

const data = {
  Cats: 3524,
  Dogs: 1344,
  Capybaras: 6135,
  Hamsters: 1456,
  Birds: 1823,
};

export default Demo;
