import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import ScatterplotMockData from '../../../__mocks__/scatterplot';

const Demo = () => {
  return (
    <Box
      w={500}
      h={300}
    >
      <Chart.ScatterPlot
        data={data}
        groupKey='x'
        aria-label='ScatterPlot chart'
      />
    </Box>
  );
};

const data = ScatterplotMockData.Default;

export default Demo;
