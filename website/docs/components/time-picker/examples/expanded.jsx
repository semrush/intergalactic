import React, { useState } from 'react';
import TimePicker from '@semcore/time-picker';

const Demo = () => {
  return (
    <>
      <p id="timePickerLabel" style={{ fontSize: '16px' }}>
        Select time:
      </p>
      <TimePicker is12Hour aria-labelledby="timePickerLabel">
        <TimePicker.Hours />
        <TimePicker.Separator />
        <TimePicker.Minutes />
        <TimePicker.Format />
      </TimePicker>
    </>
  );
};

export default Demo;
