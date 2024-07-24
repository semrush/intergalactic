import React from 'react';
import TimePicker from 'intergalactic/time-picker';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <>
      <Text tag='label' htmlFor='time-picker' size={200}>
        Start time
      </Text>
      <Box mt={2}>
        <TimePicker is12Hour id='time-picker'>
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
