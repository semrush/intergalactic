import { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import type { NSList } from './List.type';
import style from '../../style/list.shadow.css';
import Text from '../Text/Text';

class ListRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSList.Component>,
  [],
  {},
  {},
  {},
  NSList.DefaultProps
> {
  static displayName = 'List';
  static style = style;
  static defaultProps = {
    marker: '•',
  } as const;

  getItemProps() {
    const { marker } = this.asProps;
    return {
      marker,
    };
  }

  render() {
    const SList = Root;
    const { styles } = this.asProps;
    return sstyled(styles)(<SList render={Text} tag='ul' />);
  }
}

class ItemRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSList.Item.Component, typeof ListRoot, 'Item'>
> {
  static style = style;
  static displayName = 'Item';

  render() {
    const SItem = Root;
    const { styles, marker: markerNode, Children } = this.asProps;
    const SMarker = 'span';
    const SContent = 'div';

    const isAdvancedMode = isAdvanceMode(Children, [List.Item.Content.displayName]);

    return sstyled(styles)(
      <SItem render={Text} tag='li'>
        {isNode(markerNode) && <SMarker aria-hidden='true'>{markerNode}</SMarker>}
        {isAdvancedMode ? <Children /> : <SContent><Children /></SContent>}
      </SItem>,
    );
  }
}

function Content(props: Intergalactic.InternalTypings.InferComponentProps<NSList.Item.Content.Component>) {
  const { styles, children } = props;
  const SContent = Root;

  return sstyled(styles)(<SContent render={Flex}>{children}</SContent>);
}

Content.displayName = 'Content';

const Item = createComponent<
  NSList.Item.Component,
  typeof ItemRoot
>(ItemRoot, { Content });

const List = createComponent<
  NSList.Component,
  typeof ListRoot
>(ListRoot, { Item });

export default List;
