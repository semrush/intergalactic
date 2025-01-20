import React from 'react';
import { Plot, Venn, colors } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

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

const Demo = () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey='G' name='Good' />
        <Venn.Circle dataKey='F' name='Fast' />
        <Venn.Circle dataKey='C' name='Cheap' />
        <Venn.Circle dataKey='U' name='Unknown' />
        <Venn.Intersection dataKey='G/F' name='Good & Fast' />
        <Venn.Intersection dataKey='G/C' name='Good & Cheap' />
        <Venn.Intersection dataKey='F/C' name='Fast & Cheap' />
        <Venn.Intersection dataKey='G/F/C' name='Good & Fast & Cheap' />
      </Venn>
      <Venn.Tooltip>
        {({ name, dataKey }) => {
          return {
            children: (
              <>
                <Venn.Tooltip.Title>{name}</Venn.Tooltip.Title>
                <Text bold>{data[dataKey]}</Text>
              </>
            ),
          };
        }}
      </Venn.Tooltip>
    </Plot>
  );
};

export default Demo;
