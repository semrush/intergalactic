import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={500}
      h={300}
      overflow='auto'
    >
      <Chart.Bar
        groupKey='category'
        data={data}
        aria-label='Bar chart'
      />
    </Box>
  );
};

const data = BarMockData.Default;

export default Demo;
