import React from 'react';
import { Property } from 'csstype';
import createComponent, { Component, PropGetterFn, Root, sstyled } from '@semcore/core';
import { Box, IBoxProps, IFlexProps } from '@semcore/flex-box';
import syncScroll from '@semcore/utils/lib/syncScroll';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import fire from '@semcore/utils/lib/fire';
import { flattenColumns } from './utils';
import type {
  Column,
  NestedCells,
  PropsLayer,
  PseudoChildPropsGetter,
  RowData,
  SortDirection,
} from './types';
import Head from './Head';
import Body from './Body';

import style from './style/data-table.shadow.css';

const REVERSED_SORT_DIRECTION: { [direction in SortDirection]: SortDirection } = {
  desc: 'asc',
  asc: 'desc',
};
const DEFAULT_SORT_DIRECTION: SortDirection = 'desc';

const ROW_GROUP = Symbol('ROW_GROUP');

const cssVarReg = /[:;]/g;

const createCssVarForWidth = (name: string) => {
  return `--${name.replace(cssVarReg, '_')}_width`;
};

type AsProps = {
  use: 'primary' | 'secondary';
  sort: SortDirection[];
  data: RowData[];
  uniqueKey: string;
};

type HeadAsProps = {
  children: React.ReactChild;
};
type BodyAsProps = {
  children: React.ReactChild;
};

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactNode) | React.ReactNode;
};
type ReturnEl = React.ReactElement | null;
type ChildRenderFn<Props> = Props & {
  children?: (props: Props, column: DataTableData, index: number) => { [key: string]: unknown };
};
/* utils type */

export type DataTableData = { [key: string]: unknown };
export type DataTableSort = [string, 'desc' | 'asc'];
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

export interface IDataTableProps extends IBoxProps {
  /** Theme for table
   * @default primary
   * */
  use?: DataTableUse;
  /** Data for table */
  data?: DataTableData[];
  /** Active sort object */
  sort?: DataTableSort;
  /** Handler call when will request change sort */
  onSortChange?: (sort: DataTableSort, e?: React.SyntheticEvent) => void;
  /** Field name in one data entity that is unique accross all set of data
   * @default id
   */
  uniqueKey?: string;
}

export interface IDataTableHeadProps extends IBoxProps {
  /** Sticky header table
   * @deprecated
   * */
  sticky?: boolean;

  /** Hidden header */
  hidden?: boolean;

  /** Disabled scroll */
  disabledScroll?: boolean;
}

export interface IDataTableColumnProps extends IFlexProps {
  /** Unique name column */
  name?: string;
  /** Enable sort for column also if you pass string you can set default sort */
  sortable?: boolean | 'desc' | 'asc';
  /** Enable resize for column
   * @ignore */
  resizable?: boolean;
  /** Fixed column on the left/right */
  fixed?: 'left' | 'right';
  /** Fields to control the size of the column. */
  flex?: Property.Flex | 'inherit';
}

export interface IDataTableBodyProps extends IBoxProps {
  /** Rows table */
  rows?: DataTableRow[];
  /** When enabled, only visually acessable rows are rendered.
   * `tollerance` property controls how many rows outside of viewport are render.
   * `rowHeight` fixes the rows height if it known. If not provided, first row node height is measured.
   * @default { tollerance: 2 }
   */
  virtualScroll?: boolean | { tollerance?: number; rowHeight?: number };
  /**
   * Called every time user scrolls area
   */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /** Disabled scroll */
  disabledScroll?: boolean;
}

export interface IDataTableRowProps extends IBoxProps {
  /** Theme for row */
  theme?: DataTableTheme;
  /** Displays row as active/hover */
  active?: boolean;
}

export interface IDataTableCellProps extends IFlexProps {
  /** Unique name column or columns separated by / */
  name: string;
  /** Theme for cell */
  theme?: DataTableTheme;
}

class RootDefinitionTable extends Component<AsProps> {
  static displayName = 'DefinitionTable';

  static style = style;

  static defaultProps = {
    use: 'primary',
    uniqueKey: 'id',
    sort: [],
    data: [],
  } as AsProps;

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
        column.active ? REVERSED_SORT_DIRECTION[column.sortDirection] : column.sortDirection,
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
    for (const column of columns) {
      if (column.setVar) {
        this.tableRef.current?.style.setProperty(column.varWidth, `${column.width}px`);
      }
    }
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
        ...props
      } = child.props as Column['props'];
      const isGroup = !name;
      let columns: Column[] | undefined;

      if (isGroup) {
        columns = this.childrenToColumns(children, { fixed });
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
          return this.props.ref.current?.getBoundingClientRect().width || 0;
        },
        name,
        varWidth: createCssVarForWidth(name),
        setVar: flex !== 'inherit',
        fixed,
        resizable,
        active: sort[0] === name,
        sortable,
        sortDirection:
          sort[0] === name
            ? sort[1]
            : column?.sortDirection ||
              (typeof sortable == 'string' ? sortable : DEFAULT_SORT_DIRECTION),
        props: {
          name,
          flex: flex === 'inherit' ? undefined : flex,
          ...props,
          // @ts-ignore
          forwardRef: child.ref,
          children,
          ref: column?.props?.ref || React.createRef(),
        },
      } as Column;

      if (columns) {
        columnChildren.columns = columns;
      }
      columnsChildren.push(columnChildren);
    });
    return columnsChildren;
  }

  getHeadProps(props: HeadAsProps) {
    const { use } = this.asProps;
    const columnsChildren = this.childrenToColumns(props.children);
    this.columns = flattenColumns(columnsChildren);
    return {
      $onSortClick: callAllEventHandlers(this.handlerSortClick, this.scrollToUp),
      columnsChildren,
      use,
      onResize: this.handlerResize,
      $scrollRef: this.scrollHeadRef,
    };
  }

  getBodyProps(props: BodyAsProps) {
    const { data, use, uniqueKey } = this.asProps;

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
        const groupedColumns: { [columnname: string]: true } = {};
        const ungroupedColumns: { [columnname: string]: true } = {};
        for (const rowKey in row) {
          const columnNames = rowKey.split('/');
          if (columnNames.length >= 2) {
            for (const column of columnNames) {
              groupByName[column] = {
                groupedColumns: columnNames,
                groupData: row[rowKey] as { [columnName: string]: unknown },
              };
              groupedColumns[rowKey] = true;
            }
          } else {
            ungroupedColumns[rowKey] = true;
          }
        }
        const rowsGroup = row[ROW_GROUP] || [];
        const rowsGroupedNames = Object.fromEntries(
          rowsGroup
            .map((subRow) => Object.keys(subRow))
            .flat()
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
                ...ungroupedColumns,
                ...groupedColumns,
              });
            } else if (!exclude[column.name] && !rowsGroupedNames[column.name]) {
              return {
                name: column.name,
                cssVar: column.varWidth,
                fixed: column.fixed,
                data: null,
                cellPropsLayers: cellPropsLayers[column.name] || [],
              };
            }
          })
          .filter((column) => column !== undefined)
          .map((column) => column!);

        cells.flatRowData = row;
        return cells;
      });

    return parseData(data, {});
  }

  componentDidUpdate() {
    this.setVarStyle(this.columns);
  }

  render() {
    const SDataTable = Root;
    const { Children, styles, data } = this.asProps;

    return sstyled(styles)(
      <SDataTable
        render={Box}
        __excludeProps={['data']}
        ref={this.tableRef}
        role="table"
        aria-rowcount={(data ?? []).length}
      >
        <Children />
      </SDataTable>,
    );
  }
}

interface IDataTableCtx {
  getHeadProps: PropGetterFn;
  getBodyProps: PropGetterFn;
}

function ComponentDefinition() {
  return null;
}

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
) as (<T>(props: CProps<IDataTableProps & T, IDataTableCtx>) => ReturnEl) & {
  Head: <T>(props: IDataTableHeadProps & T) => ReturnEl;
  Body: <T>(props: IDataTableBodyProps & T) => ReturnEl;
  Column: <T>(props: IDataTableColumnProps & T) => ReturnEl;
  Cell: <T>(props: ChildRenderFn<IDataTableCellProps & T>) => ReturnEl;
  Row: <T>(props: ChildRenderFn<IDataTableRowProps & T>) => ReturnEl;
};

export { ROW_GROUP };
export default DefinitionTable;
