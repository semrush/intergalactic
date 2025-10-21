import { Root, sstyled } from '@semcore/core';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';
import * as React from 'react';

import type { DataTableCellProps } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import styles from './style.shadow.css';
import type { IFocusableCell, LockedCell } from '../../enhancers/focusableCell';
import { handleFocusCell, handleKeydownFocusCell } from '../../enhancers/focusableCell';
import type { DataTableData } from '../DataTable/DataTable.types';

export class Cell<Data extends DataTableData, UniqKeyType> extends React.PureComponent<DataTableCellProps<Data, UniqKeyType>> implements IFocusableCell {
  lockedCell: LockedCell = [null, false];

  static displayName = 'Cell';

  cellRef = React.createRef<HTMLDivElement>();

  componentWillUnmount() {
    const { virtualScroll, tableRef } = this.props;
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
    const { rowIndex, columnIndex, onClick, row } = this.props;

    onClick?.(e, { rowIndex, colIndex: columnIndex, row });
  };

  render() {
    const SCellWrapper = 'div';
    const SCell = Root;
    const {
      children,
      row,
      column,
      columnIndex,
      gridRowIndex,
      isAccordionRow,
      animationExpand,
      style = {},
      shadowVertical,
      calculatedHeight,
      use,
      duration,
      delay,
    } = this.props;

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

    style.height = isAccordionRow ? (animationExpand ? `${calculatedHeight}px` : `0px`) : undefined;

    return sstyled(styles)(
      <SCellWrapper
        // @ts-ignore
        gridArea={gridArea}
        duration={`${duration}ms`}
        delay={`${delay}ms`}
        style={style}
        fixed={column.fixed}
        shadowVertical={column.showShadowVertical ? shadowVertical : undefined}
      >
        <SCell
          ref={this.cellRef}
          render='div'
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
          use={use}
        >
          {children}
        </SCell>
      </SCellWrapper>,
    );
  }
}
