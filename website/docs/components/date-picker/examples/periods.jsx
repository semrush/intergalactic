import React from 'react';
import { DateRangePicker } from '@semcore/date-picker';
import { Flex, Box } from '@semcore/flex-box';

function Demo() {
  const pastYear = new Date();
  pastYear.setFullYear(pastYear.getFullYear() - 1);
  const past6days = new Date();
  past6days.setDate(past6days.getDate() - 6);
  const past13days = new Date();
  past13days.setDate(past13days.getDate() - 13);

  const periods = [
    { children: 'Last 7 days', value: [past6days, new Date()] },
    { children: 'Last 14 days', value: [past13days, new Date()] },
    { children: 'Last Year 🎄', value: [pastYear, new Date()] },
  ];
  return (
    <Flex>
      <Box mr={5} mb={5}>
        <DateRangePicker periods={periods} />
      </Box>
      <Box>
        <DateRangePicker />
      </Box>
    </Flex>
  );
}

export default Demo;
