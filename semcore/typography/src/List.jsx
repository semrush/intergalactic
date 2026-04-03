import { Flex } from '@semcore/base-components';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import style from './style/list.shadow.css';
import Text from './Text';

class ListRoot extends Component {
  static displayName = 'List';
  static style = style;
  static defaultProps = {
    marker: '•',
  };

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

class ItemRoot extends Component {
  static style = style;
  static displayName = 'Item';

  render() {
    const SItem = Root;
    const { styles, children, marker: markerNode, Children } = this.asProps;
    const SMarker = 'span';
    const SContent = 'div';

    const isAdvancedMode = isAdvanceMode(Children, [List.Item.Content.displayName]);

    return sstyled(styles)(
      <SItem render={Text} tag='li'>
        {isNode(markerNode) && <SMarker aria-hidden='true'>{markerNode}</SMarker>}
        {isAdvancedMode ? <Children /> : <SContent>{children}</SContent>}
      </SItem>,
    );
  }
}

function Content(props) {
  const { styles, children } = props;
  const SContent = Root;

  return sstyled(styles)(<SContent render={Flex}>{children}</SContent>);
}

Content.displayName = 'Content';

const Item = createComponent(ItemRoot, { Content });

const List = createComponent(ListRoot, { Item });

export default List;
