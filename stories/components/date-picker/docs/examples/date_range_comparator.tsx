import { Flex } from '@semcore/ui/base-components';
import { DateRangeComparator, MonthDateRangeComparator } from '@semcore/ui/date-picker';
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
