import React from 'react';
import { Donut, Plot, Tooltip, colors } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
  return (
    <Plot width={300} height={300} data={data} label='example of using a donut with a label inside'>
      <Donut innerRadius={100}>
        <Donut.Pie dataKey="a" name="Pie 1" />
        <Donut.Pie dataKey="b" color={colors['green-02']} name="Pie 2" />
        <Donut.Pie dataKey="c" color={colors['violet-04']} name="Pie 3" />
        <Donut.Label>Example</Donut.Label>
      </Donut>
      <Tooltip>
        {({ dataKey, name }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{name}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Text bold>{data[dataKey]}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
    </Plot>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
