import { Box } from '@semcore/base-components';
import { Component, Root, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import React from 'react';

import type { DataTableGroupProps, GroupPropsInner } from './Group.type';
import style from './style.shadow.css';
import { DataTable } from '../DataTable/DataTable';

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
    setTimeout(() => {
      this.forceUpdate();
    }, 0);
  }

  get groupId() {
    const { uid } = this.asProps;

    return `${uid}_columns_group`;
  }

  render() {
    const SGroupContainer = Box;
    const SGroup = Root;
    const { styles, Children, title, columns, withConfig, shadowVertical } = this.asProps;
    const groupColumns = columns ?? [];

    const firstColumn = groupColumns[0];
    const lastColumn = groupColumns[groupColumns.length - 1];

    return sstyled(styles)(
      <SGroupContainer data-group-container>
        <SGroup
          render={Box}
          style={style}
          __excludeProps={['title']}
          id={this.groupId}
          use:shadowVertical={(firstColumn.showShadowVertical || lastColumn.showShadowVertical) ? shadowVertical : undefined}
        >
          {withConfig ? <Children /> : title}
        </SGroup>
        {withConfig
          ? (
              groupColumns.map((column, _i) => {
                return (
                  <DataTable.Head.Column
                    key={column.name}
                    {...column}
                    aria-describedby={this.groupId}
                  />
                );
              })
            )
          : (
              <Children />
            )}
      </SGroupContainer>,
    );
  }
}
