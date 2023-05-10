import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';

const Demo = () => {
  return (
    <DatePicker>
      <DatePicker.InputTrigger>
        <DatePicker.InputTrigger.SingleDateInput>
          <DatePicker.InputTrigger.SingleDateInput.Indicator />
          <DatePicker.InputTrigger.SingleDateInput.MaskedInput />
        </DatePicker.InputTrigger.SingleDateInput>
      </DatePicker.InputTrigger>
      <DatePicker.Popper />
    </DatePicker>
  );
};

export default Demo;
