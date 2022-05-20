import React from 'react';
import { DatePicker } from '@semcore/date-picker';

function Demo() {
  return (
    <DatePicker>
      <DatePicker.Trigger size="l" />
      <DatePicker.Popper />
    </DatePicker>
  );
}

export default Demo;
