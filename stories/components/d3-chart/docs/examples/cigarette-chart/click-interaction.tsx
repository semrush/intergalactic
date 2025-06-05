import { Chart } from '@semcore/d3-chart';
import React from 'react';

type KEY = string;

function Demo() {
  const handleClick = (key: KEY, e: React.SyntheticEvent) => {
    console.log('click', key);
  };

  return (
    <Chart.Cigarette
      data={data}
      plotWidth={400}
      plotHeight={28}
      onClick={handleClick}
      aria-label='Cigarette chart'
    />
  );
}

const data: { [key: KEY]: number } = {
  Cats: 3524,
  Dogs: 1344,
  Capybaras: 6135,
  Hamsters: 1456,
  Birds: 1823,
};

export default Demo;
