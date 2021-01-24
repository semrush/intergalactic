import React from 'react';

import { DatePicker, DateRangePicker, MonthPicker, MonthRangePicker } from '@semcore/date-picker';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

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
          <DatePicker value={value} onChange={(value) => onChange('value', value)} />
        )}
        {type === 'date-range' && (
          <DateRangePicker value={valueRange} onChange={(value) => onChange('valueRange', value)} />
        )}
        {type === 'month' && (
          <MonthPicker value={value} onChange={(value) => onChange('value', value)} />
        )}
        {type === 'month-range' && (
          <MonthRangePicker
            value={valueRange}
            onChange={(value) => onChange('valueRange', value)}
          />
        )}
      </>
    );
  },
  {
    filterProps: ['onChange', 'value', 'valueRange'],
  },
);
