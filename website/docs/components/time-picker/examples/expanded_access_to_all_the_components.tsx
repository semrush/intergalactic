import React from 'react';
import TimePicker from 'intergalactic/time-picker';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <>
      <Text tag='label' htmlFor='time-picker-hours' size={200}>
        Your time
      </Text>
      <Box mt={2}>
        <TimePicker is12Hour>
          <TimePicker.Hours id='time-picker-hours' />
          <TimePicker.Separator />
          <TimePicker.Minutes />
          <TimePicker.Format />
        </TimePicker>
      </Box>
    </>
  );
};

export default Demo;
