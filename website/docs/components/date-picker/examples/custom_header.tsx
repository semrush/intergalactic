import React from 'react';
import { DatePicker } from 'intergalactic/date-picker';

const Demo = () => {
  return (
    <DatePicker>
      <DatePicker.Trigger />
      <DatePicker.Popper>
        <DatePicker.Header>
          <DatePicker.Prev />
          <DatePicker.Title>
            {({ displayedPeriod }) =>
              typeof displayedPeriod === 'string'
                ? displayedPeriod
                : new Intl.DateTimeFormat('en-US', {
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
};

export default Demo;
