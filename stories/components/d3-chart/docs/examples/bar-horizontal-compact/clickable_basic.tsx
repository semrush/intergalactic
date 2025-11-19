import { Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/d3-chart/bar';

const Demo = () => {
  return (
    <Flex flexWrap gap={5}>
      <Chart.CompactHorizontalBar
        y='category'
        x='bar'
        data={data}
        plotWidth={500}
        plotHeight={450}
        onClickBar={(barIndex) => alert(`Bar ${barIndex} clicked`)}
        aria-label='CompactHorizontalBar chart'
      />
    </Flex>
  );
};

const data = BarMockData.Default;

export default Demo;
