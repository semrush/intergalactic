import React from 'react';
import { Plot, Venn, Tooltip } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

export default () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle name="Good" dataKey="G" color="#3AB011" />
        <Venn.Circle name="Fast" dataKey="F" color="#50AEF4" />
        <Venn.Circle name="Cheap" dataKey="C" color="#FF8E29" />
        <Venn.Circle name="Unknown" dataKey="U" color="#890C85" />
        <Venn.Intersection name="Good & Fast" dataKey="G/F" />
        <Venn.Intersection name="Good & Cheap" dataKey="G/C" />
        <Venn.Intersection name="Fast & Cheap" dataKey="F/C" />
        <Venn.Intersection name="Good & Fast & Cheap" dataKey="G/F/C" />
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
