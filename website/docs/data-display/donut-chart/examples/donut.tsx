import React from 'react';
import { Donut, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
  return (
    <Plot width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' name='Pie 2' />
        <Donut.Pie dataKey='c' name='Pie 3' />
        <Donut.Label>Example</Donut.Label>
      </Donut>
      <Donut.Tooltip>
        {({ dataKey, name }) => {
          return {
            children: (
              <>
                <Donut.Tooltip.Title>{name}</Donut.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <Text bold>{data[dataKey]}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Donut.Tooltip>
    </Plot>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
