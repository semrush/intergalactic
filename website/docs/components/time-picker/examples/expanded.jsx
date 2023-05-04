import React  from 'react';
import TimePicker from '@semcore/time-picker';
import { Text, Box } from '@semcore/typography';

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
