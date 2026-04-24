import Badge from '@semcore/ui/badge';
import TabPanel from '@semcore/ui/tab-panel';
import type { NSTabPanel } from '@semcore/ui/tab-panel';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = {
  addon: boolean;
};

export type TabPanelJSXProps = JSXProps<NSTabPanel.Props & NSTabPanel.Item.Props> & AdditionalJSXProps;

function getJSX(props: TabPanelJSXProps) {
  return (
    <TabPanel defaultValue={1} behavior={props.behavior}>
      <TabPanel.Item value={1}>Overview</TabPanel.Item>
      <TabPanel.Item value={2}>Issues</TabPanel.Item>
      <TabPanel.Item disabled={props.disabled} value={3}>
        Progress
      </TabPanel.Item>
      <TabPanel.Item value={4}>
        {props.addon
          ? [
              <TabPanel.Item.Text key={1}>Analytics</TabPanel.Item.Text>,
              <TabPanel.Item.Addon key={2}>
                <Badge bg='bg-primary-success'>new</Badge>
              </TabPanel.Item.Addon>,
            ]
          : 'Analytics'}
      </TabPanel.Item>
    </TabPanel>
  );
}

const entry: PlaygroundEntry<TabPanelJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    behavior: {
      type: 'select',
      value: 'manual',
      options: ['auto', 'manual'],
      displayName: 'Behavior',
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
  link: createGithubLink('tab-panel'),
};

export default entry;
