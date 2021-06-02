import React from 'react';
import { Plot, Venn, Tooltip } from '@semcore/d3-chart';

const showTooltip = (sets, data, name) => {
  const intersectionName = [];
  sets?.map((set) => intersectionName.push(data.find((c) => c.sets[0] === set).name));
  return intersectionName.join(' & ') || name;
};

export default () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle name="Good" />
        <Venn.Circle name="Fast" color="#50AEF4" />
        <Venn.Circle name="Cheap" color="#FF8E29" />
        <Venn.Circle name="Unknown" color="#890C85" />
        <Venn.Intersection sets={['G', 'F']} />
        <Venn.Intersection sets={['G', 'C']} />
        <Venn.Intersection sets={['F', 'C']} />
        <Venn.Intersection sets={['G', 'F', 'C']} />
        <Tooltip>
          {({ name, sets }) => {
            return {
              children: (
                <>
                  <Tooltip.Title>{showTooltip(sets, data, name)}</Tooltip.Title>
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
