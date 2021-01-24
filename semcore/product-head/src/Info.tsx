import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
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
    const SInfo = this.Root;
    const { styles } = this.asProps;

    return styled(styles)(<SInfo render={Box} />);
  }
}

function Item(props) {
  const { Root: SItem, styles } = props;
  const { Children, label } = props;
  return styled(styles)(
    <SItem render={Box}>
      {isNode(label) && <Info.Item.Label>{label}</Info.Item.Label>}
      <Children />
    </SItem>,
  );
}

function Label(props) {
  const { Root: SLabel, styles } = props;
  return styled(styles)(<SLabel render={Box} />);
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
