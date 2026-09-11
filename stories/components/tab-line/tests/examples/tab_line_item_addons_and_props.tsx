import FacebookM from '@semcore/icon/Facebook/m';
import InstagramM from '@semcore/icon/Instagram/m';
import TwitterM from '@semcore/icon/Twitter/m';
import Badge from '@semcore/ui/badge';
import type { NSBox } from '@semcore/ui/base-components';
import Counter from '@semcore/ui/counter';
import TabLine from '@semcore/ui/tab-line';
import type { NSTabLine } from '@semcore/ui/tab-line';
import { Text, type NSText } from '@semcore/ui/typography';
import React from 'react';

type TabLineDefProps = NSTabLine.Props & NSBox.Props & NSTabLine.Item.Props & {
  ellipsis?: NSText.EllipsisProps;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: TabLineDefProps) => {
  const [value, setValue] = React.useState<string | number | boolean>(2);

  return (
    <>
      <TabLine
        size={props.size}
        underlined={props.underlined}
        behavior={props.behavior}
        value={value}
        onChange={(val: string | number | boolean) => setValue(val)}
        aria-label='Social network reports'
      >
        <TabLine.Item
          w={props.w}
          value='facebook'
          disabled={props.disabled}
          addonLeft={FacebookM}
          aria-controls={value === 'facebook' ? 'tab-panel-fb' : undefined}
          id='tab-label-fb'
        >
          <TabLine.Item.Text
            {...props.ellipsis}
            hint={props.hintProps}
            hint:placement={props.hintPlacement}
          >
            Facebook
          </TabLine.Item.Text>
          <TabLine.Item.Addon>
            <FacebookM />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          w={props.w}
          value={2}
          disabled={props.disabled}
          aria-controls={value === 2 ? 'tab-panel-ig' : undefined}
          id='tab-label-ig'
        >
          <TabLine.Item.Addon>
            <InstagramM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text {...props.ellipsis} hint={props.hintProps}>Instagram Instagram</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Badge type='new' />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item
          w={props.w}
          value={true}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw' : undefined}
          id='tab-label-tw'
        >
          <TabLine.Item.Addon>
            <TwitterM />
          </TabLine.Item.Addon>
          <TabLine.Item.Text w={props.w} {...props.ellipsis} hint={props.hintProps}>Twitter Twitter</TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Text>1</Text>
          </TabLine.Item.Addon>
        </TabLine.Item>

        <TabLine.Item
          w={props.w}
          value={3}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw3' : undefined}
          id='tab-label-tw3'
          addonRight={TwitterM}
        >
          <TabLine.Item.Text {...props.ellipsis} hint={props.hintProps}>Twitter3</TabLine.Item.Text>
        </TabLine.Item>

        <TabLine.Item
          w={props.w}
          value={false}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw2' : undefined}
          id='tab-label-tw2'
        >
          <TabLine.Item.Addon>
            <Counter>32</Counter>
          </TabLine.Item.Addon>
          <TabLine.Item.Text {...props.ellipsis} hint={props.hintProps}>Twitter2</TabLine.Item.Text>

        </TabLine.Item>

        <TabLine.Item
          w={props.w}
          value={4}
          disabled={props.disabled}
          aria-controls={value === true ? 'tab-panel-tw2' : undefined}
          id='tab-label-tw2'
        >
          <TabLine.Item.Text {...props.ellipsis} hint={props.hintProps}>Twitter4 Twitter4</TabLine.Item.Text>
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
  ellipsis: {
    ellipsis: true,
  },
};

Demo.defaultProps = defaultProps;

export default Demo;
