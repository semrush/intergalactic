import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  return (
    <>
      {' '}
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}

      <Chart.CompactHorizontalBar
        y='category'
        x='value'
        data={data}
        plotWidth={500}
        plotHeight={450}
        aria-label='CompactHorizontalBar chart'
        showLegend={showLegend}
      />
    </>
  );
};

const data = [
  {
    category: 'Schema.org (Microdata)',
    value: 0,
  },
  {
    category: 'Open graph',
    value: 9650,
  },
  {
    category: 'Twitter cards',
    value: 7650,
  },
  {
    category: 'Microformats',
    value: 14650,
  },
  {
    category: 'Schema.org (JSON-LD)',
    value: 135650,
  },
];

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
