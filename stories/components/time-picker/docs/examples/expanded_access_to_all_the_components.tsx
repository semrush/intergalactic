import { Box } from '@semcore/ui/base-components';
import TimePicker from '@semcore/ui/time-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Text id='time-picker-label' size={200}>
        Start time
      </Text>
      <Box mt={2}>
        <TimePicker is12Hour aria-labelledby='time-picker-label'>
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
