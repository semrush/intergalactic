import React from 'react';
import { DatePicker, DateRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [value, setValue] = React.useState(new Date('06/29/2020'));
  const [valueRange, setValueRange] = React.useState([]);

  return (
    <Flex gap={5} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-date-picker'>
          Simple date picker
        </Text>
        <DatePicker value={value} onChange={(date:any) => setValue(date)}>
          <DatePicker.Trigger mt={2} id='simple-date-picker' />
          <DatePicker.Popper />
        </DatePicker>
      </Flex>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-date-range-picker'>
          Date range picker
        </Text>
        <DateRangePicker value={valueRange} onChange={(date:any) => setValueRange(date)}>
          <DateRangePicker.Trigger mt={2} id='simple-date-range-picker' />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
