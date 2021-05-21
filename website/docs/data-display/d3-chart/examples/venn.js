import React from 'react';
import { Plot, Venn, Tooltip } from '@semcore/d3-chart';

export default () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle name="Good" />
        <Venn.Circle name="Fast" color="#50AEF4" />
        <Venn.Circle name="Cheap" color="#FF8E29" />
        <Venn.Circle name="Unknown" color="#890C85" />
        <Venn.Intersection sets={['G', 'F']} stroke="#3AB011" />
        <Venn.Intersection sets={['G', 'C']} stroke="#50AEF4" />
        <Venn.Intersection sets={['F', 'C']} stroke="#FF8E29" />
        <Venn.Intersection sets={['G', 'F', 'C']} stroke="#890C85" />
        <Tooltip>
          {({ name, sets }) => {
            return {
              children: (
                <>
                  <Tooltip.Title>{!!sets ? sets : name}</Tooltip.Title>
                </>
              ),
            };
          }}
        </Tooltip>
      </Venn>
    </Plot>
  );
};

const data = [
  { name: 'Good', sets: ['G'], size: 200 },
  { name: 'Fast', sets: ['F'], size: 200 },
  { name: 'Cheap', sets: ['C'], size: 500 },
  { name: 'Unknown', sets: ['U'], size: 1 },
  { sets: ['G', 'F'], size: 100 },
  { sets: ['G', 'C'], size: 100 },
  { sets: ['F', 'C'], size: 100 },
  { sets: ['G', 'F', 'C'], size: 100 },
];
