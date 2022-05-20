import React from 'react';
import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import InfoXS from '@semcore/icon/Info/m';
import Desktop from '@semcore/icon/Desktop/m';
import {
  Area,
  AreaChart,
  CartesianGrid,
  colors,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from '@semcore/chart';

const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const round = (number, multiple) => Math.round(number / multiple) * multiple;
const intFormatter = (number) => {
  let num = number / 1000000;
  const afterDot = num.toString().split('.')[1];
  if (afterDot && afterDot.length > 2) {
    num = num.toFixed(2);
  }
  return num + 'M';
};

const tooltipFormatter = (value, name, props) => {
  const { payload } = props;
  const total = Object.keys(payload).reduce((acc, val) => {
    if (val === 'date') return acc;
    return acc + payload[val];
  }, 0);
  const percent = ((value * 100) / total).toFixed(2);
  return `${intFormatter(value)} (${percent}%)`;
};

const TooltipContent = `This chart allows you to monitor traffic that comes to the analyzed domain from different sources over time.
   This helps you quickly and easily see which sources are generating the most traffic for the analyzed domain.`;

let date = Date.now();

const data = Array(6)
  .fill()
  .map(() => {
    const newDate = date;
    date -= 1000 * 60 * 60 * 24 * 31;
    return {
      date: newDate,
      direct: round(70000000 + getRandomInt(500000, 10000000), 100000),
      referral: round(10900000 + getRandomInt(100000, 400000), 100000),
      search: round(30000000 + getRandomInt(100000, 500000), 100000),
      social: round(2500000 + getRandomInt(100000, 800000), 100000),
      paid: round(5000 + getRandomInt(5000, 1000000), 1000),
    };
  })
  .reverse();

export default () => (
  <Box my={6} pt={5} pb={6} px={6} style={{ border: '1px solid #c4c7cf', borderRadius: '6px' }}>
    <Flex alignItems="center" mb={2}>
      <Text size={400} mr={1} medium>
        Traffic sources
      </Text>
      <Tooltip title={TooltipContent}>
        <InfoXS color="gray-300" cursor="help" />
      </Tooltip>
    </Flex>
    <Flex justifyContent="space-between" mt={3} mb={6}>
      <Flex alignItems="center">
        <Desktop color="gray-300" />
        <Text size={100} ml={1}>
          Desktop
        </Text>
      </Flex>
      <Text size={100} color="gray-500">
        Last 6 month
      </Text>
    </Flex>
    <Flex>
      <Flex alignItems="center" wMax="20px">
        <Text size={200} color="gray-500" style={{ transform: 'rotate(-90deg)' }}>
          Visits
        </Text>
      </Flex>
      <ResponsiveContainer aspect={2}>
        <AreaChart data={data}>
          <CartesianGrid />
          <YAxis tickFormatter={(c) => c.toString().replace(/000000$/, 'M')} />
          <XAxis
            dataKey="date"
            scale="time"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(t) =>
              new Intl.DateTimeFormat('en-US', {
                month: 'short',
                year: 'numeric',
              }).format(t)
            }
          />
          <ChartTooltip
            formatter={tooltipFormatter}
            itemSorter={() => -1}
            labelFormatter={(t) =>
              new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric',
              }).format(Number(t))
            }
          />
          <Area
            type="linear"
            name="Paid"
            fill={colors['orange-01']}
            stroke={colors['orange-01']}
            dataKey="paid"
            stackId="1"
          />
          <Area
            type="linear"
            name="Social"
            fill={colors['pink-01']}
            stroke={colors['pink-01']}
            dataKey="social"
            stackId="1"
          />
          <Area
            type="linear"
            name="Search"
            fill={colors['yellow-01']}
            stroke={colors['yellow-01']}
            dataKey="search"
            stackId="1"
          />
          <Area
            type="linear"
            name="Referral"
            fill={colors['green-01']}
            stroke={colors['green-01']}
            dataKey="referral"
            stackId="1"
          />
          <Area type="linear" name="Direct" dataKey="direct" stackId="1" />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  </Box>
);
