import { Flex } from '@semcore/ui/base-components';
import { Plot, Donut } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const Demo = () => {
  return (
    <Plot width={300} height={150} data={data}>
      <Donut halfsize innerRadius={100}>
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' name='Pie 2' />
        <Donut.Pie dataKey='c' name='Pie 3' />
        <Donut.Label label='71,240 engagements'>
          <Text tag='tspan' x='0' dy='-1.2em' color='text-primary' size={600}>
            71,240
          </Text>
          <Text tag='tspan' x='0' dy='1.2em' color='text-secondary' size={200}>
            Engagements
          </Text>
        </Donut.Label>
      </Donut>
      <Donut.Tooltip>
        {({ dataKey, name }) => {
          return {
            children: (
              <>
                <Donut.Tooltip.Title>{name}</Donut.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  {/* @ts-ignore */}
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

const data = DonutMockData.Default;

export default Demo;
