import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';
import { DataTableGroupProps, GroupPropsInner } from './Group.type';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';

export class Group extends Component<DataTableGroupProps, {}, {}, [], GroupPropsInner> {
  static displayName = 'Group';
  static style = style;

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const SGroupContainer = Box;
    const SGroup = Root;
    const { styles, Children, title, fixed, fixedColumnsMap } = this.asProps;
    const children = getOriginChildren(Children);
    const firstName = children[0]?.props.name;
    const lastName = children[children.length - 1]?.props.name;

    const style: any = {};

    if (fixed === 'left' && firstName) {
      style.left = fixedColumnsMap.get(firstName);
    }
    if (fixed === 'right') {
      style.right = fixedColumnsMap.get(lastName);
    }

    return sstyled(styles)(
      <SGroupContainer>
        <SGroup render={Box} style={style} __excludeProps={['title']}>
          {title}
        </SGroup>
        <Children />
      </SGroupContainer>,
    );
  }
}
