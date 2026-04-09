import type { InputValueProps } from '@semcore/ui/input';
import InputTags from '@semcore/ui/input-tags';
import type { InputTagsProps } from '@semcore/ui/input-tags';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';
import renderIcon from '../utils/renderIcon';

type AdditionalJSXProps = {
  tagProps: {
    editable: boolean;
    circle: boolean;
    before: boolean;
    closable: boolean;
  };
};
export type InputTagsJSXProps = JSXProps<InputTagsProps & InputValueProps> & AdditionalJSXProps;

function getJSX(props: InputTagsJSXProps) {
  return (
    <InputTags size={props.size} state={props.state}>
      <InputTags.Tag editable={props.tagProps.editable}>
        <InputTags.Tag.Text>
          {props.tagProps.circle && <InputTags.Tag.Circle style={{ background: '#2595e4' }} />}
          {props.tagProps.before && <InputTags.Tag.Addon>{renderIcon('before', props.size)}</InputTags.Tag.Addon>}
          {props.tagProps.circle || props.tagProps.before
            ? (
                <InputTags.Tag.Text.Content>Tag 1</InputTags.Tag.Text.Content>
              )
            : (
                'Tag 1'
              )}
        </InputTags.Tag.Text>
        {props.tagProps.closable && <InputTags.Tag.Close />}
      </InputTags.Tag>
      <InputTags.Value readOnly={props.readOnly} aria-label='InputTags example' />
    </InputTags>
  );
}

const entry: PlaygroundEntry<InputTagsJSXProps> = {
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
    readOnly: {
      type: 'boolean',
      value: false,
      displayName: 'Read-only',
    },
    tagProps: {
      type: 'group',
      groupName: 'Tag props',
      controls: {
        circle: {
          type: 'boolean',
          value: false,
          displayName: 'Circle',
        },
        closable: {
          type: 'boolean',
          value: false,
          displayName: 'Close',
        },
        editable: {
          type: 'boolean',
          value: false,
          displayName: 'Editable',
        },
        before: {
          type: 'boolean',
          value: false,
          displayName: 'Addon',
        },
      },
    },
  },
  link: createGithubLink('input-tags'),
};

export default entry;
