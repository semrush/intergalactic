import React from 'react';
import TabPanel from '@semcore/tab-panel';
import Badge from '@semcore/badge';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio } = createGroupWidgets('TabPanel');

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    const addon = bool({
      key: 'addon',
      defaultValue: false,
      label: 'With addon',
    });

    return (
      <TabPanel defaultValue={1}>
        <TabPanel.Item value={1}>Overview</TabPanel.Item>
        <TabPanel.Item value={2}>Issues</TabPanel.Item>
        <TabPanel.Item disabled={disabled} value={3}>
          Progress
        </TabPanel.Item>
        <TabPanel.Item value={4}>
          {addon
            ? [
                <TabPanel.Item.Text key={1}>Statistics</TabPanel.Item.Text>,
                <TabPanel.Item.Addon key={2}>
                  <Badge bg="green">new</Badge>
                </TabPanel.Item.Addon>,
              ]
            : 'Statistics'}
        </TabPanel.Item>
      </TabPanel>
    );
  },
  {
    filterProps: ['defaultValue'],
  },
);
