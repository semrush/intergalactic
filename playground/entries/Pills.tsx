import type { NSPills } from '@semcore/ui/pills';
import Pills from '@semcore/ui/pills';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';
import renderIcon from '../utils/renderIcon';

type AdditionalJSXProps = {
  before: boolean;
  after: boolean;
};
export type PillsJSXProps = JSXProps<NSPills.Props> & AdditionalJSXProps;

function getJSX(props: PillsJSXProps) {
  return (
    <Pills size={props.size} aria-label='Pills example' defaultValue={1} behavior={props.behavior}>
      <Pills.Item value={1}>
        {props.before && <Pills.Item.Addon>{renderIcon('before', props.size)}</Pills.Item.Addon>}
        <Pills.Item.Text>Pill 1</Pills.Item.Text>
        {props.after && <Pills.Item.Addon>{renderIcon('after', props.size)}</Pills.Item.Addon>}
      </Pills.Item>
      <Pills.Item value={2} disabled={props.disabled}>
        Pill 2
      </Pills.Item>
      <Pills.Item value={3}>Pill 3</Pills.Item>
    </Pills>
  );
}

const entry: PlaygroundEntry<PillsJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    behavior: {
      type: 'select',
      value: 'auto',
      options: ['auto', 'manual'],
      displayName: 'Behavior',
    },
    size: {
      type: 'inline-radio',
      value: 'm',
      options: ['m', 'l'],
      displayName: 'Size',
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
  },
  link: createGithubLink('pills'),
};

export default entry;
