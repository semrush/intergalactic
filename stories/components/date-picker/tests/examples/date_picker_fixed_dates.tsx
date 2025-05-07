import React from 'react';
import { DatePicker, DateRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const today = new Date('2020-06-29'); 
  
  const lastTwoMonthsStart = new Date('2020-04-01');  
  const lastTwoMonthsEnd = new Date('2020-06-01');   
  const fixedRange = [lastTwoMonthsStart, lastTwoMonthsEnd]; 

  const [value, setValue] = React.useState(today); 
  const [valueRange, setValueRange] = React.useState(fixedRange); 

  return (
    <Flex gap={5} flexWrap>
      <Flex direction="column">
        <Text tag="label" size={200} htmlFor="simple-date-picker">
          Simple date picker (Today)
        </Text>
        <DatePicker value={value} onChange={(date: any) => setValue(date)}>
          <DatePicker.Trigger mt={2} id="simple-date-picker" />
          <DatePicker.Popper />
        </DatePicker>
      </Flex>
      <Flex direction="column">
        <Text tag="label" size={200} htmlFor="simple-date-range-picker">
          Date range picker (Last 2 months)
        </Text>
        <DateRangePicker value={valueRange} onChange={(date: any) => setValueRange(date)}>
          <DateRangePicker.Trigger mt={2} id="simple-date-range-picker" />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
