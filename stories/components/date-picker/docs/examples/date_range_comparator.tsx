import { DateRangeComparator, MonthDateRangeComparator } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={4} flexWrap>
      <DateRangeComparator />
      <MonthDateRangeComparator />
    </Flex>
  );
};

export default Demo;
