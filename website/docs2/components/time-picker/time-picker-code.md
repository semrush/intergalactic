---
title: Example
fileSource: time-picker
tabs: TimePicker('index'), A11y('time-picker-a11y'), API('time-picker-api'), Example('time-picker-code'), Changelog('time-picker-changelog')
---

## Expanded access to all the components

For deeper customization, you can expand the component.

::: sandbox

<script lang="tsx">
import React from 'react';
import TimePicker from '@semcore/ui/time-picker';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Text tag='div' id='timePickerLabel' size={200}>
        Your time
      </Text>
      <Box mt={2} aria-labelledby='timePickerLabel'>
        <TimePicker is12Hour>
          <TimePicker.Hours />
          <TimePicker.Separator />
          <TimePicker.Minutes />
          <TimePicker.Format />
        </TimePicker>
      </Box>
    </>
  );
};
</script>

:::
