import React from 'react';
import TabLine from '@semcore/tab-line';
import Tooltip from '@semcore/tooltip';

const Demo = () => {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <TabLine value={value} onChange={setValue} aria-label='Social network reports'>
        <TabLine.Item
          value={1}
          aria-controls={value === 1 ? 'tab-panel-2-1' : undefined}
          id='tab-label-2-1'
        >
          <TabLine.Item.Text>Normal tab</TabLine.Item.Text>
        </TabLine.Item>
        <Tooltip
          title='Do not forget to add short text to explain why this item is disabled.'
          placement='top'
          role='tab'
        >
          <TabLine.Item value={2} disabled>
            <TabLine.Item.Text>Disabled tab</TabLine.Item.Text>
          </TabLine.Item>
        </Tooltip>
      </TabLine>
      {
        [
          <div id='tab-panel-2-1' role='tabpanel' aria-labelledby='tab-label-2-1' tabIndex={-1}>
            <h3>Normal tab</h3>
            <p>
              Here you can place your content, or just leave it blank for that avant-garde
              minimalist vibe.
            </p>
          </div>,
        ][value - 1]
      }
    </>
  );
};

export default Demo;
