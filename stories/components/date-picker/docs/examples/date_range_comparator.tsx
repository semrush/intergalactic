import React from 'react';
import { DateRangeComparator, MonthDateRangeComparator } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex gap={4} flexWrap>
      <DateRangeComparator />
      <MonthDateRangeComparator />
    </Flex>
  );
};

export default Demo;
