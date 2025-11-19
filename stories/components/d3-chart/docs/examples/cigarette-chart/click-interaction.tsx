import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import CigaretteMockData from '../../../__mocks__/d3-chart/cigarette';

function Demo() {
  const handleClick = (key: string) => {
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

const data = CigaretteMockData.Default;

export default Demo;
