import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  return (
    <Box
      w={500}
      h={450}
    >
      <Chart.CompactHorizontalBar
        y='category'
        x='value'
        data={data}
        aria-label='CompactHorizontalBar chart'
      />
    </Box>
  );
};

const data = BarMockData.WithValue;

export default Demo;
