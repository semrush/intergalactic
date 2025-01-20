import React from 'react';
import { DatePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2}>
          <DatePicker.Trigger.SingleDateInput>
            <DatePicker.Trigger.SingleDateInput.Indicator />
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>
    </Flex>
  );
};

export default Demo;
