import React from 'react';
import { DateRangePicker } from '@semcore/date-picker';
import { Flex, Box } from '@semcore/flex-box';
import Divider from '@semcore/divider';

function Demo() {
  return (
    <DateRangePicker>
      <DateRangePicker.Trigger />
      <DateRangePicker.Popper>
        <Flex>
          <Box mr={2}>
            <DateRangePicker.Header>
              <DateRangePicker.Prev />
              <DateRangePicker.Title />
            </DateRangePicker.Header>
            <DateRangePicker.Calendar />
          </Box>
          <Box ml={2}>
            <DateRangePicker.Header>
              <DateRangePicker.Title />
              <DateRangePicker.Next />
            </DateRangePicker.Header>
            <DateRangePicker.Calendar />
          </Box>
          <Divider m="-16px 16px" orientation="vertical" h="auto" />
          <Flex direction="column">
            <DateRangePicker.Period />
            <Flex mt="auto">
              <DateRangePicker.Apply />
              <DateRangePicker.Reset ml={2} />
            </Flex>
          </Flex>
        </Flex>
      </DateRangePicker.Popper>
    </DateRangePicker>
  );
}

export default Demo;
