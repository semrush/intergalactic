import React from 'react';
import {
  Bar,
  HistogramChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from '@semcore/chart';
import Card from '@semcore/ui/card';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import InfoXS from '@semcore/ui/icon/Info/m';

const data = [
  { percent: 13.38, age: '18-24' },
  { percent: 27.65, age: '25-34' },
  { percent: 18.45, age: '35-44' },
  { percent: 16.62, age: '45-54' },
  { percent: 13.42, age: '55-64' },
  { percent: 10.48, age: '65+' },
];

const Demo = () => (
  <Card my="24px" pt="20px" wMax="600px">
    <Flex alignItems="center" mb={6}>
      <Text size={400} medium mr={1}>
        Domain Audience Age
      </Text>
      <Tooltip title="Average age of a researched domain’s audience">
        <InfoXS color="gray-300" cursor="help" />
      </Tooltip>
    </Flex>
    <ResponsiveContainer height={200}>
      <HistogramChart data={data}>
        <CartesianGrid />
        <ChartTooltip
          formatter={(t) => [`${t}%`, data.find((value) => value.percent === t).age]}
          labelFormatter={() =>
            new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
            }).format(Number(new Date('2019/10/19')))
          }
        />
        <XAxis dataKey="age" domain={['auto', 'auto']} />
        <YAxis dataKey="percent" tickFormatter={(t) => `${t}%`} />
        <Bar dataKey="percent" />
      </HistogramChart>
    </ResponsiveContainer>
  </Card>
);

export default () => <Demo />;
