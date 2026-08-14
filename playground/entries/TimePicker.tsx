import type { NSTimePicker } from '@semcore/ui/time-picker';
import Timepicker from '@semcore/ui/time-picker';
import React, { useState } from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type TimePickerJSXProps = JSXProps<NSTimePicker.Props>;

const d = new Date();

function getJSX(props: TimePickerJSXProps) {
  const [value, setValue] = useState(`${d.getHours()}:${d.getMinutes()}`);

  return (
    <Timepicker
      aria-label='TimePicker example'
      size={props.size}
      state={props.state}
      disabled={props.disabled}
      is12Hour={props.is12Hour}
      value={value}
      onChange={setValue}
    />
  );
}

const entry: PlaygroundEntry<TimePickerJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'inline-radio',
      value: 'm',
      options: ['m', 'l'],
      displayName: 'Size',
    },
    state: {
      type: 'select',
      value: 'normal',
      options: ['normal', 'invalid', 'valid'],
      displayName: 'State',
    },
    is12Hour: {
      type: 'boolean',
      value: false,
      displayName: '12-hour format',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
  },
  link: createGithubLink('time-picker'),
  filterProps: ['value', 'onChange'],
};

export default entry;
