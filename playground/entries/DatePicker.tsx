import { DatePicker, DateRangePicker, MonthPicker, MonthRangePicker } from '@semcore/ui/date-picker';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import type { WithChildComponents } from '../types/WithChildComponents';
import createGithubLink from '../utils/createGHLink';

const PickerType = ['date', 'date-range', 'month', 'month-range'] as const;

export type DatePickerJSXProps = JSXProps<{
  type: typeof PickerType[number];
}>;

const TypeToComponent: { [key in DatePickerJSXProps['type']]: WithChildComponents<'Trigger' | 'Popper'> } = {
  'date': DatePicker,
  'date-range': DateRangePicker,
  'month': MonthPicker,
  'month-range': MonthRangePicker,
};

const value = new Date();
const valueRange = [value, value.setDate(value.getDate() + 7)];

function getJSX({ type }: DatePickerJSXProps) {
  const Component = TypeToComponent[type!];
  const isRangeType = type!.includes('-range');

  return (
    <Component value={isRangeType ? valueRange : value}>
      <Component.Trigger />
      <Component.Popper />
    </Component>
  );
}

const entry: PlaygroundEntry<DatePickerJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    type: {
      type: 'select',
      value: 'date',
      options: [...PickerType],
      displayName: 'Type',
    },
  },
  link: createGithubLink('date-picker'),
  filterProps: ['value'],
};

export default entry;
