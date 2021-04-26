import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import isNode from '@semcore/utils/lib/isNode';

import style from './style/info.shadow.css';

export interface IInfoItemProps extends IBoxProps {
  label?: React.ReactNode;
}

class InfoRoot extends Component<IBoxProps> {
  static displayName = 'Info';
  static style = style;

  render() {
    const SInfo = Root;
    return sstyled(this.asProps.styles)(<SInfo render={Box} />);
  }
}

function Item(props) {
  const SItem = Root;
  const { Children, styles, label } = props;
  return sstyled(styles)(
    <SItem render={Box}>
      {isNode(label) && <Info.Item.Label>{label}</Info.Item.Label>}
      <Children />
    </SItem>,
  );
}

function Label(props) {
  const SLabel = Root;
  return sstyled(props.styles)(<SLabel render={Box} />);
}

const Info = createComponent<
  ComponentProps<typeof Box>,
  {
    Item: [
      Merge<IInfoItemProps, HTMLAttributes<HTMLDivElement>>,
      {
        Label: ComponentProps<typeof Box>;
      },
    ];
  }
>(InfoRoot, {
  Item: [
    Item,
    {
      Label,
    },
  ],
});

export default Info;
