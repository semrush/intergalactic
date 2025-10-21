import { Box, Flex } from '@semcore/base-components';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';
import { isInteractiveElement } from '@semcore/ui/core/lib/utils/isInteractiveElement';
import * as React from 'react';

import type { CellPropsInner, DataTableCellProps } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import style from './style.shadow.css';
import type { IFocusableCell, LockedCell } from '../../enhancers/focusableCell';
import { handleFocusCell, handleKeydownFocusCell } from '../../enhancers/focusableCell';
import type { DataTableData } from '../DataTable/DataTable.types';

const DEFAULT_ROW_DURATION = 50;

class CellRoot<Data extends DataTableData, UniqKeyType> extends Component<DataTableCellProps<UniqKeyType>, {}, {}, [], CellPropsInner<Data, UniqKeyType>> implements IFocusableCell {
  lockedCell: LockedCell = [null, false];

  static displayName = 'Cell';
  static style = style;

  cellRef = React.createRef<HTMLDivElement>();

  componentWillUnmount() {
    const { virtualScroll, tableRef } = this.asProps;
    if (virtualScroll && this.cellRef.current && isFocusInside(this.cellRef.current)) {
      tableRef.current?.setAttribute('tabIndex', '0');
    }
  }

  handleFocusableCellKeyDown = (e: React.KeyboardEvent) => {
    handleKeydownFocusCell(this.lockedCell, e);
  };

  handleFocusableCellFocus = (e: React.FocusEvent) => {
    handleFocusCell(this.lockedCell, e.target, e.currentTarget);
  };

  calculateAnimationSettings() {
    const {
      accordionRowIndex = 0,
      isAccordionRow,
      animationExpand,
      accordionDuration,
      rows,
    } = this.asProps;

    if (!isAccordionRow) {
      return {};
    }

    const rowsLength = rows.length;
    const durationPerRow = (duration: number) => duration / rowsLength;

    const duration = Array.isArray(accordionDuration)
      ? [durationPerRow(accordionDuration[0]), durationPerRow(accordionDuration[1])]
      : accordionDuration !== undefined
        ? durationPerRow(accordionDuration)
        : rowsLength > 4
          ? durationPerRow(200)
          : DEFAULT_ROW_DURATION;

    let delay;
    const delayIndex = animationExpand ? accordionRowIndex : rows.length - 1 - accordionRowIndex;

    if (Array.isArray(duration)) {
      delay = [duration[0] * delayIndex, duration[1] * delayIndex];
    } else if (duration !== undefined) {
      delay = duration * delayIndex;
    }

    return { duration, delay };
  }

  handleClickCell = (e: React.SyntheticEvent) => {
    const { rowIndex, columnIndex, onClick, row } = this.asProps;

    if (isInteractiveElement(e.target) && this.cellRef.current) {
      this.lockedCell[0] = this.cellRef.current;
      this.lockedCell[1] = true;
    }

    onClick(e, { rowIndex, colIndex: columnIndex, row });
  };

  render() {
    const SCellWrapper = Box;
    const SCell = Root;
    const {
      Children,
      styles,
      row,
      column,
      columnIndex,
      gridRowIndex,
      isAccordionRow,
      animationExpand,
      style,
      shadowVertical,
      calculatedHeight,
    } = this.asProps;

    const cell = row[column.name];
    const cellName = cell instanceof MergedColumnsCell ? cell.dataKey : column.name;

    let scope: null | 'rowgroup' | 'colgroup' = null;
    let gridArea: string | undefined = undefined;

    const fromRow = gridRowIndex;
    const fromCol = columnIndex + 1;

    if (cell instanceof MergedColumnsCell) {
      gridArea = `${fromRow} / ${fromCol} / ${fromRow + 1} / ${fromCol + cell.columnsCount}`;
      scope = 'colgroup';
    } else if (cell instanceof MergedRowsCell) {
      gridArea = `${fromRow} / ${fromCol} / ${fromRow + cell.rowsCount} / ${fromCol + 1}`;
      scope = 'rowgroup';
    } else {
      gridArea = `${fromRow} / ${fromCol} / ${fromRow + 1} / ${fromCol + 1}`;
    }

    const { duration, delay } = this.calculateAnimationSettings();

    return sstyled(styles)(
      <SCellWrapper
        // @ts-ignore
        gridArea={gridArea}
        duration={`${duration}ms`}
        delay={`${delay}ms`}
        h={isAccordionRow ? (animationExpand ? `${calculatedHeight}px` : `0px`) : undefined}
        style={style}
        fixed={column.fixed}
        shadowVertical={column.showShadowVertical ? shadowVertical : undefined}
      >
        <SCell
          ref={this.cellRef}
          render={Flex}
          innerOutline
          tabIndex={-1}
          onKeyDown={this.handleFocusableCellKeyDown}
          onFocus={this.handleFocusableCellFocus}
          use:onClick={this.handleClickCell}
          name={cellName.toString()}
          role='gridcell'
          aria-colindex={columnIndex + 1}
          data-grouped-by={scope}
          scope={scope}
          aria-colspan={cell instanceof MergedColumnsCell ? cell.columnsCount : undefined}
          aria-rowspan={cell instanceof MergedRowsCell ? cell.rowsCount : undefined}
          gridArea={gridArea}
          borders={column.borders}
          flexWrap={column.flexWrap}
          alignItems={column.alignItems}
          alignContent={column.alignContent}
          justifyContent={column.justifyContent}
          textAlign={column.textAlign}
        >
          <Children />
        </SCell>
      </SCellWrapper>,
    );
  }
}

export const Cell = createComponent(CellRoot);
