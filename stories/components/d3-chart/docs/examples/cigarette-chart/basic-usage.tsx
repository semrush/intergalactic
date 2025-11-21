import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import CigaretteMockData from '../../../__mocks__/cigarette';

function Demo() {
  return (
    <Chart.Cigarette data={data} plotWidth={400} plotHeight={28} aria-label='Cigarette chart' />
  );
}

const data = CigaretteMockData.Default;

export default Demo;
