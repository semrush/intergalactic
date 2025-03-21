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
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import { ReactElement } from 'react';
import { DataTableGroupProps } from './Group.type';

class HeadRoot extends Component<DataTableHeadProps, {}, {}, [], HeadPropsInner> {
  static displayName = 'Head';
  static style = style;

  gridAreaGroupMap = new Map<number, string>();
  gridAreaColumnMap = new Map<number, string>();

  componentDidMount() {
    this.fillGridArea();

    this.forceUpdate();
  }

  getGroupProps(_: any, index: number) {
    const { use } = this.asProps;

    return {
      use,
      gridArea: this.gridAreaGroupMap.get(index),
    };
  }

  getColumnProps(_: any, index: number) {
    const { use, columns } = this.asProps;
    const column = columns[index];
    const [name, value] = getFixedStyle(column, columns);
    const style: any = {};

    if (name !== undefined && value !== undefined) {
      style[name] = value;
    }

    return {
      use,
      'aria-colindex': index + 1,
      ref: column.ref,
      style,
      gridArea: this.gridAreaColumnMap.get(index),
      fixed: column.fixed,
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

  private fillGridArea() {
    const { Children } = this.asProps;
    const children: Array<ReactElement<DataTableColumnProps> | ReactElement<DataTableGroupProps>> =
      getOriginChildren(Children);
    let hasGroup = false;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      if (child.type === Head.Group) {
        hasGroup = true;
      }
    });

    let columnIndex = 0;
    let groupIndex = 0;
    let gridColumnIndex = 1;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      if (child.type === Head.Group) {
        const groupedChildren = child.props.children as Array<ReactElement<DataTableColumnProps>>;
        const initGridColumn = gridColumnIndex;

        React.Children.forEach(groupedChildren, (child) => {
          if (!React.isValidElement(child)) return;

          if (child.type === Head.Column) {
            this.gridAreaColumnMap.set(
              columnIndex,
              `2 / ${gridColumnIndex} / 3 / ${gridColumnIndex + 1}`,
            );
            columnIndex++;
            gridColumnIndex++;
          }
        });

        this.gridAreaGroupMap.set(groupIndex, `1 / ${initGridColumn} / 2 / ${gridColumnIndex}`);
        groupIndex++;
      } else if (child.type === Head.Column) {
        this.gridAreaColumnMap.set(
          columnIndex,
          `1 / ${gridColumnIndex} / ${hasGroup ? '3' : '2'} / ${gridColumnIndex + 1}`,
        );
        columnIndex++;
        gridColumnIndex++;
      }
    });
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
  Group: Intergalactic.Component<'div', DataTableGroupProps>;
};
