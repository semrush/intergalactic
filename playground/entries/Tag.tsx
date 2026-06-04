import EditM from '@semcore/icon/Edit/m';
import type { NSTag } from '@semcore/ui/tag';
import { TagContainer } from '@semcore/ui/tag';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

const Addons = ['none', 'Icon', 'Circle'] as const;

type AdditionalJSXProps = {
  addon: (typeof Addons)[number];
  closeIcon: boolean;
};
export type TagJSXProps = JSXProps<NSTag.Props> & AdditionalJSXProps;

function getJSX(props: TagJSXProps) {
  return (
    <TagContainer
      interactive={props.interactive}
      theme={props.theme}
      size={props.size}
      disabled={props.disabled}
      {...(props.color && { color: props.color })}
    >
      <TagContainer.Tag active={props.active}>
        {props.addon === 'Circle' && (
          <TagContainer.Tag.Circle>
            <img src='https://picsum.photos/id/1025/28/28' />
          </TagContainer.Tag.Circle>
        )}
        {props.addon === 'Icon' && (
          <TagContainer.Tag.Addon>
            <EditM />
          </TagContainer.Tag.Addon>
        )}
        <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
      </TagContainer.Tag>
      {props.closeIcon && <TagContainer.Close />}
    </TagContainer>
  );
}

const entry: PlaygroundEntry<TagJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'inline-radio',
      value: 'l',
      options: ['m', 'l', 'xl'],
      displayName: 'Size',
    },
    theme: {
      type: 'select',
      value: 'primary',
      options: ['primary', 'secondary', 'additional'],
      displayName: 'Theme',
    },
    color: {
      type: 'select',
      value: 'gray-500',
      options: [
        'gray-500',
        'blue-500',
        'green-500',
        'salad-500',
        'orange-500',
        'yellow-500',
        'red-500',
        'pink-500',
        'violet-500',
      ],
      displayName: 'Color',
      colorOptions: {
        withIntergalacticPrefix: false,
      },
      visibleIf: [{ dependsOn: 'theme', equals: 'primary' }],
    },
    interactive: {
      type: 'boolean',
      value: false,
      displayName: 'Interactive',
    },
    active: {
      type: 'boolean',
      value: false,
      displayName: 'Active',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
    addon: {
      type: 'select',
      value: 'none',
      options: [...Addons],
      displayName: 'Addon',
    },
    closeIcon: {
      type: 'boolean',
      value: false,
      displayName: 'Close Button',
      visibleIf: [{ dependsOn: 'theme', notEquals: 'additional' }],
    },
  },
  link: createGithubLink('tag'),
};

export default entry;
