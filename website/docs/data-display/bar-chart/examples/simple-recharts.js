import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from '@semcore/chart';
import Card from '@semcore/card';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import InfoXS from '@semcore/icon/Info/m';

let date = Date.now();

const data = [...Array(15)]
  .map(() => {
    const newDate = date;
    date -= 1000 * 60 * 60 * 24;
    return {
      date: newDate,
      traffic: Math.random().toFixed(2),
    };
  })
  .reverse();

const TooltipContent = `Changes in the expected amount of traffic driven to an analyzed domain with
    branded keywords in the last 12 months.`;

export default () => (
  <Card my="24px" pt="20px" px="24px" pb="24px" wMax="600px">
    <Flex alignItems="center" mb={6}>
      <Text size={400} medium mr={1}>
        Branded traffic trend
      </Text>
      <Tooltip title={TooltipContent}>
        <InfoXS color="#a6b0b3" cursor="help" />
      </Tooltip>
    </Flex>
    <ResponsiveContainer height={100}>
      <BarChart data={data}>
        <CartesianGrid />
        <ChartTooltip
          labelFormatter={(t) =>
            new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
            }).format(Number(t))
          }
        />
        <XAxis
          dataKey="date"
          domain={['auto', 'auto']}
          tickFormatter={(t) =>
            new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
            }).format(t)
          }
        />
        <YAxis dataKey="traffic" />
        <Bar name="ebay.com" dataKey="traffic" maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);
