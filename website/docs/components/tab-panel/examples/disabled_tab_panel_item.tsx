import React from 'react';
import TabPanel from 'intergalactic/tab-panel';
import { Hint } from 'intergalactic/tooltip';

const Demo = () => {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <TabPanel value={value} onChange={setValue} aria-label='Social network reports'>
        <TabPanel.Item
          value={1}
          aria-controls={value === 1 ? 'tab-panel-2-1' : undefined}
          id='tab-label-2-1'
        >
          <TabPanel.Item.Text>Normal tab</TabPanel.Item.Text>
        </TabPanel.Item>
        <Hint
          title='Do not forget to add short text to explain why this item is disabled.'
          placement='top'
          role='tab'
        >
          <TabPanel.Item value={2} disabled role={'button'} use:aria-selected={undefined}>
            <TabPanel.Item.Text>Disabled tab</TabPanel.Item.Text>
          </TabPanel.Item>
        </Hint>
      </TabPanel>
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
