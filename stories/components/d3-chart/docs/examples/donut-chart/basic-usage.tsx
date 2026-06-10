import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const Demo = () => {
  return (
    <Box
      w={450}
      h={300}
    >
      <Chart.Donut data={data} aria-label='Donut chart' />
    </Box>
  );
};

const data = DonutMockData.Default;

export default Demo;
