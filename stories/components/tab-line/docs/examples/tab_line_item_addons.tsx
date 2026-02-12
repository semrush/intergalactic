import FacebookM from '@semcore/icon/Facebook/m';
import InstagramM from '@semcore/icon/Instagram/m';
import TwitterM from '@semcore/icon/Twitter/m';
import Badge from '@semcore/ui/badge';
import TabLine from '@semcore/ui/tab-line';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <TabLine value={value} onChange={setValue} aria-label='Social network reports'>
        <TabLine.Item
          value={1}
          aria-controls={value === 1 ? 'tab-panel-4-1' : undefined}
          id='tab-label-4-1'
        >
          <TabLine.Item.Addon>
            <FacebookM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Facebook</TabLine.Item.Text>
        </TabLine.Item>
        <TabLine.Item
          value={2}
          aria-controls={value === 2 ? 'tab-panel-4-2' : undefined}
          id='tab-label-4-2'
        >
          <TabLine.Item.Addon>
            <InstagramM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Instagram</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Badge type='new'>new</Badge>
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          value={3}
          aria-controls={value === 3 ? 'tab-panel-4-3' : undefined}
          id='tab-label-4-3'
        >
          <TabLine.Item.Addon>
            <TwitterM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Twitter</TabLine.Item.Text>
        </TabLine.Item>
      </TabLine>
      {
        [
          <div key='tab-panel-4-1' id='tab-panel-4-1' role='tabpanel' aria-labelledby='tab-label-4-1' tabIndex={-1}>
            <h3>Facebook</h3>
            <p>
              It's where your aunt's cat has more followers than you, and your high school nemesis
              still thinks they're relevant.
            </p>
          </div>,
          <div
            key='tab-panel-4-2'
            id='tab-panel-4-2'
            aria-hidden='true'
            role='tabpanel'
            aria-labelledby='tab-label-4-2'
            tabIndex={-1}
          >
            <h3>Instagram</h3>
            <p>
              It's where people spend hours perfecting their avocado toast just for a 'like', and
              your explore page thinks you need therapy based on your search history.
            </p>
          </div>,
          <div
            key='tab-panel-4-3'
            id='tab-panel-4-3'
            aria-hidden='true'
            role='tabpanel'
            aria-labelledby='tab-label-4-3'
            tabIndex={-1}
          >
            <h3>Twitter</h3>
            <p>
              It's where 280 characters can start a revolution or a feud over pineapple on pizza,
              and your timeline is a mix of breaking news and cat memes.
            </p>
          </div>,
        ][value - 1]
      }
    </>
  );
};

export default Demo;
