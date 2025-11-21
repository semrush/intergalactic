import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import VennMockData from '../../../__mocks__/venn';

const Demo = () => {
  return (
    <div style={{ width: '500px' }}>
      <Chart.Venn
        data={data}
        plotWidth={300}
        plotHeight={300}
        legendProps={legendProps}
        aria-label='Venn chart'
      />
    </div>
  );
};

const data = VennMockData.Default;

const legendProps = {
  legendMap: {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
    U: { label: 'Uniq' },
  },
};

export default Demo;
