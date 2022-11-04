import React, { useState } from 'react';
import { DatePicker, DateRangePicker } from '@semcore/ui/date-picker';
import { Box, Flex } from '@semcore/ui/flex-box';

function Demo() {
  const [value, setValue] = useState(new Date('06/29/2020'));
  const [valueRange, setValueRange] = useState([]);

  return (
    <Flex>
      <Box>
        <DatePicker value={value} onChange={(date) => setValue(date)}>
          <DatePicker.InputTrigger />
          <DatePicker.Popper />
        </DatePicker>
      </Box>
      <Box ml={5}>
        <DateRangePicker value={valueRange} onChange={(date) => setValueRange(date)}>
          <DateRangePicker.InputTrigger />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Box>
    </Flex>
  );
}

export default Demo;
