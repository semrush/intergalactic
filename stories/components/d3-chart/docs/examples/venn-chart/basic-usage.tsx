import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import VennMockData from '../../../__mocks__/venn';

const Demo = () => {
  return (
    <Box w={500}>
      <Chart.Venn
        data={data}
        plotWidth={300}
        plotHeight={300}
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
