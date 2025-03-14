import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { ColumnPropsInner, DataTableColumnProps } from './Column.types';
import { Box } from '@semcore/base-components';

import style from './column.shadow.css';

export class Column extends Component<DataTableColumnProps, {}, {}, [], ColumnPropsInner> {
  static displayName = 'Column';
  static style = style;

  render() {
    const SColumn = Root;
    const { styles, use } = this.asProps;

    return sstyled(styles)(
      <SColumn render={Box} role={'columnheader'} aria-rowindex={1}>
        {this.asProps.children}
      </SColumn>,
    );
  }
}
