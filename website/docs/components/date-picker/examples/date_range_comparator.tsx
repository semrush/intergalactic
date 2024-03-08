import React from 'react';
import { DateRangeComparator, MonthDateRangeComparator } from 'intergalactic/date-picker';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex gap={4} flexWrap>
      <DateRangeComparator />
      <MonthDateRangeComparator />
    </Flex>
  );
};

export default Demo;
