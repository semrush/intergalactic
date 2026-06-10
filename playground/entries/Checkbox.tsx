import type { NSCheckbox } from '@semcore/ui/checkbox';
import Checkbox from '@semcore/ui/checkbox';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type CheckboxJSXProps = JSXProps<NSCheckbox.Props>;

function getJSX({ handleControlChange, ...checkboxProps }: CheckboxJSXProps) {
  return <Checkbox {...checkboxProps} onChange={((value) => handleControlChange?.('checked', value))} />;
}

const entry: PlaygroundEntry<CheckboxJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'inline-radio',
      value: 'm',
      options: ['m', 'l'],
      displayName: 'Size',
    },
    checked: {
      type: 'boolean',
      value: false,
      displayName: 'Checked',
    },
    indeterminate: {
      type: 'boolean',
      value: false,
      displayName: 'Indeterminate',
    },
    state: {
      type: 'select',
      value: 'normal',
      options: ['normal', 'invalid'],
      displayName: 'State',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
    label: {
      type: 'text',
      value: 'Label text',
      displayName: 'Label',
    },
  },
  link: createGithubLink('checkbox'),
  filterProps: ['onChange'],
};

export default entry;
