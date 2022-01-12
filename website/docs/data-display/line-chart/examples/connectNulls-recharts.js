import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip as ChartTooltip } from '@semcore/chart';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import Link from '@semcore/link';
import InfoXS from '@semcore/icon/Info/m';

let date = Date.now();

const data = Array(20)
  .fill({})
  .map(() => {
    const newDate = date;
    date -= 1000 * 60 * 60 * 24;
    return {
      date: newDate,
      visibility: Math.random().toFixed(2),
    };
  })
  .reverse();
[0, 1, 2, 4, 6].forEach((i) => (data[i].visibility = null));

const tooltipContent = `An estimation based on the average click-through rate of each position in
    Google’s results multiplied by the volume of the keyword, and divided by 30
    (i.e., the number of days in a month). It shows the probability that a user
    will click on a domain’s search result depending on this domain’s position
    in the SERP.`;

export default () => (
  <div>
    <Flex
      wMax="500px"
      my="24px"
      pt="20px"
      px="24px"
      pb="24px"
      justifyContent="space-between"
      alignItems="flex-end"
      style={{ border: '1px solid #ccc' }}
    >
      <Box>
        <Flex alignItems="center">
          <Text size={300} mr={1}>
            Visibility
          </Text>
          <Tooltip title={tooltipContent}>
            <InfoXS color="#a6b0b3" cursor="help" />
          </Tooltip>
        </Flex>
        <Box>
          <Link>
            <Text size={500}>{data[data.length - 1].visibility}%</Text>
          </Link>
          <Text size={300} ml={2} color="#6C6E79">
            <small>0.00</small>
          </Text>
        </Box>
      </Box>
      <ResponsiveContainer width={324} height={60}>
        <LineChart data={data}>
          <ChartTooltip
            labelFormatter={(t) =>
              new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(Number(data[t].date))
            }
            filterNull={false}
          />
          <Line type="monotone" name="Visibility" dataKey="visibility" connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  </div>
);
