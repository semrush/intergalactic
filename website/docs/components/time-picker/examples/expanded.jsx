import React from 'react';
import TimePicker from '@semcore/ui/time-picker';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Text tag="div" id="timePickerLabel" size="300">
        Your password
      </Text>
      <Box mt={2}>
        <TimePicker is12Hour aria-labelledby="timePickerLabel">
          <TimePicker.Hours />
          <TimePicker.Separator />
          <TimePicker.Minutes />
          <TimePicker.Format />
        </TimePicker>
      </Box>
    </>
  );
};

export default Demo;
