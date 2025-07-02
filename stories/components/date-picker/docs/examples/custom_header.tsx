import { Flex } from '@semcore/base-components';
import { DatePicker } from '@semcore/date-picker';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='custom-header-example-picker'>
        Date picker
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} id='custom-header-example-picker' />
        <DatePicker.Popper>
          <DatePicker.Header>
            <DatePicker.Prev />
            <DatePicker.Title>
              {({ displayedPeriod }) =>
                typeof displayedPeriod === 'string'
                  ? displayedPeriod
                  : new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      year: 'numeric',
                    }).format(displayedPeriod)}
            </DatePicker.Title>
            <DatePicker.Next />
          </DatePicker.Header>
          <DatePicker.Calendar />
        </DatePicker.Popper>
      </DatePicker>
    </Flex>
  );
};

export default Demo;
