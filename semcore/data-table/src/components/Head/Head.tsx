import { Box, ScreenReaderOnly } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { Component, createComponent, type Intergalactic, Root, sstyled } from '@semcore/core';
import type Tooltip from '@semcore/tooltip';
import React from 'react';

import { Column } from './Column';
import type { DataTableColumnProps } from './Column.types';
import { Group } from './Group';
import type { DataTableGroupProps } from './Group.type';
import type { DataTableHeadProps, HeadPropsInner } from './Head.types';
import style from './style.shadow.css';
import { DataTableInternal, SELECT_ALL } from '../DataTable/DataTable';
import type { DataTableData } from '../DataTable/DataTable.types';

class HeadRoot<D extends DataTableData> extends Component<
  DataTableHeadProps,
  {},
  {},
  [],
  HeadPropsInner<D>
> {
  static displayName = 'Head';
  static style = style;

  fixedColumnsMap = new Map<string, any>();

  sortableColumnDescribeId() {
    const { uid } = this.asProps;
    return `${uid}-column-sortable-describer`;
  }

  getGroupProps(_: any, index: number) {
    const { use, gridAreaGroupMap, children } = this.asProps;

    return {
      use,
      gridArea: gridAreaGroupMap.get(index),
      fixedColumnsMap: this.fixedColumnsMap,
      withConfig: children === undefined,
    };
  }

  getColumnProps(_: any, index: number) {
    const {
      use,
      columns,
      sort,
      onSortChange,
      tableRef,
      gridTemplateColumns,
      gridTemplateAreas,
      sticky,
      top,
      selectedRows,
      h,
      getFixedStyle,
      onCellClick,
    } = this.asProps;
    const column = columns[index];

    if (index === 0 && selectedRows && columns[index + 1].fixed) {
      column.fixed = 'left';
    }

    const [name, value] = getFixedStyle(column);
    const style: any = {};

    if (top) {
      style.top = `${top}px`;
    }

    if (name !== undefined && value !== undefined) {
      style[name] = value;

      this.fixedColumnsMap.set(column.name, value);
    }

    return {
      use,
      'aria-colindex': index + 1,
      style,
      'gridArea': column.gridArea,
      'fixed': column.fixed,
      sticky,
      'borders': column.borders,
      sort,
      onSortChange,
      'parent': column.parent,
      'sortableColumnDescribeId': this.sortableColumnDescribeId(),
      'columnIndex': index,
      tableRef,
      gridTemplateColumns,
      gridTemplateAreas,
      h,
      'onClick': onCellClick,
    };
  }

  handleSelectAll = (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => {
    this.asProps.onChangeSelectAll?.(value, event);
  };

  handleClickSelectAll = (value: boolean) => (event?: React.SyntheticEvent<HTMLElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    this.asProps.onChangeSelectAll?.(value, event);
  };

  render() {
    const SHead = Root;
    const SHeadCheckboxCol = Head.Column;
    const { Children, styles, getI18nText, children, treeColumns, selectedRows, totalRows } =
      this.asProps;

    const checked = selectedRows && selectedRows.length === totalRows && totalRows > 0;
    const indeterminate = selectedRows && selectedRows.length > 0 && !checked;

    return sstyled(styles)(
      <>
        <SHead render={Box} role='row' aria-rowindex={1}>
          {selectedRows && (
            <SHeadCheckboxCol
              name={SELECT_ALL.toString()}
              onClick={this.handleClickSelectAll(!checked)}
            >
              <Checkbox
                checked={checked}
                indeterminate={indeterminate}
                aria-label={getI18nText('DataTable.Header.selectAllCheckbox:aria-label')}
                onChange={this.handleSelectAll}
              >
                <Checkbox.Value>
                  <Checkbox.Value.Control />
                  <Checkbox.Value.CheckMark mt={0} />
                </Checkbox.Value>
              </Checkbox>
            </SHeadCheckboxCol>
          )}

          {children
            ? (
                <Children />
              )
            : (
                <>
                  {treeColumns.map((column, _i) => {
                    if ('columns' in column) {
                      return (
                        <DataTableInternal.Head.Group
                          key={column.name}
                          {...column}
                          name={column.columns?.map((c) => c.name).join('/')}
                          title=''
                        />
                      );
                    }

                    return <DataTableInternal.Head.Column key={column.name} {...column} />;
                  })}
                </>
              )}
        </SHead>

        <ScreenReaderOnly aria-hidden={true} id={this.sortableColumnDescribeId()}>
          {getI18nText('sortableColumn')}
        </ScreenReaderOnly>
      </>,
    );
  }
}

export const Head = createComponent(HeadRoot, { Column, Group }) as Intergalactic.Component<
  'div',
  DataTableHeadProps
> & {
  Column: <Tag extends 'div' | typeof Tooltip = 'div'>(
    props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableColumnProps, {}, []>,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
  Group: <Tag extends 'div' | typeof Tooltip = 'div'>(
    props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableGroupProps, {}, []>,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
};
