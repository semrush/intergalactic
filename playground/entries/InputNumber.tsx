import type { NSInputNumber } from '@semcore/ui/input-number';
import InputNumber from '@semcore/ui/input-number';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type InputNumberJSXProps = JSXProps<
  NSInputNumber.Props &
  NSInputNumber.Value.Props &
  NSInputNumber.Controls.Props
>;

function getJSX(props: InputNumberJSXProps) {
  return (
    <InputNumber size={props.size} state={props.state}>
      <InputNumber.Value
        min={props.min !== undefined ? Number(props.min) : undefined}
        max={props.max !== undefined ? Number(props.max) : undefined}
        step={Number(props.step)}
        disabled={props.disabled}
        aria-label='InputNumber example'
      />
      <InputNumber.Controls showControls={props.showControls} />
    </InputNumber>
  );
}

const entry: PlaygroundEntry<InputNumberJSXProps> = {
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
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
    min: {
      type: 'text-number',
      value: 0,
      displayName: 'Min',
    },
    max: {
      type: 'text-number',
      value: 100000,
      displayName: 'Max',
    },
    step: {
      type: 'text-number',
      value: 1,
      displayName: 'Step',
    },
    showControls: {
      type: 'boolean',
      value: false,
      displayName: 'Show Controls',
    },
  },
  link: createGithubLink('input-number'),
};

export default entry;
