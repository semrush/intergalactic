import ArrowRightM from '@semcore/icon/ArrowRight/m';
import CheckM from '@semcore/icon/Check/m';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import type { InputProps } from '@semcore/ui/input';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = {
  before: boolean;
  after: boolean;
  readOnly: boolean;
};
export type InputJSXProps = JSXProps<InputProps> & AdditionalJSXProps;

function getJSX(props: InputJSXProps) {
  return (
    <Input size={props.size} state={props.state} disabled={props.disabled}>
      {props.before && (
        <Input.Addon>
          <CheckM />
        </Input.Addon>
      )}
      <Input.Value
        readOnly={props.readOnly}
        placeholder='Placeholder'
        aria-label='Input example'
      />
      {props.after && (
        <Input.Addon>
          <ButtonLink use='secondary' disabled={props.disabled}>
            <ButtonLink.Addon>
              <ArrowRightM />
            </ButtonLink.Addon>
          </ButtonLink>
        </Input.Addon>
      )}
    </Input>
  );
}

const entry: PlaygroundEntry<InputJSXProps> = {
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
    before: {
      type: 'boolean',
      value: false,
      displayName: 'Addon left',
    },
    after: {
      type: 'boolean',
      value: false,
      displayName: 'Addon right',
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
  link: createGithubLink('input'),
};

export default entry;
