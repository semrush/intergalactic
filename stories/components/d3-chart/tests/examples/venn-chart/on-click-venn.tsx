import { Chart, Venn } from '@semcore/ui/d3-chart';
import React from 'react';

const Demo = () => {
  const onClick = () => {
    console.log('I call on mount');
  };
  return (
    <div style={{ width: '500px' }}>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Venn
        data={data}
        plotWidth={300}
        plotHeight={300}
        legendProps={legendProps}
        aria-label='Venn chart'
        showLegend={true}

      >
        {Object.entries(legendProps.legendMap).map(([key, { label }]) => (
          <Venn.Circle
            key={key}
            dataKey={key}
            name={label}
            onClick={onClick}
          />
        ))}
      </Chart.Venn>

    </div>
  );
};

const data = {
  'G': 200,
  'F': 200,
  'C': 500,
  'U': 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
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
