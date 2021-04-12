import React from 'react';
import { Chart, Donut, Tooltip } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

export default () => {
  return (
    <Chart width={300} height={150} data={data}>
      <Donut half innerRadius={100}>
        <Donut.Pie dataKey="a" name="Pie 1" />
        <Donut.Pie dataKey="b" color="#890C85" name="Pie 2" />
        <Donut.Pie dataKey="c" color="#3AB011" name="Pie 3" />
        <Donut.Label>
          <Text tag="tspan" x="0" dy="-1.2em" color="gray20" size={600}>
            71,240
          </Text>
          <Text tag="tspan" x="0" dy="1.2em" color="gray60" size={200}>
            Engagements
          </Text>
        </Donut.Label>
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
    </Chart>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
