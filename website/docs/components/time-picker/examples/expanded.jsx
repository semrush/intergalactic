import React, { useState } from 'react';
import TimePicker from '@semcore/time-picker';

const Demo = () => {
  return (
    <TimePicker is12Hour>
      <TimePicker.Hours />
      <TimePicker.Separator />
      <TimePicker.Minutes />
      <TimePicker.Format />
    </TimePicker>
  );
};

export default Demo;
