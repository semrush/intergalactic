import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { ColumnPropsInner, DataTableColumnProps } from './Column.types';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';

export class Group extends Component<{}, {}, {}, [], {}> {
  static displayName = 'Group';
  static style = style;

  render() {
    const SGroup = Root;
    const SGroupTitle = Box;
    const { styles, Children, gridArea } = this.asProps;

    return sstyled(styles)(
      <SGroup render={Box} display={'contents'} __excludeProps={['gridArea']}>
        <SGroupTitle gridArea={gridArea}>HEADER</SGroupTitle>
        <Children />
      </SGroup>,
    );
  }
}
