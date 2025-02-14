import React from 'react';
import TabPanel from '@semcore/tab-panel';
import FacebookM from '@semcore/icon/Facebook/m';
import InstagramM from '@semcore/icon/Instagram/m';
import TwitterM from '@semcore/icon/Twitter/m';
import Badge from '@semcore/badge';

const Demo = () => {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <TabPanel value={value} onChange={setValue} aria-label='Social network reports'>
        <TabPanel.Item
          value={1}
          aria-controls={value === 1 ? 'tab-panel-4-1' : undefined}
          id='tab-label-4-1'
        >
          <TabPanel.Item.Addon>
            <FacebookM />
          </TabPanel.Item.Addon>
          <TabPanel.Item.Text>Facebook</TabPanel.Item.Text>
        </TabPanel.Item>
        <TabPanel.Item
          value={2}
          aria-controls={value === 2 ? 'tab-panel-4-2' : undefined}
          id='tab-label-4-2'
        >
          <TabPanel.Item.Addon>
            <InstagramM />
          </TabPanel.Item.Addon>
          <TabPanel.Item.Text>Instagram</TabPanel.Item.Text>
          <TabPanel.Item.Addon>
            <Badge bg='green-400'>new</Badge>
          </TabPanel.Item.Addon>
        </TabPanel.Item>
        <TabPanel.Item
          value={3}
          aria-controls={value === 3 ? 'tab-panel-4-3' : undefined}
          id='tab-label-4-3'
        >
          <TabPanel.Item.Addon>
            <TwitterM />
          </TabPanel.Item.Addon>
          <TabPanel.Item.Text>Twitter</TabPanel.Item.Text>
        </TabPanel.Item>
      </TabPanel>
      {
        [
          <div id='tab-panel-4-1' role='tabpanel' aria-labelledby='tab-label-4-1' tabIndex={-1}>
            <h3>Facebook</h3>
            <p>
              It's where your aunt's cat has more followers than you, and your high school nemesis
              still thinks they're relevant.
            </p>
          </div>,
          <div
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
