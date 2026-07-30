import { Box } from '@semcore/base-components';
import type { NSBox } from '@semcore/base-components';
import {
  createComponent,
  Component,
  sstyled,
  Root,
  type Intergalactic,
} from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import style from './style/info.shadow.css';

export type InfoItemProps = NSBox.Props & {
  /** A label content that appears before the main item content */
  label?: React.ReactNode;
};

type InfoComponent = NSBox.Component & {
  Item: Intergalactic.Component<'div', InfoItemProps> & {
    Label: NSBox.Component;
  };
};

class InfoRoot extends Component<NSBox.Props> {
  static displayName = 'Info';
  static style = style;

  render() {
    const SInfo = Root;
    return sstyled(this.asProps.styles)(<SInfo render={Box} />);
  }
}

function Item(props: any) {
  const SItem = Root;
  const { Children, styles, label } = props;
  return sstyled(styles)(
    <SItem render={Box}>
      {isNode(label) && <Info.Item.Label>{label}</Info.Item.Label>}
      <Children />
    </SItem>,
  );
}

function Label(props: any) {
  const SLabel = Root;
  return sstyled(props.styles)(<SLabel render={Box} />);
}

const Info = createComponent<
  InfoComponent,
  typeof InfoRoot
>(InfoRoot, {
  Item: [
    Item,
    {
      Label,
    },
  ],
});

export default Info;
