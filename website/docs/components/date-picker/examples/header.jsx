import React from 'react';
import { DatePicker } from '@semcore/date-picker';
import Tooltip from '@semcore/tooltip';

function Demo() {
  return (
    <DatePicker>
      <DatePicker.Trigger />
      <DatePicker.Popper>
        <DatePicker.Header>
          <Tooltip title="Click for display previous month">
            <DatePicker.Prev />
          </Tooltip>
          <DatePicker.Title>
            {({ displayedPeriod }) =>
              new Intl.DateTimeFormat('en-US', {
                month: 'short',
                year: 'numeric',
              }).format(displayedPeriod)
            }
          </DatePicker.Title>
          <Tooltip title="Click for display next month">
            <DatePicker.Next />
          </Tooltip>
        </DatePicker.Header>
        <DatePicker.Calendar />
      </DatePicker.Popper>
    </DatePicker>
  );
}

export default Demo;
