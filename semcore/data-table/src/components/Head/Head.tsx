import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { DataTableHeadProps } from './Head.types';
import { Box } from '@semcore/base-components';

import style from './head.shadow.css';

export class Head extends Component<DataTableHeadProps> {
  static displayName = 'Head';
  static style = style;

  getColumnProps(_, index) {
    return {
      'aria-colindex': index + 1,
    };
  }

  render() {
    const SHead = Root;
    const { Children, styles } = this.asProps;
    return sstyled(styles)(
      <SHead render={Box} role='row'>
        <Children />
      </SHead>,
    );
  }
}
