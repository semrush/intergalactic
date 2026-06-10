import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const Demo = () => {
  return (
    <Box
      w={500}
      h={200}
    >
      <Chart.Line
        data={data}
        groupKey='x'
        xTicksCount={data.length / 2}
        aria-label='Line chart'
      />
    </Box>
  );
};

const data = LineMockData.TwoLines;

export default Demo;
