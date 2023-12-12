import React from 'react';
import { DateRangeComparator, MonthDateRangeComparator } from '@semcore/ui/date-picker';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Flex gap={4} flexWrap>
      <DateRangeComparator />
      <MonthDateRangeComparator />
    </Flex>
  );
};
