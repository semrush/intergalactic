import React from 'react';
import { DatePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const today = new Date();
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='disabled-dates-example-picker'>
        Date picker
      </Text>
      <DatePicker
        disabled={[new Date(today.getFullYear(), 0, 1), [today, false], '* * 6,7']}
        disabledErrorText='January 1 of this year is off-limits, only dates before today work, and Saturdays are a no-go.'
      >
        <DatePicker.Trigger mt={2} id='disabled-dates-example-picker' />
        <DatePicker.Popper />
      </DatePicker>
    </Flex>
  );
};

export default Demo;
