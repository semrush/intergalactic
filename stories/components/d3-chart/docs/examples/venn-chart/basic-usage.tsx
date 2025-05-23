import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <div style={{ width: '500px' }}>
      <Chart.Venn
        data={data}
        plotWidth={300}
        plotHeight={300}
        legendProps={legendProps}
        aria-label={'Venn chart'}
      />
    </div>
  );
};

const data = {
  G: 200,
  F: 200,
  C: 500,
  U: 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100, // intersection key must be `${key1}/${key2}/...`
};

const legendProps = {
  legendMap: {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
    U: { label: 'Uniq' },
  },
};

export default Demo;
