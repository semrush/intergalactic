import FacebookM from '@semcore/icon/Facebook/m';
import InstagramM from '@semcore/icon/Instagram/m';
import TwitterM from '@semcore/icon/Twitter/m';
import Badge from '@semcore/ui/badge';
import type { BoxProps } from '@semcore/ui/base-components';
import Counter from '@semcore/ui/counter';
import TabPanel from '@semcore/ui/tab-panel';
import type { TabPanelProps, TabPanelItemProps } from '@semcore/ui/tab-panel';
import type { TextEllipsisProps } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type TabPanelDefProps = TabPanelProps & BoxProps & TabPanelItemProps & {
  ellipsis?: TextEllipsisProps;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: TabPanelDefProps) => {
  const [value, setValue] = React.useState<string | number | boolean>(2);

  return (
    <>
      <TabPanel
        behavior={props.behavior}
        value={value}
        onChange={(val: any) => setValue(val)}
        aria-label='Social network reports'
      >
        <TabPanel.Item
          w={props.w}
          value='facebook'
          disabled={props.disabled}
          addonLeft={FacebookM}
          aria-controls={value === 'facebook' ? 'tab-panel-fb' : undefined}
          id='tab-label-fb'
        >
          <TabPanel.Item.Text
            ellipsis
            {...props.ellipsis}
            hint={props.hintProps}
            hint:placement={props.hintPlacement}
          >
            Facebook
          </TabPanel.Item.Text>
          <TabPanel.Item.Addon>
            <FacebookM />
          </TabPanel.Item.Addon>
        </TabPanel.Item>
        <TabPanel.Item
          value={2}
          disabled={props.disabled}
          aria-controls={value === 2 ? 'tab-panel-ig' : undefined}
          id='tab-label-ig'
        >
          <TabPanel.Item.Addon>
            <InstagramM />
          </TabPanel.Item.Addon>
          <TabPanel.Item.Text w={props.w} ellipsis {...props.ellipsis}>Instagram Instagram</TabPanel.Item.Text>
          <TabPanel.Item.Addon>
            <Badge type='new'>new</Badge>
          </TabPanel.Item.Addon>
        </TabPanel.Item>
        <TabPanel.Item
          w={props.w}
          value={true}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw' : undefined}
          id='tab-label-tw'
        >
          <TabPanel.Item.Addon>
            <TwitterM />
          </TabPanel.Item.Addon>
          <TabPanel.Item.Text ellipsis {...props.ellipsis}>Twitter</TabPanel.Item.Text>
          <TabPanel.Item.Addon>
            <Text>1</Text>
          </TabPanel.Item.Addon>
        </TabPanel.Item>

        <TabPanel.Item
          w={props.w}
          value={3}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw3' : undefined}
          id='tab-label-tw3'
          addonRight={TwitterM}
        >

          <TabPanel.Item.Text ellipsis {...props.ellipsis}>Twitter3</TabPanel.Item.Text>

        </TabPanel.Item>

        <TabPanel.Item
          w={props.w}
          value={false}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw2' : undefined}
          id='tab-label-tw2'
        >
          <TabPanel.Item.Addon>
            <Counter>32</Counter>
          </TabPanel.Item.Addon>
          <TabPanel.Item.Text ellipsis {...props.ellipsis}>Twitter2</TabPanel.Item.Text>

        </TabPanel.Item>

        <TabPanel.Item
          w={props.w}
          value={4}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw2' : undefined}
          id='tab-label-tw2'
        >

          <TabPanel.Item.Text ellipsis {...props.ellipsis}>Twitter4</TabPanel.Item.Text>

        </TabPanel.Item>
      </TabPanel>

      {value === 'facebook' && (
        <div
          key='tab-panel-fb'
          id='tab-panel-fb'
          role='tabpanel'
          aria-labelledby='tab-label-fb'
          tabIndex={-1}
        >
          <h3>Facebook</h3>
          <p>
            It's where your aunt's cat has more followers than you, and your high school nemesis
            still thinks they're relevant.
          </p>
        </div>
      )}
      {value === 2 && (
        <div
          key='tab-panel-ig'
          id='tab-panel-ig'
          role='tabpanel'
          aria-labelledby='tab-label-ig'
          tabIndex={-1}
        >
          <h3>Instagram</h3>
          <p>
            It's where people spend hours perfecting their avocado toast just for a 'like', and your
            explore page thinks you need therapy based on your search history.
          </p>
        </div>
      )}
      {value === true && (
        <div
          key='tab-panel-tw'
          id='tab-panel-tw'
          role='tabpanel'
          aria-labelledby='tab-label-tw'
          tabIndex={-1}
        >
          <h3>Twitter</h3>
          <p>
            It's where 280 characters can start a revolution or a feud over pineapple on pizza, and
            your timeline is a mix of breaking news and cat memes.
          </p>
        </div>
      )}
      {value === false && (
        <div
          key='tab-panel-tw2'
          id='tab-panel-tw2'
          role='tabpanel2'
          aria-labelledby='tab-label-tw2'
          tabIndex={-1}
        >
          <h3>Twitter2</h3>
          <p>
            It's where 280 characters can start a revolution or a feud over pineapple on pizza, and
            your timeline is a mix of breaking news and cat memes.
          </p>
        </div>
      )}
    </>
  );
};

export const defaultProps: TabPanelDefProps = {
  behavior: undefined,
  disabled: false,
  selected: undefined,
  w: undefined,
  ellipsis: {},
};

Demo.defaultProps = defaultProps;

export default Demo;
