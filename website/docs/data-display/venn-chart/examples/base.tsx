import React from 'react';
import { Chart } from '@semcore/d3-chart';
import resolveColor from '@semcore/utils/src/color';

export default () => {
  return (
    <div style={{ width: '500px' }}>
      <Chart.Venn
        data={data}
        plotWidth={300}
        plotHeight={300}
        colorMap={lineColors}
        legendProps={legendProps}
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

const lineColors = {
  G: resolveColor('blue-300'),
  F: resolveColor('green-200'),
  C: resolveColor('orange-400'),
  U: resolveColor('red-400'),
};

const legendProps = {
  legendMap: {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
    U: { label: 'Uniq' },
  },
};
