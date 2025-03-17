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
import { Group } from './Group';
import { DataTableColumnProps } from './Column.types';
import { getFixedStyle, getScrollOffsetValue } from '../../utils';

class HeadRoot extends Component<DataTableHeadProps, {}, {}, [], HeadPropsInner> {
  static displayName = 'Head';
  static style = style;

  componentDidMount() {
    this.forceUpdate();
  }

  getGroupProps(props: any) {
    const offset = 2;
    const count = React.Children.count(props.children);

    return {
      gridArea: `1 / ${offset} / 2 / ${offset + count}`,
    };
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
      gridArea: `1 / ${index + 1} / 2 / ${index + 2}`,
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
//
// function Group(props) {
//   const SGroup = Root;
//   const { styles, Children } = props;
//
//   return sstyled(styles)(
//       <SGroup render={Box}>
//         <Children />
//       </SGroup>,
//   );
// }

export const Head = createComponent(HeadRoot, { Column, Group }) as Intergalactic.Component<
  'div',
  DataTableHeadProps
> & {
  Column: Intergalactic.Component<'div', DataTableColumnProps>;
  Group: Intergalactic.Component<'div', {}>;
};
