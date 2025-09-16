import { Box, Flex } from '@semcore/base-components';
import { Component, createComponent, type Intergalactic, sstyled } from '@semcore/core';
import type { DataTableProps } from '@semcore/data-table';
import * as React from 'react';

import type { DTRow, DTRows } from './Row.types';
import style from './style.shadow.css';
import type { IFocusableCell, LockedCell } from '../../enhancers/focusableCell';
import { handleFocusCell, handleKeydownFocusCell } from '../../enhancers/focusableCell';
import type { DTColumn } from '../Head/Column.types';

type LimitOverlayProps<UniqKeyType> = {
  rowIndex: number;
  columns: DTColumn[];
  rows: DTRows<UniqKeyType>;
  limit: DataTableProps<any, any, any>['limit'];
  selectedRows?: UniqKeyType[];
  totalRows: number;
  flatRows: DTRow<UniqKeyType>[];
  hasGroups: boolean;
};

class LimitOverlayRoot<UniqKeyType> extends Component<LimitOverlayProps<UniqKeyType>> implements IFocusableCell {
  lockedCell: LockedCell = [null, false];

  static displayName = 'LimitOverlay';
  static style = style;

  get limitOverlayGridArea() {
    const {
      columns,
      selectedRows,
      hasGroups,
      totalRows,
      flatRows,
      limit,
    } = this.asProps;

    const currentMaxGridIndex = totalRows;
    const currentRowLimitOffset = totalRows - flatRows.length;

    const { rows: rowsLimit, columns: columnsLimit } = limit ?? {};

    const rowOffset = hasGroups ? 3 : 2;
    const columnOffset = selectedRows ? 1 : 0;

    const rowStart = rowsLimit !== undefined
      ? rowsLimit + rowOffset + currentRowLimitOffset
      : rowOffset;
    const columnStart = columnsLimit !== undefined ? columnsLimit + columnOffset + 1 : columnOffset + 1;
    const rowEnd = currentMaxGridIndex + rowOffset;
    const columnEnd = columns.length + 1;

    return `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`;
  }

  handleFocusableCellKeyDown = (e: React.KeyboardEvent) => {
    handleKeydownFocusCell(this.lockedCell, e);
  };

  handleFocusableCellFocus = (e: React.FocusEvent) => {
    handleFocusCell(this.lockedCell, e.target, e.currentTarget);
  };

  render() {
    const SLimitOverlayCellWrapper = Flex;
    const { rowIndex, columns, rows, styles, limit } = this.asProps;

    const rowsLimit = limit?.rows;
    const columnsLimit = limit?.columns;
    const renderOverlay = limit?.renderOverlay;

    if (rowsLimit === undefined && columnsLimit === undefined) return null;
    if ((rowsLimit ?? 0) !== rowIndex) return null;

    const colIndex = columnsLimit ? columnsLimit + 1 : 1;
    const colSpan = columns.length - (columnsLimit ?? 0);
    const rowsSpan = rows.length - (rowsLimit ?? 0);

    return sstyled(styles)(
      <SLimitOverlayCellWrapper
        // @ts-ignore
        gridArea={this.limitOverlayGridArea}
      >
        <Box
          role='gridcell'
          aria-colindex={colIndex}
          aria-colspan={colSpan}
          aria-rowspan={rowsSpan}
          tabIndex={-1}
          onFocus={this.handleFocusableCellFocus}
          onKeyDown={this.handleFocusableCellKeyDown}
        >
          {renderOverlay?.()}
        </Box>
      </SLimitOverlayCellWrapper>,
    );
  }
}

type LimitOverlayType = (<
  UniqKeyType,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', LimitOverlayProps<UniqKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', LimitOverlayProps<any>>;

export const LimitOverlay = createComponent(LimitOverlayRoot) as LimitOverlayType;
