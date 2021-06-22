import React from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';

import Text from './Text';

import style from './style/list.shadow.css';

class List extends Component {
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
    const SList = this.Root;
    const { styles } = this.asProps;
    return sstyled(styles)(<SList render={Text} tag="ul" />);
  }
}

function Item(props) {
  const SItem = Text;
  const { styles, forwardRef, children, marker: markerNode, ...other } = props;
  const SMarker = 'span';
  const SContent = 'div';

  return sstyled(styles)(
    <SItem tag="li" ref={forwardRef} {...other}>
      {isNode(markerNode) && <SMarker>{markerNode}</SMarker>}
      <SContent>{children}</SContent>
    </SItem>,
  );
}

export default createComponent(List, { Item });
