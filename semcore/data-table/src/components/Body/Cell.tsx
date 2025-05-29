import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { Box, Collapse, Flex } from '@semcore/base-components';

import style from './style.shadow.css';
import { CellPropsInner, DataTableCellProps } from './Cell.types';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';

const DEFAULT_ROW_DURATION = 50;

class CellRoot extends Component<DataTableCellProps, {}, {}, [], CellPropsInner> {
  static displayName = 'Cell';
  static style = style;

  cellRef = React.createRef<HTMLDivElement>();

  lockedCell: [HTMLElement | null, boolean] = [null, false];

  componentWillUnmount() {
    const { virtualScroll, tableRef } = this.asProps;
    if (virtualScroll && this.cellRef.current && isFocusInside(this.cellRef.current)) {
      tableRef.current?.setAttribute('tabIndex', '0');
    }
  }

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
        inline: 'center',
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
        gridArea={gridArea}
        tag={isAccordionRow ? Collapse : undefined}
        visible={animationExpand}
        interactive
        duration={duration}
        delay={delay}
        timingFunction={'linear'}
        defaultHeight={'100%'}
        style={style}
        fixed={column.fixed}
      >
        <SCell
          ref={this.cellRef}
          render={Flex}
          innerOutline
          tabIndex={-1}
          onKeyDown={this.handleKeyDown}
          onFocus={this.onFocusCell}
          name={cellName.toString()}
          role={'gridcell'}
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
        >
          <Children />
        </SCell>
      </SCellWrapper>,
    );
  }
}

export const Cell = createComponent(CellRoot);
