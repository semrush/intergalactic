import { Box } from '@semcore/base-components';
import TimePicker from '@semcore/time-picker';
import { Text } from '@semcore/typography';
import React from 'react';

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
