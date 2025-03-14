import React from 'react';
import { DateRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const pastYear = new Date();
  pastYear.setFullYear(pastYear.getFullYear() - 1);
  const past6days = new Date();
  past6days.setDate(past6days.getDate() - 6);
  const past13days = new Date();
  past13days.setDate(past13days.getDate() - 13);

  const periods = [
    { children: 'Last 7 days', value: [past6days, new Date()] },
    { children: 'Last 14 days', value: [past13days, new Date()] },
    { children: 'Last Year', value: [pastYear, new Date()] },
  ];
  return (
    <Flex gap={5} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='customized-periods'>
          Customized periods
        </Text>
        <DateRangePicker periods={periods}>
          <DateRangePicker.Trigger mt={2} id='customized-periods' />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='normal-periods'>
          Normal periods
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger mt={2} id='normal-periods' />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
