import React from 'react';
import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import InfoXS from '@semcore/icon/lib/Info/xs';
import Desktop from '@semcore/icon/lib/Desktop/xs';
import {
  Area,
  AreaChart,
  Dot,
  CartesianGrid,
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
  return value === null ? 'null' : `${intFormatter(value)} (${percent}%)`;
};

const TooltipContent = `This chart allows you to monitor traffic that comes to the analyzed domain from different sources over time.
   This helps you quickly and easily see which sources are generating the most traffic for the analyzed domain.`;

let date = Date.now();

const data = Array(12)
  .fill('')
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

[2, 4, 10, 11].forEach((i) =>
  Object.keys(data[i]).forEach((key) => {
    if (key !== 'date') {
      data[i][key] = null;
    }
  }),
);

const activeDot = (props) => {
  const { dataKey, payload } = props;
  if (payload[dataKey] !== null) {
    return <Dot {...props} r={8} fillOpacity={1} />;
  }
};

export default () => (
  <Box my={6} pt={5} pb={6} px={6} style={{ border: '1px solid #ccc' }}>
    <Flex alignItems="center" mb={2}>
      <Text size={400} mr={1} medium>
        Traffic sources
      </Text>
      <Tooltip title={TooltipContent}>
        <InfoXS color="#a6b0b3" cursor="help" />
      </Tooltip>
    </Flex>
    <Flex justifyContent="space-between" mt={3} mb={6}>
      <Flex alignItems="center">
        <Desktop color="#a6b0b3" />
        <Text size={100} ml={1}>
          Desktop
        </Text>
      </Flex>
      <Text size={100} color="#757575">
        Last 6 month
      </Text>
    </Flex>
    <Flex>
      <Flex alignItems="center" wMax="20px">
        <Text size={200} color="gray60" style={{ transform: 'rotate(-90deg)' }}>
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
            filterNull={false}
            itemSorter={() => -1}
            labelFormatter={(t) =>
              new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric',
              }).format(Number(t))
            }
          />
          <Area
            connectNulls
            activeDot={activeDot}
            type="linear"
            name="Paid"
            fill="#e91e25"
            stroke="#e91e25"
            dataKey="paid"
            stackId="1"
          />
          <Area
            connectNulls
            activeDot={activeDot}
            type="linear"
            name="Social"
            fill="#890c85"
            stroke="#890c85"
            dataKey="social"
            stackId="1"
          />
          <Area
            connectNulls
            activeDot={activeDot}
            type="linear"
            name="Search"
            fill="#ff8e29"
            stroke="#ff8e29"
            dataKey="search"
            stackId="1"
          />
          <Area
            connectNulls
            activeDot={activeDot}
            type="linear"
            name="Referral"
            fill="#3ab011"
            stroke="#3ab011"
            dataKey="referral"
            stackId="1"
          />
          <Area
            type="linear"
            name="Direct"
            dataKey="direct"
            stackId="1"
            connectNulls
            activeDot={activeDot}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  </Box>
);
