import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';
import { DataTableCellProps } from './Cell.types';

class CellRoot extends Component<DataTableCellProps> {
  static displayName = 'Cell';
  static style = style;

  static defaultProps = {
    use: 'primary',
  };

  render() {
    const SCell = Root;
    const { Children, styles } = this.asProps;

    return sstyled(styles)(
      <SCell render={Box} tabIndex={-1} innerOffset>
        <Children />
      </SCell>,
    );
  }
}

export const Cell = createComponent(CellRoot);
