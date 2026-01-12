import { Flex } from '@semcore/ui/base-components';
import { DateRangePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
        <DateRangePicker.Trigger state='invalid' size='l' mt={2} id='simple-date-range-picker' />
        <DateRangePicker.Popper />
      </DateRangePicker>

      <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
        Date range picker invalid state
      </Text>
      <DateRangePicker>
        <DateRangePicker.Trigger state='valid' size='l' mt={2} id='simple-date-range-picker' />
        <DateRangePicker.Popper />
      </DateRangePicker>

      <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
        Date range picker invalid state
      </Text>
      <DateRangePicker>
        <DateRangePicker.Trigger state='valid' size='l' mt={2} id='simple-date-range-picker' />
        <DateRangePicker.Popper />
      </DateRangePicker>

    </Flex>

  );
};

export default Demo;
