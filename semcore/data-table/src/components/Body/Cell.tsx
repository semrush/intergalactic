import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { Flex } from '@semcore/base-components';

import style from './style.shadow.css';
import { CellPropsInner, DataTableCellProps } from './Cell.types';

class CellRoot extends Component<DataTableCellProps, {}, {}, [], CellPropsInner> {
  static displayName = 'Cell';
  static style = style;

  render() {
    const SCell = Root;
    const { Children, styles } = this.asProps;

    return sstyled(styles)(
      <SCell render={Flex} tabIndex={-1} innerOffset>
        <Children />
      </SCell>,
    );
  }
}

export const Cell = createComponent(CellRoot);
