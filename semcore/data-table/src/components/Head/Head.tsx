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
import { DataTable, SELECT_ALL, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DataTableData } from '../DataTable/DataTable.types';

class HeadRoot<
  Data extends DataTableData,
  UniqKey extends keyof Data[number],
  UniqKeyType extends Data[number][UniqKey],
> extends Component<
    DataTableHeadProps,
    {},
    {},
    [],
    HeadPropsInner<Data, UniqKey, UniqKeyType>
  > {
  static displayName = 'Head';
  static style = style;

  sortableColumnDescribeId() {
    const { uid } = this.asProps;
    return `${uid}-column-sortable-describer`;
  }

  getGroupProps(props: any, index: number) {
    const { fixed, columns } = props;
    const { use, gridAreaGroupMap, children, getFixedStyle, shadowVertical, top, scrollDirection } = this.asProps;
    const groupColumns = columns ?? [];

    const firstColumn = groupColumns[0];
    const lastColumn = groupColumns[groupColumns.length - 1];

    const style: any = {};

    if (fixed === 'left' && firstColumn) {
      const [name, value] = getFixedStyle({ name: firstColumn.name, fixed: 'left' });
      if (name !== undefined && value !== undefined) {
        style[name] = value;
      }
    }
    if (fixed === 'right' && lastColumn) {
      const [name, value] = getFixedStyle({ name: lastColumn.name, fixed: 'right' });
      if (name !== undefined && value !== undefined) {
        style[name] = value;
      }
    }
    if (top && scrollDirection !== 'horizontal') {
      style.top = `${top}px`;
    }

    return {
      use,
      gridArea: gridAreaGroupMap.get(index),
      withConfig: children === undefined,
      getFixedStyle,
      shadowVertical: (firstColumn.showShadowVertical || lastColumn.showShadowVertical) ? shadowVertical : undefined,
      style,
      scrollDirection,
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
      shadowVertical,
      scrollDirection,
    } = this.asProps;
    const column = columns[index];

    if (index === 0 && selectedRows && columns[index + 1].fixed) {
      column.fixed = 'left';
    }

    const [name, value] = getFixedStyle(column);
    const style: any = {};

    if (top && scrollDirection !== 'horizontal') {
      style.top = `${top}px`;
    }

    if (name !== undefined && value !== undefined) {
      style[name] = value;
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
      'shadowVertical': column.showShadowVertical ? shadowVertical : undefined,
      scrollDirection,
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

  get areAllRowsSelected() {
    const { selectedRows = [], flatRows } = this.asProps;

    return selectedRows.length > 0 && flatRows.every((row) => selectedRows?.includes(row[UNIQ_ROW_KEY]));
  }

  get isIndeterminate() {
    const { flatRows, selectedRows } = this.asProps;

    return flatRows.some((row) => selectedRows?.includes(row[UNIQ_ROW_KEY]));
  }

  render() {
    const SHead = Root;
    const SHeadCheckboxCol = Head.Column;
    const { Children, styles, getI18nText, children, treeColumns, selectedRows, sticky, animationDuration, isDataEmpty, gridTemplateColumns } = this.asProps;

    const areAllRowsSelected = this.areAllRowsSelected;
    const indeterminate = this.isIndeterminate && !areAllRowsSelected;

    return sstyled(styles)(
      <>
        <SHead
          render={Box}
          role='row'
          aria-rowindex={1}
          sticky={sticky}
          use:animationDuration={animationDuration ? `${animationDuration}ms` : undefined}
          isDataEmpty={isDataEmpty}
          use:gridTemplateColumns={gridTemplateColumns.join(' ')}
          tabIndex={isDataEmpty ? 0 : undefined}
        >
          {selectedRows && (
            <SHeadCheckboxCol
              name={SELECT_ALL.toString()}
              onClick={this.handleClickSelectAll(!areAllRowsSelected)}
            >
              <Checkbox
                checked={areAllRowsSelected}
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
                        <DataTable.Head.Group
                          key={column.name}
                          {...column}
                          name={column.columns?.map((c) => c.name).join('/')}
                          title=''
                        />
                      );
                    }

                    return <DataTable.Head.Column key={column.name} {...column} />;
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
