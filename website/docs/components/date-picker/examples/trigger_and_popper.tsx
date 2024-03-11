import React from 'react';
import { DatePicker } from 'intergalactic/date-picker';

const Demo = () => {
  return (
    <DatePicker>
      <DatePicker.Trigger>
        <DatePicker.Trigger.SingleDateInput>
          <DatePicker.Trigger.SingleDateInput.Indicator />
          <DatePicker.Trigger.SingleDateInput.MaskedInput />
        </DatePicker.Trigger.SingleDateInput>
      </DatePicker.Trigger>
      <DatePicker.Popper />
    </DatePicker>
  );
};

export default Demo;
