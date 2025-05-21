import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';
import { DataTableGroupProps, GroupPropsInner } from './Group.type';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import { DataTableInternal } from '../DataTable/DataTable';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';

export class Group extends Component<
  DataTableGroupProps,
  {},
  {},
  typeof Group.enhance,
  GroupPropsInner
> {
  static displayName = 'Group';
  static style = style;
  static enhance = [uniqueIDEnhancement()] as const;

  componentDidMount() {
    this.forceUpdate();
  }

  get groupId() {
    const { uid } = this.asProps;

    return `${uid}_columns_group`;
  }

  render() {
    const SGroupContainer = Box;
    const SGroup = Root;
    const { styles, Children, title, fixed, fixedColumnsMap, columns, withConfig } = this.asProps;
    const groupColumns = columns ?? [];
    const children = getOriginChildren(Children);

    const firstName = withConfig ? groupColumns[0]?.name : children[0]?.props.name;
    const lastName = withConfig
      ? groupColumns[groupColumns.length - 1]?.name
      : children[children.length - 1]?.props.name;

    const style: any = {};

    if (fixed === 'left' && firstName) {
      style.left = fixedColumnsMap.get(firstName);
    }
    if (fixed === 'right') {
      style.right = fixedColumnsMap.get(lastName);
    }

    return sstyled(styles)(
      <SGroupContainer>
        <SGroup render={Box} style={style} __excludeProps={['title']} id={this.groupId}>
          {withConfig ? children : title}
        </SGroup>
        {withConfig ? (
          groupColumns.map((column, i) => {
            return (
              <DataTableInternal.Head.Column
                key={column.name}
                {...column}
                aria-describedby={this.groupId}
              />
            );
          })
        ) : (
          <Children />
        )}
      </SGroupContainer>,
    );
  }
}
