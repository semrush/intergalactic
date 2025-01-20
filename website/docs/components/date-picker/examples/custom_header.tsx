import React from 'react';
import { DatePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

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
                    }).format(displayedPeriod)
              }
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
