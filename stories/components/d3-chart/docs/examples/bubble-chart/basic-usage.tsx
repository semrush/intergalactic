import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BubbleMockData from '../../../__mocks__/bubble';

const Demo = () => {
  return (
    <Box
      w={500}
      h={200}
    >
      <Chart.Bubble data={data} aria-label='Bubble chart' />
    </Box>
  );
};

const data = BubbleMockData.Label;

export default Demo;
