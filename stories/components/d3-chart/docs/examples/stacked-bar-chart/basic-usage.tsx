import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import StackedBarMockData from '../../../__mocks__/stacked-bar';

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
      <Chart.Bar
        groupKey='bar'
        data={data}
        type='stack'
        aria-label='Stacked bar chart'
      />
    </Box>
  );
};

const data = StackedBarMockData.Default;

export default Demo;
