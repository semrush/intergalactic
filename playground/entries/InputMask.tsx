import type { NSInput } from '@semcore/ui/input';
import type { NSInputMask } from '@semcore/ui/input-mask';
import InputMask from '@semcore/ui/input-mask';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type InputMaskJSXProps = JSXProps<NSInput.Props & NSInputMask.Value.Props>;

function getJSX(props: InputMaskJSXProps) {
  return (
    <InputMask size={props.size} state={props.state} w={300}>
      <InputMask.Value
        disabled={props.disabled}
        mask={props.mask}
        placeholder={props.placeholder}
        hideMask={props.hideMask}
        aria-label='InputMask example'
      />
    </InputMask>
  );
}

const entry: PlaygroundEntry<InputMaskJSXProps> = {
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
    hideMask: {
      type: 'boolean',
      value: false,
      displayName: 'Hide mask',
    },
    mask: {
      type: 'text',
      value: '9999 9999 9999 9999',
      displayName: 'Mask',
    },
    placeholder: {
      type: 'text',
      value: '____ ____ ____ ____',
      displayName: 'Placeholder',
    },
  },
  link: createGithubLink('input-mask'),
};

export default entry;
