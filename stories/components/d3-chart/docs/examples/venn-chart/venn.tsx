import { Plot, Venn } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import VennMockData from '../../../__mocks__/venn';

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
                {/* @ts-ignore */}
                <Text bold>{data[dataKey]}</Text>
              </>
            ),
          };
        }}
      </Venn.Tooltip>
    </Plot>
  );
};

const data = VennMockData.Default;

export default Demo;
