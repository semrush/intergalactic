import React from 'react';
import { MonthPicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker
        </Text>
        <MonthPicker>
          <MonthPicker.Trigger mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>

        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker disabled
        </Text>
        <MonthPicker>
          <MonthPicker.Trigger disabled mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>

        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month  size in picker
        </Text>
        <MonthPicker size="l">
          <MonthPicker.Trigger  mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>

        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker L
        </Text>
        <MonthPicker>
          <MonthPicker.Trigger size='l' mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>

        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker placeholder
        </Text>
        <MonthPicker>
          <MonthPicker.Trigger  placeholder='123' mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>

        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker invalid
        </Text>
        <MonthPicker>
          <MonthPicker.Trigger  state = 'invalid' size='l' mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>


        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker valid
        </Text>
        <MonthPicker>
          <MonthPicker.Trigger  state = 'valid' mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>

        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker invalid disabled
        </Text>
        <MonthPicker>
          <MonthPicker.Trigger  disabled state = 'invalid' size='l' mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>


    </Flex>

    



  );
};

export default Demo;
