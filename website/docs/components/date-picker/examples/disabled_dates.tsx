import React from 'react';
import { DatePicker } from 'intergalactic/date-picker';

const Demo = () => {
  const today = new Date();
  return (
    <DatePicker
      disabled={[new Date(today.getFullYear(), 0, 1), [today, false], '* * 6,7']}
      disabledErrorText='January 1 of this year is off-limits, only dates before today work, and Saturdays are a no-go.'
    >
      <DatePicker.Trigger />
      <DatePicker.Popper />
    </DatePicker>
  );
};

export default Demo;
