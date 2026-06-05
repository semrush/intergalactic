import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const Demo = () => {
  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={400}
      h={400}
      overflow='auto'
    >
      <Chart.Radar
        data={data}
        groupKey='categories'
        aria-label='Radar chart'
      />
    </Box>
  );
};

const data = RadarMockData.Default;

export default Demo;
