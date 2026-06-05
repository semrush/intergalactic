import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import VennMockData from '../../../__mocks__/venn';

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
      <Chart.Venn
        data={data}
        legendProps={legendProps}
        aria-label='Venn chart'
      />
    </Box>
  );
};

const data = VennMockData.Default;

const legendProps = {
  legendMap: {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
  },
};

export default Demo;
