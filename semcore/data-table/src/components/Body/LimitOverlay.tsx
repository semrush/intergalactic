import { Box, Flex } from '@semcore/base-components';
import { Component, createComponent, type Intergalactic, sstyled } from '@semcore/core';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import * as React from 'react';

import type { DTRow, DTRows } from './Row.types';
import style from './style.shadow.css';
import type { IFocusableCell, LockedCell } from '../../enhancers/focusableCell';
import { handleFocusCell, handleKeydownFocusCell } from '../../enhancers/focusableCell';
import { ACCORDION, GRID_ROW_INDEX } from '../DataTable/DataTable';
import type { DataTableProps } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

type LimitOverlayProps<UniqKeyType> = {
  columns: DTColumn[];
  rows: DTRows<UniqKeyType>;
  limit: Exclude<DataTableProps<any, any, any>['limit'], undefined>;
  flatRows: DTRow<UniqKeyType>[];
  hasGroups: boolean;
  gridContainerRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
};

class LimitOverlayRoot<UniqKeyType> extends Component<LimitOverlayProps<UniqKeyType>> implements IFocusableCell {
  lockedCell: LockedCell = [null, false];

  limitWrapperRef = React.createRef<HTMLDivElement>();

  static displayName = 'LimitOverlay';
  static style = style;

  get limitOverlayGridArea() {
    const {
      columns,
      hasGroups,
      flatRows,
      limit,
    } = this.asProps;

    const { fromRow, fromColumn } = limit;

    const rowOffset = hasGroups ? 3 : 2;

    const rowStart = fromRow !== undefined
      ? rowOffset + flatRows[fromRow][GRID_ROW_INDEX]
      : rowOffset;
    let rowEnd = rowOffset;

    const lastRow = flatRows[flatRows.length - 1];
    if (lastRow[ACCORDION]) {
      rowEnd = rowEnd + lastRow[GRID_ROW_INDEX] + 1 + (Array.isArray(lastRow[ACCORDION]) ? lastRow[ACCORDION].length : 1);
    } else {
      rowEnd = rowEnd + lastRow[GRID_ROW_INDEX] + 1;
    }

    const columnStart = fromColumn !== undefined ? fromColumn + 1 : 1;
    const columnEnd = columns.length + 1;

    return `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`;
  }

  get sizes() {
    const { scrollAreaRef, columns } = this.asProps;

    if (columns.some((c) => c.fixed) && this.limitWrapperRef.current && scrollAreaRef.current) {
      const scrollAreaRect = scrollAreaRef.current.getBoundingClientRect();
      const limitWrapperRect = this.limitWrapperRef.current.getBoundingClientRect();

      const left = limitWrapperRect.x - scrollAreaRect.x;
      const width = scrollAreaRect.width - limitWrapperRect.x + scrollAreaRect.x;

      return {
        left,
        width,
      };
    }

    return {
      left: 0,
      width: 0,
    };
  }

  handleFocusableCellKeyDown = (e: React.KeyboardEvent) => {
    handleKeydownFocusCell(this.lockedCell, e);
  };

  handleFocusableCellFocus = (e: React.FocusEvent) => {
    const tableElement = this.asProps.gridContainerRef.current;
    if (tableElement && !hasParent(e.relatedTarget, tableElement)) {
      if (e.target instanceof HTMLElement) {
        e.target.dataset.skipTargetFocus = 'true';
      }
    } else {
      if (e.target instanceof HTMLElement) {
        e.target.dataset.skipTargetFocus = undefined;
      }

      handleFocusCell(this.lockedCell, e.target, e.currentTarget);
    }
  };

  render() {
    const SLimitOverlayCellWrapper = Flex;
    const { columns, rows, styles, limit } = this.asProps;

    const rowsLimit = limit.fromRow;
    const columnsLimit = limit.fromColumn;
    const renderOverlay = limit.renderOverlay;

    const colIndex = columnsLimit ? columnsLimit + 1 : 1;
    const colSpan = columns.length - (columnsLimit ?? 0);
    const rowsSpan = rows.length - (rowsLimit ?? 0);
    const { width, left } = this.sizes;

    return sstyled(styles)(
      <SLimitOverlayCellWrapper
        ref={this.limitWrapperRef}
        // @ts-ignore
        gridArea={this.limitOverlayGridArea}
        w={width ? width : undefined}
        left={left ? left : undefined}
        onClick={(e) => e.stopPropagation()}
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
