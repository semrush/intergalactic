import React from 'react';
import { Donut, Plot, Tooltip } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export default () => {
  return (
    <Plot width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.Pie dataKey="a" name="Pie 1" />
        <Donut.Pie dataKey="b" color="#890C85" name="Pie 2" />
        <Donut.Pie dataKey="c" color="#3AB011" name="Pie 3" />
        <Donut.Label>Example</Donut.Label>
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
      </Donut>
    </Plot>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
