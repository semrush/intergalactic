import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import VennMockData from '../../../__mocks__/venn';

const legendProps = {
  legendType: 'Flex' as const,
  legendMap: {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Cheap' },
  },
};

const Demo = () => {
  return (
    <Chart.Venn
      data={data}
      plotWidth={400}
      plotHeight={300}
      direction='column'
      alignItems='stretch'
      patterns
      showTooltip
      legendProps={legendProps}
      aria-label='Venn chart'
    />
  );
};

const data = VennMockData.Default;

export default Demo;
