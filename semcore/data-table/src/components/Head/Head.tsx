import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { DataTableHeadProps, HeadPropsInner } from './Head.types';
import {
  Box,
  hideScrollBarsFromScreenReadersContext,
  ScreenReaderOnly,
  ScrollArea,
} from '@semcore/base-components';

import style from './style.shadow.css';
import { Column } from './Column';
import { DataTableColumnProps } from './Column.types';
import { getFixedStyle, getScrollOffsetValue } from '../../utils';

class HeadRoot extends Component<DataTableHeadProps, {}, {}, [], HeadPropsInner> {
  static displayName = 'Head';
  static style = style;

  componentDidMount() {
    this.forceUpdate();
  }

  getColumnProps(_: any, index: number) {
    const { use, columns } = this.asProps;
    const [name, value] = getFixedStyle(columns[index], columns);
    const style: any = {};

    if (name !== undefined && value !== undefined) {
      style[name] = value;
    }

    return {
      use,
      'aria-colindex': index + 1,
      ref: columns[index].ref,
      style,
    };
  }

  render() {
    const SHead = Root;
    const { Children, styles, columns, tableRef, withScrollBar } = this.asProps;
    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(columns);

    return sstyled(styles)(
      <>
        <SHead render={Box} role='row'>
          <Children />
        </SHead>

        {Boolean(withScrollBar) && tableRef.current && (
          <Box display={'contents'}>
            <ScrollArea.Bar
              orientation='horizontal'
              container={tableRef.current}
              top={'25px'}
              leftOffset={offsetLeftSum}
              rightOffset={offsetRightSum}
            />
          </Box>
        )}
      </>,
    );
  }
}

export const Head = createComponent(HeadRoot, { Column }) as Intergalactic.Component<
  'div',
  DataTableHeadProps
> & {
  Column: Intergalactic.Component<'div', DataTableColumnProps>;
};
