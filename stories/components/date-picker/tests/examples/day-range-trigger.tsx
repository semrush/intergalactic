import React from 'react';
import { DateRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Flex direction='column'>
       <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>

        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker disabled
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger disabled mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>

        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker L
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger size='l' mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>

        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker placeholder
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger placeholder='123' mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>


        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker invalid state
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger state = 'invalid' size='l' mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>

        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker invalid state
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger state = 'valid' size='l' mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>


        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker invalid state
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger state = 'valid' size='l' mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>

    </Flex>

    



  );
};

export default Demo;
