import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BubbleMockData from '../../../__mocks__/bubble';

const Demo = () => {
  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={500}
      h={200}
      overflow='auto'
    >
      <Chart.Bubble data={data} aria-label='Bubble chart' />
    </Box>
  );
};

const data = BubbleMockData.Label;

export default Demo;
