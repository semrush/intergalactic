import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const Demo = () => {
  return (
    <Box
      w={400}
      h={400}
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
