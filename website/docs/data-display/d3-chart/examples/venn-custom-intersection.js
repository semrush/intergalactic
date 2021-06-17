import React from 'react';
import { Plot, Venn } from '@semcore/d3-chart';

export default () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey="G" color="#3AB011" />
        <Venn.Circle dataKey="F" color="#50AEF4" />
        <Venn.Circle dataKey="C" color="#FF8E29" />
        <Venn.Intersection dataKey="G/F" />
        <Venn.Intersection dataKey="G/C" />
        <Venn.Intersection dataKey="F/C" />
        <Venn.Intersection
          dataKey="G/F/C"
          style={{
            stroke: '#890C85',
            fill: '#890C85',
            fillOpacity: '0.3',
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
