import FacebookM from '@semcore/icon/Facebook/m';
import InstagramM from '@semcore/icon/Instagram/m';
import TwitterM from '@semcore/icon/Twitter/m';
import Badge from '@semcore/ui/badge';
import type { BoxProps } from '@semcore/ui/base-components';
import Counter from '@semcore/ui/counter';
import TabLine from '@semcore/ui/tab-line';
import type { TabLineProps, TabLineItemProps } from '@semcore/ui/tab-line';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type TabLineDefProps = TabLineProps & BoxProps & TabLineItemProps;

const Demo = (props: TabLineDefProps) => {
  const [value, setValue] = React.useState<string | number | boolean>(2);

  return (
    <>
      <TabLine
        w={props.w}
        size={props.size}
        underlined={props.underlined}
        behavior={props.behavior}
        value={value}
        onChange={(val: string | number | boolean) => setValue(val)}
        aria-label='Social network reports'
      >
        <TabLine.Item
          value='facebook'
          selected={props.selected}
          disabled={props.disabled}
          addonLeft={FacebookM}
          aria-controls={value === 'facebook' ? 'tab-panel-fb' : undefined}
          id='tab-label-fb'
        >
          <TabLine.Item.Text>Facebook</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <FacebookM />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          value={2}
          disabled={props.disabled}
          aria-controls={value === 2 ? 'tab-panel-ig' : undefined}
          id='tab-label-ig'
        >
          <TabLine.Item.Addon>
            <InstagramM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Instagram</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Badge bg='green-400'>new</Badge>
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          value={true}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw' : undefined}
          id='tab-label-tw'
        >
          <TabLine.Item.Addon>
            <TwitterM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Twitter</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Text>Twitter</Text>
          </TabLine.Item.Addon>
        </TabLine.Item>

        <TabLine.Item
          value={3}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw3' : undefined}
          id='tab-label-tw3'
          addonRight={TwitterM}
        >

          <TabLine.Item.Text>Twitter3</TabLine.Item.Text>

        </TabLine.Item>

        <TabLine.Item
          value={false}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw2' : undefined}
          id='tab-label-tw2'
        >
          <TabLine.Item.Addon>
            <Counter>32</Counter>
          </TabLine.Item.Addon>
          <TabLine.Item.Text>Twitter2</TabLine.Item.Text>

        </TabLine.Item>

        <TabLine.Item
          value={4}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw2' : undefined}
          id='tab-label-tw2'
        >

          <TabLine.Item.Text>Twitter4</TabLine.Item.Text>

        </TabLine.Item>
      </TabLine>

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

export const defaultProps: TabLineDefProps = {
  size: 'm',
  behavior: undefined,
  disabled: false,
  underlined: undefined,
  selected: undefined,
  w: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
