import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import type { NSProductHeadInfo } from './Info.type';
import style from './style/info.shadow.css';

class InfoRoot extends Component<Intergalactic.InternalTypings.InferComponentProps<NSProductHeadInfo.Component>> {
  static displayName = 'Info';
  static style = style;

  render() {
    const SInfo = Root;
    return sstyled(this.asProps.styles)(<SInfo render={Box} />);
  }
}

function Item(props: Intergalactic.InternalTypings.InferComponentProps<NSProductHeadInfo.Item.Component>) {
  const SItem = Root;
  const { Children, styles, label } = props;
  return sstyled(styles)(
    <SItem render={Box}>
      {isNode(label) && <Info.Item.Label>{label}</Info.Item.Label>}
      <Children />
    </SItem>,
  );
}

function Label(props: Intergalactic.InternalTypings.InferComponentProps<NSProductHeadInfo.Item.Label.Component>) {
  const SLabel = Root;
  return sstyled(props.styles)(<SLabel render={Box} />);
}

const Info = createComponent<NSProductHeadInfo.Component, typeof InfoRoot>(InfoRoot, {
  Item: [
    Item,
    {
      Label,
    },
  ],
});

export default Info;
