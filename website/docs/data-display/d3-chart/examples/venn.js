import React from 'react';
import { Plot, Venn, Tooltip } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

export default () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey="G" name="Good" color="#3AB011" />
        <Venn.Circle dataKey="F" name="Fast" color="#50AEF4" />
        <Venn.Circle dataKey="C" name="Cheap" color="#FF8E29" />
        <Venn.Circle dataKey="U" name="Unknown" color="#890C85" />
        <Venn.Intersection dataKey="G/F" name="Good & Fast" />
        <Venn.Intersection dataKey="G/C" name="Good & Cheap" />
        <Venn.Intersection dataKey="F/C" name="Fast & Cheap" />
        <Venn.Intersection dataKey="G/F/C" name="Good & Fast & Cheap" />
        <Tooltip>
          {({ name, dataKey }) => {
            return {
              children: (
                <>
                  <Tooltip.Title>{name}</Tooltip.Title>
                  <Text bold>{data[dataKey]}</Text>
                </>
              ),
            };
          }}
        </Tooltip>
      </Venn>
    </Plot>
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
  'G/F/C': 100,
};
