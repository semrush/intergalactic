import React, { useState } from 'react';
import { MonthPicker, MonthRangePicker } from '@semcore/ui/date-picker';
import { Box, Flex } from '@semcore/ui/flex-box';

function Demo() {
  const [value, setValue] = useState(new Date());
  const [valueRange, setValueRange] = useState([]);

  return (
    <Flex>
      <Box>
        <MonthPicker value={value} onChange={(date) => setValue(date)}>
          <MonthPicker.InputTrigger />
          <MonthPicker.Popper />
        </MonthPicker>
      </Box>
      <Box ml={5}>
        <MonthRangePicker value={valueRange} onChange={(date) => setValueRange(date)}>
          <MonthRangePicker.InputTrigger />
          <MonthRangePicker.Popper />
        </MonthRangePicker>
      </Box>
    </Flex>
  );
}

export default Demo;
