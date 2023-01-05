import React from 'react';

import {
  DatePicker,
  DateRangePicker,
  MonthPicker,
  MonthRangePicker,
} from '@semcore/ui/date-picker';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const d = new Date();

const TYPES = ['date', 'date-range', 'month', 'month-range'];

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { empty, onChange, select } = createGroupWidgets('Picker');

    const value = empty({
      key: 'value',
      defaultValue: d,
    });

    const valueRange = empty({
      key: 'valueRange',
      defaultValue: [d, d.setDate(d.getDate() + 7)],
    });

    const type = select({
      key: 'type',
      defaultValue: 'date',
      label: 'Type',
      options: TYPES.map((value) => ({
        name: value,
        value,
      })),
    });

    return (
      <>
        {type === 'date' && (
          <DatePicker value={value} onChange={(value) => onChange('value', value)}>
            <DatePicker.InputTrigger />
            <DatePicker.Popper />
          </DatePicker>
        )}
        {type === 'date-range' && (
          <DateRangePicker value={valueRange} onChange={(value) => onChange('valueRange', value)}>
            <DateRangePicker.InputTrigger />
            <DateRangePicker.Popper />
          </DateRangePicker>
        )}
        {type === 'month' && (
          <MonthPicker value={value} onChange={(value) => onChange('value', value)}>
            <MonthPicker.InputTrigger />
            <MonthPicker.Popper />
          </MonthPicker>
        )}
        {type === 'month-range' && (
          <MonthRangePicker value={valueRange} onChange={(value) => onChange('valueRange', value)}>
            <MonthRangePicker.InputTrigger />
            <MonthRangePicker.Popper />
          </MonthRangePicker>
        )}
      </>
    );
  },
  {
    filterProps: ['onChange', 'value', 'valueRange'],
  },
);
