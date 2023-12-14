import React from 'react';
import { MonthPicker, MonthRangePicker } from '@semcore/ui/date-picker';
import { Box, Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState(new Date());
  const [valueRange, setValueRange] = React.useState([]);

  return (
    <Flex>
      <Box>
        <MonthPicker value={value} onChange={(date) => setValue(date)}>
          <MonthPicker.Trigger />
          <MonthPicker.Popper />
        </MonthPicker>
      </Box>
      <Box ml={5}>
        <MonthRangePicker value={valueRange} onChange={(date) => setValueRange(date)}>
          <MonthRangePicker.Trigger />
          <MonthRangePicker.Popper />
        </MonthRangePicker>
      </Box>
    </Flex>
  );
};

export default Demo;
