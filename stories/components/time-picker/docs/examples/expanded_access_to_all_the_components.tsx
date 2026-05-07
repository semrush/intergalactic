import { Flex } from '@semcore/ui/flex-box';
import TimePicker from '@semcore/ui/time-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={2} alignItems='flex-start'>
      <Text tag='label' htmlFor='time-picker' size={200}>
        Start time
      </Text>
      <TimePicker is12Hour id='time-picker'>
        <TimePicker.Hours />
        <TimePicker.Separator />
        <TimePicker.Minutes />
        <TimePicker.Format />
      </TimePicker>
    </Flex>
  );
};

export default Demo;
