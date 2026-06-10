import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root, sstyled, createComponent, Component } from '@semcore/core';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';
import { isInteractiveElement } from '@semcore/core/lib/utils/isInteractiveElement';
import * as React from 'react';

import type { DataTableCellProps, DataTableCellType } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import styles from './style.shadow.css';
import type { IFocusableCell, LockedCell } from '../../enhancers/focusableCell';
import { handleFocusCell, handleKeydownFocusCell } from '../../enhancers/focusableCell';
import type { DataTableData } from '../DataTable/DataTable.types';

class CellRoot<Data extends DataTableData, UniqKeyType>
  extends Component<DataTableCellProps<Data, UniqKeyType>>
  implements IFocusableCell {
  lockedCell: LockedCell = [null, false];

  static displayName = 'Cell';
  static style = styles;

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

  handleClickCell = (e: React.SyntheticEvent<HTMLElement>) => {
    const { rowIndex, columnIndex, onClick, row, accordionRowIndex } = this.asProps;

    const rowElement = e.currentTarget.parentElement?.parentElement;
    const ariaRowindex = Number(rowElement?.getAttribute('aria-rowindex'));
    let rowIndexValue = accordionRowIndex === undefined ? rowIndex : rowIndex + 1 + accordionRowIndex;

    if (!isNaN(ariaRowindex)) {
      rowIndexValue = ariaRowindex - 2;
    }

    const focusableChildren = Array.from(this.cellRef.current?.children ?? []).flatMap((node) =>
      getFocusableIn(node as HTMLElement),
    );

    if (isInteractiveElement(e.target) && this.cellRef.current && focusableChildren.length > 1) {
      this.lockedCell[0] = this.cellRef.current;
      this.lockedCell[1] = true;
    }

    onClick?.(e, { rowIndex: rowIndexValue, colIndex: columnIndex, row });
  };

  render() {
    const SCellWrapper = Box;
    const SCell = Root;
    const {
      Children,
      styles,
      style,
      row,
      column,
      columnIndex,
      gridRowIndex,
      shadowVertical,
    } = this.asProps;

    const cell = row[column.name];
    const cellName = cell instanceof MergedColumnsCell ? cell.dataKey : column.name;

    let scope: null | 'rowgroup' | 'colgroup' = null;
    let gridArea: string | undefined = undefined;

    const fromRow = gridRowIndex;
    const fromCol = columnIndex + 1;

    if (cell instanceof MergedColumnsCell) {
      if (cell.value instanceof MergedRowsCell) {
        gridArea = `${fromRow} / ${fromCol} / ${fromRow + cell.value.rowsCount} / ${fromCol + cell.columnsCount}`;
        scope = 'rowgroup';
      } else {
        gridArea = `${fromRow} / ${fromCol} / ${fromRow + 1} / ${fromCol + cell.columnsCount}`;
        scope = 'colgroup';
      }
    } else if (cell instanceof MergedRowsCell) {
      gridArea = `${fromRow} / ${fromCol} / ${fromRow + cell.rowsCount} / ${fromCol + 1}`;
      scope = 'rowgroup';
    } else {
      gridArea = `${fromRow} / ${fromCol} / ${fromRow + 1} / ${fromCol + 1}`;
    }

    return sstyled(styles)(
      <SCellWrapper
        // @ts-ignore
        gridArea={gridArea}
        fixed={column.fixed}
        style={style}
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
          aria-rowspan={cell instanceof MergedRowsCell
            ? cell.rowsCount
            : cell instanceof MergedColumnsCell && cell.value instanceof MergedRowsCell
              ? cell.value.rowsCount
              : undefined}
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

export const Cell = createComponent<
  DataTableCellType,
  typeof CellRoot
>(CellRoot);
