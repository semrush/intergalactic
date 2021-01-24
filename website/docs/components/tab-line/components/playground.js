import React from 'react';
import TabLine from '@semcore/tab-line';
import Badge from '@semcore/badge';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio } = createGroupWidgets('TabLine');

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['m', 'l', 'xl'],
    });

    const underlined = bool({
      key: 'underlined',
      defaultValue: true,
      label: 'Underlined',
    });

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
      <TabLine defaultValue={0} underlined={underlined} size={size}>
        <TabLine.Item value={0}>All</TabLine.Item>
        <TabLine.Item value={1}>Overview</TabLine.Item>
        <TabLine.Item value={2}>Issues</TabLine.Item>
        <TabLine.Item disabled={disabled} value={3}>
          Progress
        </TabLine.Item>
        <TabLine.Item value={4}>
          {addon
            ? [
                <TabLine.Item.Text key={1}>Statistics</TabLine.Item.Text>,
                <TabLine.Item.Addon key={2}>
                  <Badge bg="green">new</Badge>
                </TabLine.Item.Addon>,
              ]
            : 'Statistics'}
        </TabLine.Item>
      </TabLine>
    );
  },
  {
    filterProps: ['defaultValue'],
  },
);
