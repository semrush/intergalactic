import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { Flex } from '@semcore/base-components';

import style from './style.shadow.css';
import { CellPropsInner, DataTableCellProps } from './Cell.types';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';

class CellRoot extends Component<DataTableCellProps, {}, {}, [], CellPropsInner> {
  static displayName = 'Cell';
  static style = style;

  lockedCell: [HTMLElement | null, boolean] = [null, false];

  handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.currentTarget === this.lockedCell[0]) {
      const focusableChildren = Array.from(this.lockedCell[0].children).flatMap((node) =>
        getFocusableIn(node as HTMLElement),
      );

      if (this.lockedCell[1]) {
        if (e.key === 'Escape') {
          this.lockedCell[0]?.focus();
          this.lockedCell[1] = false;
        }
        if (e.key.startsWith('Arrow')) {
          e.stopPropagation();
          e.preventDefault();
        }
        if (e.key === 'Tab') {
          if (e.target === focusableChildren[0] && e.shiftKey) {
            focusableChildren[focusableChildren.length - 1]?.focus();
            e.preventDefault();
          } else if (e.target === focusableChildren[focusableChildren.length - 1] && !e.shiftKey) {
            focusableChildren[0]?.focus();
            e.preventDefault();
          }
          e.stopPropagation();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        this.lockedCell[1] = true;
        focusableChildren[0]?.focus();
      }
    }
  };

  onFocusCell = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (e.target === e.currentTarget && e.target.matches(':focus-visible')) {
      e.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      const focusableChildren = Array.from(e.currentTarget.children).flatMap((node) =>
        getFocusableIn(node as HTMLElement),
      );

      if (focusableChildren.length === 1) {
        focusableChildren[0].focus();
      } else if (focusableChildren.length > 1) {
        this.lockedCell = [e.currentTarget, false];
      }
    }
  };

  render() {
    const SCell = Root;
    const { Children, styles, row, column, columnIndex, rowIndex } = this.asProps;

    const cell = row[column.name];
    const cellName = cell instanceof MergedColumnsCell ? cell.dataKey : column.name;

    let groupedBy: null | 'rows' | 'columns' = null;
    let gridArea: string | undefined = undefined;

    const fromRow = rowIndex + 2;
    const fromCol = columnIndex + 1;

    if (cell instanceof MergedColumnsCell) {
      gridArea = `${fromRow} / ${fromCol} / ${fromRow + 1} / ${fromCol + cell.columnsCount}`;
      groupedBy = 'columns';
    } else if (cell instanceof MergedRowsCell) {
      gridArea = `${cell.fromRow} / ${fromCol} / ${cell.toRow} / ${fromCol + 1}`;
      groupedBy = 'rows';
    }

    return sstyled(styles)(
      <SCell
        render={Flex}
        innerOutline
        tabIndex={-1}
        onKeyDown={this.handleKeyDown}
        onFocus={this.onFocusCell}
        name={cellName}
        role={'gridcell'}
        aria-colindex={columnIndex + 1}
        data-grouped-by={groupedBy}
        scope={groupedBy === 'columns' ? 'colgroup' : undefined}
        aria-colspan={cell instanceof MergedColumnsCell ? cell.columnsCount : undefined}
        aria-rowspan={cell instanceof MergedRowsCell ? cell.toRow - cell.fromRow : undefined}
        gridArea={gridArea}
        borders={column.borders}
        flexWrap={column.flexWrap}
        alignItems={column.alignItems}
        alignContent={column.alignContent}
        justifyContent={column.justifyContent}
        fixed={column.fixed}
      >
        <Children />
      </SCell>,
    );
  }
}

export const Cell = createComponent(CellRoot);
