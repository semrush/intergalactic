import React from 'react';
import { DatePicker, DateRangePicker } from 'intergalactic/date-picker';
import { Box, Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState(new Date('06/29/2020'));
  const [valueRange, setValueRange] = React.useState([]);

  return (
    <Flex>
      <Box>
        <DatePicker value={value} onChange={(date) => setValue(date)}>
          <DatePicker.Trigger />
          <DatePicker.Popper />
        </DatePicker>
      </Box>
      <Box ml={5}>
        <DateRangePicker value={valueRange} onChange={(date) => setValueRange(date)}>
          <DateRangePicker.Trigger />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Box>
    </Flex>
  );
};

export default Demo;
