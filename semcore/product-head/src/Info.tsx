import React from 'react';
import {
  createComponent,
  Component,
  sstyled,
  Root,
  UnknownProperties,
  Intergalactic,
} from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import isNode from '@semcore/core/lib/utils/isNode';

import style from './style/info.shadow.css';

/** @deprecated */
export interface IInfoItemProps extends InfoItemProps, UnknownProperties {}
export type InfoItemProps = BoxProps & {
  label?: React.ReactNode;
};

class InfoRoot extends Component<BoxProps> {
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

const Info = createComponent(InfoRoot, {
  Item: [
    Item,
    {
      Label,
    },
  ],
}) as typeof Box & {
  Item: Intergalactic.Component<'div', InfoItemProps> & {
    Label: typeof Box;
  };
};

export default Info;
