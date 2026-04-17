import type { NSRadio } from '@semcore/ui/radio';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type RadioJSXProps = JSXProps<NSRadio.Props & NSRadio.Group.Props>;

function getJSX(props: RadioJSXProps) {
  return (
    <RadioGroup size={props.size} disabled={props.disabled} aria-label='RadioGroup example'>
      <Radio state={props.state} mb={3} value='1' label={`${props.label} 1`} />
      <Radio state={props.state} mb={3} value='2' label={`${props.label} 2`} />
    </RadioGroup>
  );
}

const entry: PlaygroundEntry<RadioJSXProps> = {
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
      value: 'Value',
      displayName: 'Label',
    },
  },
  link: createGithubLink('radio'),
};

export default entry;
