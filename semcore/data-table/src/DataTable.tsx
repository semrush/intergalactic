import React from 'react';
import { Property } from 'csstype';
import createComponent, {
  Component,
  PropGetterFn,
  Root,
  sstyled,
  UnknownProperties,
  Intergalactic,
} from '@semcore/core';
import { Box, BoxProps, FlexProps } from '@semcore/flex-box';
import syncScroll from '@semcore/utils/lib/syncScroll';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import fire from '@semcore/utils/lib/fire';
import { flattenColumns } from './utils';
import type {
  ColIndex,
  Column,
  NestedCells,
  PropsLayer,
  PseudoChildPropsGetter,
  RowData,
  RowIndex,
  SortDirection,
} from './types';
import Head from './Head';
import Body from './Body';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import style from './style/data-table.shadow.css';
import { isFocusInside } from '@semcore/utils/lib/use/useFocusLock';
import { hasFocusableIn } from '@semcore/utils/lib/use/useFocusLock';

const reversedSortDirection: { [direction in SortDirection]: SortDirection } = {
  desc: 'asc',
  asc: 'desc',
};
const defaultSortDirection: SortDirection = 'desc';

const ROW_GROUP = Symbol('ROW_GROUP');

const cssVarReg = /[:;\W]/g;

const createCssVarForWidth = (name: string) => {
  return `--${name.replace(cssVarReg, '_')}_width`;
};

type AsProps = {
  use: 'primary' | 'secondary';
  sort: SortDirection[];
  data: RowData[];
  totalRows?: number;
  uniqueKey: string;
  uid?: string;
  getI18nText?: (str: string) => string;
};

type HeadAsProps = {
  children: React.ReactChild;
  uid: string;
};
type BodyAsProps = {
  children: React.ReactChild;
  uid: string;
};

export type DataTableData = { [key: string]: unknown };
export type DataTableSort<Column = string> = [sortBy: Column, sortDirection: 'desc' | 'asc'];
export type DataTableTheme = 'muted' | 'info' | 'success' | 'warning' | 'danger';
export type DataTableUse = 'primary' | 'secondary';
export type DataTableRow = DataTableCell[];
export type DataTableCell = {
  /** Name of column */
  name: string;
  /** Data of column */
  data: React.ReactNode;
  [key: string]: unknown;
};

/**
 * Datatable must have an accessible name (aria-table-name).
 * It should describe table content.
 */
type DataTableAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
}>;

/** @deprecated */
export interface IDataTableProps<
  DataTableData extends { [key: string]: any }[] = UnknownProperties[],
> extends Omit<DataTableProps<DataTableData>, keyof DataTableAriaProps> {}
export type DataTableProps<DataTableData extends { [key: string]: any }[] = UnknownProperties[]> =
  BoxProps & {
    /** Table theme according to visual hierarchy on the page
     * @default primary
     * */
    use?: DataTableUse;
    /** Data for table */
    data?: DataTableData;
    /** Active sort object */
    sort?: DataTableSort<keyof DataTableData[0]>;
    /** Handler call when request will change sort */
    onSortChange?: (sort: DataTableSort<keyof DataTableData[0]>, e?: React.SyntheticEvent) => void;
    /** Field name in one data entity that is unique accross all dataset
     * @default id
     */
    uniqueKey?: keyof DataTableData[0];
    /** Make cells compact by changing left and right paddings to smaller ones*/
    compact?: boolean;
    /** Count of total rows if table using virtual scroll. Needs for accessibility */
    totalRows?: number;
  } & DataTableAriaProps;

/** @deprecated */
export interface IDataTableHeadProps extends DataTableHeadProps, UnknownProperties {}
export type DataTableHeadProps = BoxProps & {
  /** Sticky table header
   * @deprecated
   * */
  sticky?: boolean;

  /** Hidden header */
  hidden?: boolean;

  /** Disabled scroll (as action) */
  disabledScroll?: boolean;

  /** Enable scroll bar element in header */
  withScrollBar?: boolean;

  /** Disables column width change animation **/
  animationsDisabled?: boolean;
};

/** @deprecated */
export interface IDataTableColumnProps extends DataTableColumnProps, UnknownProperties {}
export type DataTableColumnProps = FlexProps & {
  /** Unique column name */
  name?: string;
  /** Enable sorting for column. And if you are passing a string, you can also set the default sorting */
  sortable?: boolean | 'desc' | 'asc';
  /** Enable resize for column
   * @ignore */
  resizable?: boolean;
  /** Fix column on the left o right side of the table */
  fixed?: 'left' | 'right';
  /** Fields to control the size of the column */
  flex?: Property.Flex | 'inherit';
  /** Add vertical border to the column */
  vBorders?: boolean;
  /** Add vertical border to the right side of the cell */
  borderRight?: boolean;
  /** Add vertical border to the left side of the cell */
  borderLeft?: boolean;
  /**
   * Enable changing column width with sort icon
   * @default false
   */
  changeSortSize?: boolean;
  /**
   * Enable column to use as a column for recalculation width
   * @default false (By default used first column with maximum width)
   */
  sortSizeRecalculation?: boolean;
};

/** @deprecated */
export interface IDataTableBodyProps extends DataTableBodyProps, UnknownProperties {}
export type DataTableBodyProps = BoxProps & {
  /** Rows table */
  rows?: DataTableRow[];
  /** When enabled, only visually acessable rows are rendered.
   * `tollerance` property controls how many rows outside of viewport are render.
   * `rowHeight` fixes the rows height if it has known. If not provided, first row node height is measured.
   * @default { tollerance: 2 }
   */
  virtualScroll?: boolean | { tollerance?: number; rowHeight?: number };
  /** Allows to redefine rows renderning for a very deep and even fragile customization like building custom virtual scrolling */
  renderRows?: (props: {
    rows: DataTableRow[];
    columns: Column[];
    renderRow: (row: DataTableRow, details: { dataIndex: number }) => React.ReactNode;
  }) => React.ReactNode;
  /**
   * Called every time user scrolls area
   */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /** Disabled scroll */
  disabledScroll?: boolean;

  /** Disables column width change animation **/
  animationsDisabled?: boolean;

  /** Ref for table body container */
  scrollContainerRef?: React.Ref<HTMLDivElement>;
};

/** @deprecated */
export interface IDataTableRowProps extends DataTableRowProps, UnknownProperties {}
export type DataTableRowProps = BoxProps & {
  /** Theme for row */
  theme?: DataTableTheme;
  /** Sets row state to active*/
  active?: boolean;
};

/** @deprecated */
export interface IDataTableCellProps extends DataTableCellProps, UnknownProperties {}
export type DataTableCellProps<Name extends string = string> = FlexProps & {
  /** Unique name for column or columns separated by / */
  name: Name;
  /** Theme for cell */
  theme?: DataTableTheme;
};

function setBorderGroupColumns(columns: Column[], side?: string) {
  const firstColumn = columns[0];
  const lastColumn = columns[columns.length - 1];
  if (firstColumn && (!side || side === 'left')) {
    firstColumn.borderLeft = true;
    if (firstColumn.columns) {
      setBorderGroupColumns(firstColumn.columns, 'left');
    }
  }
  if (lastColumn && (!side || side === 'right')) {
    lastColumn.borderRight = true;
    if (lastColumn.columns) {
      setBorderGroupColumns(lastColumn.columns, 'right');
    }
  }
}

class RootDefinitionTable extends Component<AsProps> {
  static displayName = 'DefinitionTable';

  static style = style;
  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)];

  static defaultProps = {
    use: 'primary',
    uniqueKey: 'id',
    sort: [],
    data: [],
  } as AsProps;

  focusedCell: [RowIndex, ColIndex] = [0, 0];
  cellsMap = new Map<RowIndex, Map<ColIndex, HTMLElement>>();
  lastInteraction: 'mouse' | 'keyboard' | null = null;

  columns: Column[] = [];

  tableRef = React.createRef<HTMLElement>();
  scrollBodyRef: null | ReturnType<ReturnType<typeof syncScroll>> = null;
  scrollHeadRef: null | ReturnType<ReturnType<typeof syncScroll>> = null;

  constructor(props: AsProps) {
    super(props);

    const createRef = syncScroll();
    // first create body ref for master scroll
    this.scrollBodyRef = createRef('body');
    this.scrollHeadRef = createRef('head');
  }

  handlerSortClick = (name: string, event: React.MouseEvent) => {
    const column = this.columns.find((column) => column.name === name)!;
    return fire(
      this,
      'onSortChange',
      [
        column.name,
        column.active ? reversedSortDirection[column.sortDirection] : column.sortDirection,
      ],
      event,
    );
  };

  handlerResize = () => {
    this.forceUpdate();
  };

  scrollToUp = () => {
    this.tableRef?.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    });
  };

  setVarStyle(columns: Column[]) {
    const animations = columns
      .flatMap((column) => column.props.ref.current?.getAnimations?.())
      .filter((a) => a !== undefined) as Animation[];

    let animationPromise: Promise<Animation[] | void> = Promise.resolve();

    if (animations.length > 0) {
      animationPromise = Promise.all(
        animations.map((animation) => {
          return animation.finished;
        }),
      );
    }

    animationPromise
      .then(() => {
        for (const column of columns) {
          if (column.setVar) {
            this.tableRef.current?.style.setProperty(column.varWidth, `${column.width}px`);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  childrenToColumns(
    children: React.ReactNode,
    options: { fixed?: 'left' | 'right' } = { fixed: undefined },
  ) {
    const { sort } = this.asProps;
    const columnsChildren: Column[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type !== DefinitionTable.Column) return;

      let {
        children,
        name,
        fixed = options.fixed,
        resizable,
        sortable,
        flex,
        vBorders,
        active,
        ...props
      } = child.props as Column['props'];
      const lastColumnChildren = columnsChildren[columnsChildren.length - 1];
      const isGroup = !name;
      let columns: Column[] | undefined;

      if (isGroup) {
        columns = this.childrenToColumns(children, { fixed });
        active = typeof active === 'boolean' ? active : columns.some((c) => c.active);

        if (vBorders) {
          setBorderGroupColumns(columns);
        }

        name = flattenColumns(columns)
          .map(({ name }) => name)
          .join('/');
        if (!columns.length) return;
        children = React.Children.toArray(children).filter(
          (child) => !(React.isValidElement(child) && child.type === DefinitionTable.Column),
        );
      }

      const column = this.columns.find((column) => column.name === name);
      const columnChildren = {
        get width() {
          // @ts-ignore
          return this.props.ref.current?.getBoundingClientRect().width || 0;
        },
        name,
        varWidth: createCssVarForWidth(name),
        setVar: flex !== 'inherit',
        fixed,
        resizable,
        active: typeof active === 'boolean' ? active : sort[0] === name,
        sortable,
        borderLeft: lastColumnChildren?.borderRight === true ? false : vBorders,
        borderRight: vBorders,
        sortDirection:
          sort[0] === name
            ? sort[1]
            : column?.sortDirection ||
              (typeof sortable === 'string' ? sortable : defaultSortDirection),
        props: {
          name,
          flex: flex === 'inherit' ? undefined : flex,
          ...props,
          // @ts-ignore
          forwardRef: child.ref,
          children,
          ref: column?.props?.ref || React.createRef(),
        },
        parentColumns: [],
      } as unknown as Column;

      if (columns) {
        columnChildren.columns = columns;
        columns.forEach((column) => column.parentColumns.unshift(columnChildren));
      }
      columnsChildren.push(columnChildren);
    });
    return columnsChildren;
  }

  getHeadProps(props: HeadAsProps) {
    const { use, uid, getI18nText } = this.asProps;
    const columnsChildren = this.childrenToColumns(props.children);

    this.columns = flattenColumns(columnsChildren);
    return {
      $onSortClick: callAllEventHandlers(this.handlerSortClick, this.scrollToUp),
      columnsChildren,
      use,
      onResize: this.handlerResize,
      $scrollRef: this.scrollHeadRef,
      uid,
      getI18nText,
    };
  }

  getBodyProps(props: BodyAsProps) {
    const { data, use, uniqueKey, uid } = this.asProps;
    const cellPropsLayers: { [columnName: string]: PropsLayer[] } = {};
    const rowPropsLayers: PropsLayer[] = [];

    React.Children.forEach(props.children, (child) => {
      if (React.isValidElement(child)) {
        const { name, children, ...other } = child.props as {
          name?: string;
          children?: PseudoChildPropsGetter;
        } & { [propName: string]: unknown };
        if (child.type === DefinitionTable.Cell && name) {
          name.split('/').forEach((name) => {
            cellPropsLayers[name] = cellPropsLayers[name] || [];
            cellPropsLayers[name].push({
              ...other,
              childrenPropsGetter: children,
            });
          });
        }
        if (child.type === DefinitionTable.Row) {
          rowPropsLayers.push({
            ...other,
            childrenPropsGetter: children,
          });
        }
      }
    });

    return {
      columns: this.columns,
      rows: this.dataToRows(data, cellPropsLayers),
      uniqueKey,
      use,
      rowPropsLayers,
      $scrollRef: this.scrollBodyRef,
      uid,
    };
  }

  dataToRows(data: RowData[], cellPropsLayers: { [columnName: string]: PropsLayer[] }) {
    const parseData = (data: RowData[], exclude: { [columnName: string]: true }) =>
      data.map((row) => {
        const groupByName: {
          [columnName: string]: {
            groupedColumns: string[];
            groupData: { [columnName: string]: unknown };
          };
        } = {};
        const columnsWithoutRowGroup: { [columnname: string]: true } = {};
        for (const rowKey in row) {
          const columnNames = rowKey.split('/');
          if (columnNames.length >= 2) {
            for (const column of columnNames) {
              groupByName[column] = {
                groupedColumns: columnNames,
                groupData: row[rowKey] as { [columnName: string]: unknown },
              };
              columnsWithoutRowGroup[column] = true;
            }
          } else {
            columnsWithoutRowGroup[rowKey] = true;
          }
        }

        const rowsGroup = row[ROW_GROUP] || [];
        const rowsGroupedNames = Object.fromEntries(
          rowsGroup
            .flatMap((subRow) => Object.keys(subRow))
            .flatMap((key) => key.split('/'))
            .map((key) => [key, true]),
        );

        let isGroup = false;

        const cells: NestedCells = this.columns
          .map((column) => {
            if (groupByName[column.name]) {
              const { groupedColumns, groupData } = groupByName[column.name];
              if (groupedColumns[0] === column.name) {
                return {
                  name: groupedColumns.join('/'),
                  cssVar: groupedColumns.map(createCssVarForWidth),
                  fixed: column.fixed,
                  data: groupData,
                  cellPropsLayers: cellPropsLayers[column.name] || [],
                };
              }
            } else if (column.name in row) {
              return {
                name: column.name,
                cssVar: column.varWidth,
                fixed: column.fixed,
                data: row[column.name],
                cellPropsLayers: cellPropsLayers[column.name] || [],
              };
            } else if (!isGroup && rowsGroupedNames[column.name]) {
              // TODO: make it work not only with first group
              isGroup = true;
              return parseData(rowsGroup, {
                ...exclude,
                ...columnsWithoutRowGroup,
              });
            } else if (!exclude[column.name] && !rowsGroupedNames[column.name]) {
              // add empty cell if it is not present in data
              return {
                name: column.name,
                cssVar: column.varWidth,
                fixed: column.fixed,
                data: null,
                cellPropsLayers: cellPropsLayers[column.name] || [],
              };
            }
          })
          .filter((column) => column)
          .map((column) => column!);

        cells.flatRowData = row;
        return cells;
      });

    return parseData(data, {});
  }

  componentDidMount() {
    this.setVarStyle(this.columns);
  }

  componentDidUpdate() {
    this.setVarStyle(this.columns);
  }

  get totalRows() {
    const { data, totalRows } = this.asProps;

    return totalRows ?? (data ?? []).length;
  }

  fillCells() {
    const rows = this.tableRef.current?.querySelectorAll<HTMLDivElement>('[role=row]');

    if (rows?.length) {
      rows.forEach((row, rowIndex) => {
        const rowCellsMap = new Map<ColIndex, HTMLElement>();

        const queriedRowCells = row.querySelectorAll<HTMLDivElement>(
          '[role=gridcell], [role=columnheader]',
        );

        let cellIndex = 0;

        queriedRowCells.forEach((cell) => {
          cell.setAttribute('inert', '');

          const cellName = cell.getAttribute('name');
          const columnsName = cellName?.split('/');

          if (columnsName && columnsName.length > 1) {
            columnsName.forEach(() => {
              rowCellsMap.set(cellIndex, cell);
              cellIndex = cellIndex + 1;
            });
          } else {
            rowCellsMap.set(cellIndex, cell);
            cellIndex = cellIndex + 1;
          }
        });

        this.cellsMap.set(rowIndex, rowCellsMap);
      });
    }
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

  hasFocusableInHeader = () => {
    const hasFocusable = this.columns.some((column) => {
      const columnElement = column.props.ref.current;

      return column.sortable || (columnElement && hasFocusableIn(columnElement));
    });

    return hasFocusable;
  };

  changeFocusCell = (rowIndex: RowIndex, colIndex: ColIndex) => {
    const hasFocusable = this.hasFocusableInHeader();

    const maxCol = this.columns.length - 1;
    const maxRow = this.totalRows;

    const currentRow = this.cellsMap.get(this.focusedCell[0]);
    const currentCell = currentRow?.get(this.focusedCell[1]);
    const currentHeaderCell = this.cellsMap.get(0)?.get(this.focusedCell[1]);

    let changed = true;
    let newRow = this.focusedCell[0] + rowIndex;
    let newCol = this.focusedCell[1] + colIndex;

    if (
      ((hasFocusable && newRow < 0) || (!hasFocusable && newRow < 1) || newRow > maxRow) &&
      newRow !== this.focusedCell[0]
    ) {
      newRow = this.focusedCell[0];
      changed = false;
    }
    if ((newCol < 0 || newCol > maxCol) && newCol !== this.focusedCell[1]) {
      newCol = this.focusedCell[1];
      changed = false;
    }

    if (!changed) return;

    this.focusedCell = [newRow, newCol];

    const row = this.cellsMap.get(newRow);
    const cell = row?.get(newCol);

    if (cell && currentCell !== cell) {
      currentCell?.setAttribute('inert', '');

      if (currentCell !== currentHeaderCell) {
        currentCell?.removeAttribute('aria-describedby');
      }

      const headerCell = this.cellsMap.get(0)?.get(newCol);
      const describedBy = headerCell?.getAttribute('aria-describedby');

      cell.removeAttribute('inert');
      if (headerCell !== cell && describedBy) {
        cell.setAttribute('aria-describedby', describedBy);
      }

      cell?.focus();

      if (newRow !== 0) {
        currentHeaderCell?.setAttribute('inert', '');
        const headerCell = this.cellsMap.get(0)?.get(newCol);

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

  handleFocus = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (!e.relatedTarget || !isFocusInside(e.currentTarget, e.relatedTarget)) {
      if (this.cellsMap.size === 0) {
        this.fillCells();

        const hasFocusable = this.hasFocusableInHeader();

        if (hasFocusable) {
          this.focusedCell = [0, 0];
        } else {
          this.focusedCell = [1, 0];
        }
      }

      this.setInert(true);

      const row = this.cellsMap.get(this.focusedCell[0]);
      const cell = row?.get(this.focusedCell[1]);

      cell?.removeAttribute('inert');
      cell?.focus();

      e.currentTarget.setAttribute('tabIndex', '-1');
    }
  };

  handleBlur = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (!e.relatedTarget || !isFocusInside(e.currentTarget, e.relatedTarget)) {
      this.setInert(false);
      e.currentTarget.setAttribute('tabIndex', '0');
    }
  };

  handleMouseMove = () => {
    this.lastInteraction = 'mouse';
    this.setInert(false);
  };

  render() {
    const SDataTable = Root;
    const { Children, styles } = this.asProps;

    return sstyled(styles)(
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
      >
        <Children />
      </SDataTable>,
    );
  }
}

type DataTableCtx = {
  getHeadProps: PropGetterFn;
  getBodyProps: PropGetterFn;
};

function ComponentDefinition() {
  return null;
}

type IntergalacticDataTableComponent<PropsExtending extends {} = {}> = (<
  Data extends DataTableData[],
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    'div',
    DataTableProps<Data> & PropsExtending,
    DataTableCtx,
    never
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableProps>;

type IntergalacticDataTableRowComponent<PropsExtending extends {} = {}> = (<
  Data extends DataTableData[],
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.PropsRenderingResultComponentProps<
    Tag,
    DataTableRowProps & {
      /**
       * That property is ONLY used for the component strict typings. In the component runtime `data` prop set on `<DataTable>...</DataTable> is used.
       */
      data?: Data;
    } & PropsExtending,
    DataTableCtx & { data: Data },
    [row: Data[0], index: number]
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableRowProps>;

type IntergalacticDataTableCellComponent<PropsExtending extends {} = {}> = (<
  Data extends DataTableData[] = [],
  Name extends string = string,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.PropsRenderingResultComponentProps<
    Tag,
    DataTableCellProps<Name> & {
      /**
       * That property is ONLY used for the componenct strict typings. In the component runtime `data` prop set on `<DataTable>...</DataTable> is used.
       */
      data?: Data;
    } & PropsExtending,
    DataTableCtx & { data: Data },
    [row: Data[0], index: number]
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableCellProps>;

const DefinitionTable = createComponent(
  RootDefinitionTable,
  {
    Head,
    Body,
    Column: ComponentDefinition,
    Cell: ComponentDefinition,
    Row: ComponentDefinition,
  },
  {},
) as IntergalacticDataTableComponent & {
  Head: Intergalactic.Component<'div', DataTableHeadProps>;
  Body: Intergalactic.Component<'div', DataTableBodyProps>;
  Column: Intergalactic.Component<'div', DataTableColumnProps>;
  Row: IntergalacticDataTableRowComponent;
  Cell: IntergalacticDataTableCellComponent;
};

export { ROW_GROUP };
export default DefinitionTable;

export const wrapDataTable = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticDataTableComponent>
    > &
      PropsExtending,
  ) => React.ReactNode,
): IntergalacticDataTableComponent<PropsExtending> => wrapper as any;

export const wrapDataTableRow = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticDataTableRowComponent>
    > &
      PropsExtending,
  ) => React.ReactNode,
): IntergalacticDataTableRowComponent<PropsExtending> => wrapper as any;

export const wrapDataTableCell = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticDataTableCellComponent>
    > &
      PropsExtending,
  ) => React.ReactNode,
): IntergalacticDataTableCellComponent<PropsExtending> => wrapper as any;
