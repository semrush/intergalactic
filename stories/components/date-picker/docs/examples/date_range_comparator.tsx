import { Flex } from '@semcore/base-components';
import { DateRangeComparator, MonthDateRangeComparator } from '@semcore/date-picker';
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
