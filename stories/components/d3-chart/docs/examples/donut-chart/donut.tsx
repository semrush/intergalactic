import { Flex } from '@semcore/ui/base-components';
import { Donut, Plot } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const Demo = () => {
  return (
    <Plot width={180} height={180} data={data}>
      <Donut>
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' name='Pie 2' />
        <Donut.Pie dataKey='c' name='Pie 3' />
        <Donut.Label>
          <Text tag='tspan' x='0' dy='-1.2em' fill='text-primary' size={500} fontWeight={500}>
            71,240
          </Text>
          <Text tag='tspan' x='0' dy='1.2em' fill='text-secondary' size={200}>
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
