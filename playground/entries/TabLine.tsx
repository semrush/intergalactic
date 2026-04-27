import Badge from '@semcore/ui/badge';
import type { NSTabLine } from '@semcore/ui/tab-line';
import TabLine from '@semcore/ui/tab-line';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = {
  addon: boolean;
};

export type TabLineJSXProps = JSXProps<NSTabLine.Props & NSTabLine.Item.Props> & AdditionalJSXProps;

function getJSX(props: TabLineJSXProps) {
  return (
    <TabLine defaultValue={0} underlined={props.underlined} size={props.size} behavior={props.behavior}>
      <TabLine.Item value={0}>Overview</TabLine.Item>
      <TabLine.Item value={1}>Issues</TabLine.Item>
      <TabLine.Item disabled={props.disabled} value={2}>
        Progress
      </TabLine.Item>
      <TabLine.Item value={3}>
        {props.addon
          ? [
              <TabLine.Item.Text key={1}>Analytics</TabLine.Item.Text>,
              <TabLine.Item.Addon key={2}>
                <Badge bg='bg-primary-success'>new</Badge>
              </TabLine.Item.Addon>,
            ]
          : 'Analytics'}
      </TabLine.Item>
    </TabLine>
  );
}

const entry: PlaygroundEntry<TabLineJSXProps> = {
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
    underlined: {
      type: 'boolean',
      value: true,
      displayName: 'Underlined',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
    addon: {
      type: 'boolean',
      value: false,
      displayName: 'Addon',
    },
  },
  link: createGithubLink('tab-line'),
};

export default entry;
