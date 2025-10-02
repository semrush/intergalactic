import { Flex } from '@semcore/ui/base-components';
import { MonthPicker, MonthRangePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState(new Date());
  const [valueRange, setValueRange] = React.useState([]);

  return (
    <Flex gap={5} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker
        </Text>
        <MonthPicker value={value} onChange={(date: any) => setValue(date)}>
          <MonthPicker.Trigger mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>
      </Flex>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-month-range-picker'>
          Month range picker
        </Text>
        <MonthRangePicker value={valueRange} onChange={(date: any) => setValueRange(date)}>
          <MonthRangePicker.Trigger mt={2} id='simple-month-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
