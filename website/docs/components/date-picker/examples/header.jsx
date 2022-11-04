import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';

function Demo() {
  return (
    <DatePicker>
      <DatePicker.InputTrigger />
      <DatePicker.Popper>
        <DatePicker.Header>
          <DatePicker.Prev />
          <DatePicker.Title>
            {({ displayedPeriod }) =>
              new Intl.DateTimeFormat('en-US', {
                month: 'short',
                year: 'numeric',
              }).format(displayedPeriod)
            }
          </DatePicker.Title>
          <DatePicker.Next />
        </DatePicker.Header>
        <DatePicker.Calendar />
      </DatePicker.Popper>
    </DatePicker>
  );
}

export default Demo;
