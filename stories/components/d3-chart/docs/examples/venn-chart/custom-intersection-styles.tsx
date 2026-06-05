import { Plot, Venn } from '@semcore/ui/d3-chart';
import React from 'react';

import VennMockData from '../../../__mocks__/venn';

const Demo = () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey='G' name='G' />
        <Venn.Circle dataKey='F' name='F' />
        <Venn.Circle dataKey='C' name='C' />
        <Venn.Intersection dataKey='G/F' name='G/F' />
        <Venn.Intersection dataKey='G/C' name='G/C' />
        <Venn.Intersection dataKey='F/C' name='F/C' />
        <Venn.Intersection
          dataKey='G/F/C'
          name='G/F/C'
          style={{
            stroke: 'var(--intergalactic-chart-palette-order-1)',
            fill: 'var(--intergalactic-chart-palette-order-1)',
            fillOpacity: 1,
          }}
        />
      </Venn>
    </Plot>
  );
};

const data = VennMockData.Default;

export default Demo;
