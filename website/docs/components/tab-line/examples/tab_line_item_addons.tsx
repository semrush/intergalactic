import React from 'react';
import TabLine from 'intergalactic/tab-line';
import FacebookM from 'intergalactic/icon/Facebook/m';
import InstagramM from 'intergalactic/icon/Instagram/m';
import TwitterM from 'intergalactic/icon/Twitter/m';
import Badge from 'intergalactic/badge';

const Demo = () => {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <TabLine value={value} onChange={setValue} aria-label='Social network reports'>
        <TabLine.Item value={1} aria-controls='tab-panel-1'>
          <TabLine.Item.Addon>
            <FacebookM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Facebook</TabLine.Item.Text>
        </TabLine.Item>
        <TabLine.Item value={2} aria-controls='tab-panel-2'>
          <TabLine.Item.Addon>
            <InstagramM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Instagram</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Badge bg='green-400'>new</Badge>
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item value={3} aria-controls='tab-panel-3'>
          <TabLine.Item.Addon>
            <TwitterM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Twitter</TabLine.Item.Text>
        </TabLine.Item>
      </TabLine>
      {
        [
          <div id='tab-panel-1' role='tabpanel' aria-labelledby='tab-label-1' tabIndex={-1}>
            <h3>Facebook</h3>
            <p>
              It's where your aunt's cat has more followers than you, and your high school nemesis
              still thinks they're relevant.
            </p>
          </div>,
          <div
            id='tab-panel-2'
            aria-hidden='true'
            role='tabpanel'
            aria-labelledby='tab-label-2'
            tabIndex={-1}
          >
            <h3>Instagram</h3>
            <p>
              It's where people spend hours perfecting their avocado toast just for a 'like', and
              your explore page thinks you need therapy based on your search history.
            </p>
          </div>,
          <div
            id='tab-panel-3'
            aria-hidden='true'
            role='tabpanel'
            aria-labelledby='tab-label-3'
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
