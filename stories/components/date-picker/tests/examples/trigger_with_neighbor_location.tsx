import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DatePicker, DateRangePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState(undefined);
  const [valueRange, setValueRange] = React.useState([]);

  return (
    <Flex gap={5} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-date-picker'>
          Simple date picker
        </Text>
        <Box>
          <DatePicker value={value} onChange={(date: any) => setValue(date)}>
            <DatePicker.Trigger
              mt={2}
              id='simple-date-picker'
              neighborLocation='right'
            />
            <DatePicker.Popper />
          </DatePicker>
          <Button neighborLocation='left'>Hello</Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Demo;
