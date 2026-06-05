import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import CigaretteMockData from '../../../__mocks__/cigarette';

function Demo() {
  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={400}
      h={28}
      overflow='auto'
    >
      <Chart.Cigarette data={data} aria-label='Cigarette chart' />
    </Box>
  );
}

const data = CigaretteMockData.Default;

export default Demo;
