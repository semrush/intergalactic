import React from 'react';
import TabLine from 'intergalactic/tab-line';
import { Hint } from 'intergalactic/tooltip';

const Demo = () => {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <TabLine value={value} onChange={setValue}>
        <TabLine.Item value={1} aria-controls='tab-panel-1'>
          <TabLine.Item.Text>Normal tab</TabLine.Item.Text>
        </TabLine.Item>
        <Hint
          title='Do not forget to add short text to explain why this item is disabled.'
          placement='top'
          role='tab'
        >
          <TabLine.Item value={2} disabled>
            <TabLine.Item.Text>Disabled tab</TabLine.Item.Text>
          </TabLine.Item>
        </Hint>
      </TabLine>
      {
        [
          <div id='tab-panel-1' role='tabpanel' aria-labelledby='tab-label-1' tabIndex={-1}>
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
