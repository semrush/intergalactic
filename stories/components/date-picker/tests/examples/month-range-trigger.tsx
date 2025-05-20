import React from 'react';
import { MonthRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Flex direction='column'>
       <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          month range picker
        </Text>
        <MonthRangePicker>
          <MonthRangePicker.Trigger mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>

        <Text tag='label' size={200} htmlFor='simple-month-range-picker'>
          month range picker disabled
        </Text>
        <MonthRangePicker>
          <MonthRangePicker.Trigger disabled mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>

        <Text tag='label' size={200} htmlFor='simple-month-range-picker'>
          month range picker L
        </Text>
        <MonthRangePicker>
          <MonthRangePicker.Trigger size='l' mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>

        <Text tag='label' size={200} htmlFor='simple-month-range-picker'>
          month range picker placeholder
        </Text>
        <MonthRangePicker>
          <MonthRangePicker.Trigger placeholder='123' mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>


        <Text tag='label' size={200} htmlFor='simple-month-range-picker'>
          month range picker invalid state
        </Text>
        <MonthRangePicker>
          <MonthRangePicker.Trigger state = 'invalid' size='l' mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>

        <Text tag='label' size={200} htmlFor='simple-month-range-picker'>
          month range picker invalid state
        </Text>
        <MonthRangePicker>
          <MonthRangePicker.Trigger state = 'valid' size='l' mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>


        <Text tag='label' size={200} htmlFor='simple-month-range-picker'>
          month range picker invalid state
        </Text>
        <MonthRangePicker>
          <MonthRangePicker.Trigger state = 'valid' size='l' mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>

    </Flex>

    



  );
};

export default Demo;
