import InlineInput from '@semcore/ui/inline-input';
import type { InlineInputProps } from '@semcore/ui/inline-input';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type InlineInputJSXProps = JSXProps<InlineInputProps>;

function getJSX({ handleControlChange, ...inlineInputProps }: InlineInputJSXProps) {
  return (
    <InlineInput {...inlineInputProps}>
      <InlineInput.Value placeholder='Placeholder' aria-label='InlineInput example' />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
}

const entry: PlaygroundEntry<InlineInputJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
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
  },
  link: createGithubLink('inline-input'),
};

export default entry;
