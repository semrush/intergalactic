import type { NSTextarea } from '@semcore/ui/textarea';
import Textarea from '@semcore/ui/textarea';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = {
  disabled: boolean;
  readOnly: boolean;
  min: number;
  max: number;
};
export type TextareaJSXProps = JSXProps<NSTextarea.Props> & AdditionalJSXProps;

function getJSX(props: TextareaJSXProps) {
  return (
    <Textarea
      size={props.size}
      resize={props.resize}
      state={props.state}
      disabled={props.disabled}
      readOnly={props.readOnly}
      minRows={props.min}
      maxRows={props.max}
      placeholder='Placeholder'
      aria-label='Textarea example'
    />
  );
}

const entry: PlaygroundEntry<TextareaJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'select',
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
    min: {
      type: 'text-number',
      value: 2,
      min: 1,
      displayName: 'Min rows',
    },
    max: {
      type: 'text-number',
      value: 10,
      min: 1,
      displayName: 'Max rows',
    },
    resize: {
      type: 'select',
      value: 'none',
      options: ['none', 'vertical', 'horizontal', 'both'],
      displayName: 'Resize',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
    readOnly: {
      type: 'boolean',
      value: false,
      displayName: 'Read-only',
    },
  },
  link: createGithubLink('textarea'),
};

export default entry;
