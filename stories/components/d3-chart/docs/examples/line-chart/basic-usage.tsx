import { Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const Demo = () => {
  return (
    <Flex direction='column' gap={8}>
      <Chart.Line
        data={data}
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        xTicksCount={data.length / 2}
        aria-label='Line chart'
      />
      <Chart.Line
        data={LineMockData.Forecast}
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        xTicksCount={data.length / 2}
        aria-label='Line chart'
      />
      <Chart.Line
        data={LineMockData.Potential}
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        xTicksCount={data.length / 2}
        aria-label='Line chart'
      />
    </Flex>
  );
};

const data = LineMockData.TwoLines;

export default Demo;
