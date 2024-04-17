import React from 'react';
import { MonthPicker, MonthRangePicker } from 'intergalactic/date-picker';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  const [value, setValue] = React.useState(new Date());
  const [valueRange, setValueRange] = React.useState([]);

  return (
    <Flex gap={5} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-month-picker'>
          Simple month picker
        </Text>
        <MonthPicker value={value} onChange={(date) => setValue(date)}>
          <MonthPicker.Trigger mt={2} id='simple-month-picker' />
          <MonthPicker.Popper />
        </MonthPicker>
      </Flex>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Month range picker
        </Text>
        <MonthRangePicker value={valueRange} onChange={(date) => setValueRange(date)}>
          <MonthRangePicker.Trigger mt={2} id='simple-date-range-picker' />
          <MonthRangePicker.Popper />
        </MonthRangePicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
