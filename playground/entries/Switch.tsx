import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import type { NSSwitch } from '@semcore/ui/switch';
import Switch from '@semcore/ui/switch';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = {
  icon: boolean;
  text: string;
};
export type SwitchJSXProps = JSXProps<NSSwitch.Props & NSSwitch.Value.Props> & AdditionalJSXProps;

function getJSX(props: SwitchJSXProps) {
  const { handleControlChange } = props;

  return (
    <Switch theme={props.theme} size={props.size} disabled={props.disabled}>
      <Switch.Value
        checked={props.checked}
        onChange={(value) => handleControlChange?.('checked', value)}
      >
        {props.icon && (props.checked ? <CheckM /> : <CloseM />)}
      </Switch.Value>
      {props.text && <Switch.Addon>{props.text}</Switch.Addon>}
    </Switch>
  );
}

const entry: PlaygroundEntry<SwitchJSXProps> = {
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
      value: 'success',
      options: ['info', 'success'],
      displayName: 'Theme',
    },
    icon: {
      type: 'boolean',
      value: false,
      displayName: 'Icon',
    },
    checked: {
      type: 'boolean',
      value: false,
      displayName: 'Checked',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
    text: {
      type: 'text',
      value: 'Notifications',
      displayName: 'Label',
    },
  },
  link: createGithubLink('switch'),
};

export default entry;
