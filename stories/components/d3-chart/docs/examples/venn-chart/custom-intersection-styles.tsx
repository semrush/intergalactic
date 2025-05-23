import React from 'react';
import { Plot, Venn } from '@semcore/d3-chart';

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
            stroke: '#F00',
            fill: '#0F0',
            fillOpacity: 0.3,
          }}
        />
      </Venn>
    </Plot>
  );
};

const data = {
  G: 200,
  F: 200,
  C: 200,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

export default Demo;
