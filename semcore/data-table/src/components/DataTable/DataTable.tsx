import * as React from 'react';
import {
  Component,
  createComponent,
  Intergalactic,
  lastInteraction,
  Root,
  sstyled,
} from '@semcore/core';
import { Box, ScrollArea } from '@semcore/base-components';

import { DataTableProps, ColIndex, RowIndex } from './DataTable.types';
import { Head } from '../Head/Head';
import { Body } from '../Body/Body';
import { DataTableColumnProps, DTColumn } from '../Column/Column.types';

import style from './dataTable.shadow.css';
import { DTRow } from '../Body/Row.types';
import { findAllComponents } from '@semcore/core/lib/utils/findComponent';
import { isFocusInside, hasFocusableIn } from '@semcore/core/lib/utils/use/useFocusLock';

import { ReactElement } from 'react';
import syncScroll from '@semcore/core/lib/utils/syncScroll';
import { getFixedStyle, getScrollOffsetValue } from '../../utils';

class DataTableRoot extends Component<DataTableProps> {
  static displayName = 'DataTable';
  static style = style;

  static defaultProps = {
    use: 'primary',
    defaultGridTemplateColumnWidth: 'auto',
  };

  private columns: DTColumn[] = [];

  private focusedCell: [RowIndex, ColIndex] = [-1, -1];

  private tableRef = React.createRef<HTMLDivElement>();
  private scrollBodyRef: ReturnType<ReturnType<typeof syncScroll>>;
  private scrollHeadRef: ReturnType<ReturnType<typeof syncScroll>>;

  constructor(props: DataTableProps) {
    super(props);

    const createRef = syncScroll();
    // first create body ref for master scroll
    this.scrollBodyRef = createRef('body');
    this.scrollHeadRef = createRef('head');

    this.columns = this.calculateColumns();
  }

  get totalRows() {
    const { data, totalRows } = this.asProps;

    return totalRows ?? (data ?? []).length;
  }

  getHeadProps() {
    const { use } = this.asProps;

    return {
      columns: this.columns,
      use,
      scrollRef: this.scrollHeadRef,
    };
  }

  getBodyProps() {
    const { use } = this.asProps;

    return {
      columns: this.columns,
      rows: this.calculateRows(),
      use,
      scrollRef: this.scrollBodyRef,
    };
  }

  setInert(value: boolean) {
    const cells = this.tableRef.current?.querySelectorAll<HTMLDivElement>(
      '[role=gridcell], [role=columnheader]',
    );

    cells?.forEach((cell) => {
      if (value === true) {
        cell.setAttribute('inert', '');
      } else {
        cell.removeAttribute('inert');
      }
    });
  }

  getRow = (index: number) => {
    return index === 0
      ? this.tableRef.current?.querySelector('[role=row]')
      : this.tableRef.current?.querySelector(`[aria-rowindex="${index + 1}"]`);
  };

  hasFocusableInHeader = () => {
    const hasFocusable = this.columns.some((column) => {
      const columnElement = column.ref.current;

      return columnElement && hasFocusableIn(columnElement);
    });

    return hasFocusable;
  };

  changeFocusCell = (rowIndex: RowIndex, colIndex: ColIndex) => {
    const hasFocusable = this.hasFocusableInHeader();

    const maxCol = this.columns.length - 1;
    const maxRow = this.totalRows;

    const currentRow = this.tableRef.current?.querySelector(
      `[aria-rowindex="${this.focusedCell[0] + 1}"]`,
    );
    const headerRow = this.tableRef.current?.querySelector('[aria-rowindex="1"]');
    const headerCells = headerRow?.querySelectorAll('[role=columnheader]');
    const currentCell = currentRow?.querySelectorAll('[role=gridcell]').item(this.focusedCell[1]);
    const currentHeaderCell = headerCells?.item(this.focusedCell[1]);

    let changed = true;
    const newRow = this.focusedCell[0] + rowIndex;
    const newCol = this.focusedCell[1] + colIndex;

    if (
      ((hasFocusable && newRow < 0) || (!hasFocusable && newRow < 1) || newRow > maxRow) &&
      newRow !== this.focusedCell[0]
    ) {
      changed = false;
    }
    if ((newCol < 0 || newCol > maxCol) && newCol !== this.focusedCell[1]) {
      changed = false;
    }

    if (!changed) return;

    this.focusedCell = [newRow, newCol];

    const row = this.getRow(newRow);
    const cell = row?.querySelectorAll('[role=gridcell], [role=columnheader]').item(newCol);

    if (cell instanceof HTMLElement && currentCell !== cell) {
      currentCell?.setAttribute('inert', '');

      if (currentCell !== currentHeaderCell) {
        currentCell?.removeAttribute('aria-describedby');
      }

      const headerCell = headerCells?.item(newCol);
      const describedBy = headerCell?.getAttribute('aria-describedby');

      cell.removeAttribute('inert');
      if (headerCell !== cell && describedBy) {
        cell.setAttribute('aria-describedby', describedBy);
      }

      cell?.focus();

      if (newRow !== 0) {
        currentHeaderCell?.setAttribute('inert', '');
        const headerCell = headerCells?.item(newCol);

        headerCell?.removeAttribute('inert');
      }
    } else if (currentCell === cell) {
      this.changeFocusCell(rowIndex, colIndex);
    }
  };

  handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Tab': {
        this.setInert(true);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        this.changeFocusCell(0, -1);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        this.changeFocusCell(0, 1);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        this.changeFocusCell(-1, 0);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        this.changeFocusCell(1, 0);
        break;
      }
    }
  };

  initFocusableCell = () => {
    const hasFocusable = this.hasFocusableInHeader();

    if (hasFocusable) {
      this.focusedCell = [0, 0];
    } else {
      this.focusedCell = [1, 0];
    }
  };

  handleFocus = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (
      (!e.relatedTarget || !isFocusInside(e.currentTarget, e.relatedTarget)) &&
      lastInteraction.isKeyboard()
    ) {
      if (this.focusedCell[0] === -1 && this.focusedCell[1] === -1) {
        this.initFocusableCell();
      }

      this.setInert(true);

      let row = this.getRow(this.focusedCell[0]);

      if (!row) {
        this.initFocusableCell();
        row = this.getRow(this.focusedCell[0]);
      }

      const cell = row
        ?.querySelectorAll('[role=gridcell], [role=columnheader]')
        .item(this.focusedCell[1]);

      cell?.removeAttribute('inert');
      cell instanceof HTMLElement && cell.focus();

      e.currentTarget.setAttribute('tabIndex', '-1');
    }
  };

  handleBlur = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    const relatedTarget = e.relatedTarget;
    const tableElement = this.tableRef.current;

    if (
      tableElement &&
      (!relatedTarget ||
        !isFocusInside(tableElement, relatedTarget) ||
        !lastInteraction.isKeyboard())
    ) {
      this.setInert(false);
      tableElement.setAttribute('tabIndex', '0');
    }
  };

  handleMouseMove = () => {
    this.setInert(false);
  };

  render() {
    const SDataTable = Root;
    const { Children, styles } = this.asProps;

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(this.columns);

    return sstyled(styles)(
      <ScrollArea leftOffset={offsetLeftSum} rightOffset={offsetRightSum} w={'600px'}>
        <ScrollArea.Container tabIndex={-1}>
          <SDataTable
            render={Box}
            __excludeProps={['data']}
            ref={this.tableRef}
            role='grid'
            onKeyDown={this.handleKeyDown}
            onMouseMove={this.handleMouseMove}
            tabIndex={0}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            aria-rowcount={this.totalRows}
            aria-colcount={this.columns.length}
            gridTemplateColumns={this.columns.map((c) => c.gridColumnWidth).join(' ')}
          >
            <Children />
          </SDataTable>
        </ScrollArea.Container>

        <ScrollArea.Bar orientation='horizontal' />
        <ScrollArea.Bar orientation='vertical' />
      </ScrollArea>,
    );
  }

  private calculateColumns(): DTColumn[] {
    const { children } = this.props;
    const Columns = findAllComponents(children, ['Head.Column']);

    return Columns.map((c) => {
      return {
        name: c.props.name,
        ref: React.createRef<HTMLDivElement>(),
        gridColumnWidth: this.calculateGridTemplateColumn(c),
        fixed: c.props.fixed,
      };
    });
  }

  private calculateRows(): DTRow[] {
    const { data } = this.asProps;

    return data.map((row) => {
      return row;
    });
  }

  private calculateGridTemplateColumn(c: ReactElement<DataTableColumnProps>): string {
    return c.props.gtcWidth ?? this.props.defaultGridTemplateColumnWidth;
  }
}

export const DataTable = createComponent(DataTableRoot, {
  Head,
  Body,
}) as Intergalactic.Component<'div', DataTableProps> & {
  Head: typeof Head;
  Body: typeof Body;
};
