import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';
import type { TextProps } from '@semcore/typography';
import type { ScrollAreaProps } from '@semcore/scroll-area';

/** @deprecated */
export interface ITableCtx extends TableCtx, UnknownProperties {}
export type TableCtx = {
  styles: { [key: string]: any };
  use: 'primary' | 'secondary' | false;
  self: { [key: string]: any };
};

export type RowTheme = 'info' | 'success' | 'warning' | 'danger' | 'default' | false;

/** @deprecated */
export interface ITableProps extends TableProps, UnknownProperties {}
export type TableProps = BoxProps & {
  /**
   * @default primary
   */
  use?: ITableCtx['use'];
  /** Make cells less */
  compact?: boolean;
};

/** @deprecated */
export interface ICellProps extends CellProps, UnknownProperties {}
export type CellProps = TextProps & {
  /** Positioning content horizontally in a cell
   * @default left
   */
  align?: 'left' | 'right' | 'center' | false;
  /** Positioning content vertically in a cell
   * @default middle
   */
  valign?: 'top' | 'bottom' | 'middle' | false;
  /**
   * @default primary
   */
  use?: 'primary' | 'secondary' | false;
  /** Add vertical border to the right of the cell
   * @default false
   */
  borderRight?: boolean;
  /** Add vertical border to the left of the cell
   * @default false
   */
  borderLeft?: boolean;
};

/** @deprecated */
export interface ITableCellHeadProps extends TableCellHeadProps, UnknownProperties {}
export type TableCellHeadProps = CellProps & {
  /** Responsible for the sort direction */
  sorting?: 'asc' | 'desc' | false;
  /** Responsible for the activity of the cell */
  active?: boolean;
};

/** @deprecated */
export interface ITableCellRowProps extends TableCellRowProps, UnknownProperties {}
export type TableCellRowProps = CellProps & {
  /** Property responsible for highlighting the cell */
  highlighted?: boolean;
  /** Property responsible for the cell interactivity */
  interactive?: boolean;
  /** The cell theme */
  theme?: RowTheme;
};

/** @deprecated */
export interface IStickyHeadProps extends StickyHeadProps, UnknownProperties {}
export type StickyHeadProps = ScrollAreaProps & {
  /** HTML element, which is used for table scrolling */

  container?: HTMLElement;
  /** Spacing at a top of a table when fixing it
   * @default 0
   */
  top?: string | number;
  /** Bottom padding when fixing a table
   * @default 0
   */
  bottom?: string | number;
  /** Handler that is called when the fixed position is changed */
  onFixed?: (positionFixed: string) => void;

  /**
   * If enabled, header will be rendered without portal to the end of table container
   * @default false
   */
  disablePortal?: boolean;
};

/** @deprecated */
export interface ITableRowProps extends TableRowProps, UnknownProperties {}
export type TableRowProps = BoxProps & {
  /** Property responsible for the row interactivity */
  interactive?: boolean;
  /** The cell theme
   * @default default
   * */
  theme?: RowTheme;
};

/**
 * @deprecated Please, use package `intergalactic/data-table` instead. Package `@semcore/table` is deprecated.
 */
declare const Table: Intergalactic.Component<'table', TableProps, TableCtx> & {
  Head: Intergalactic.Component<'thead', BoxProps>;
  Body: Intergalactic.Component<'tbody', BoxProps>;
  StickyHead: Intergalactic.Component<'thead', StickyHeadProps>;
  Row: Intergalactic.Component<'tr', TableRowProps>;
  Cell: Intergalactic.Component<'td', TableCellRowProps>;
  CellHead: Intergalactic.Component<'td', TableCellHeadProps>;
};

/**
 * @deprecated Please, use package `intergalactic/data-table` instead. Package `@semcore/table` is deprecated.
 */
declare const Consumer: React.Consumer<ITableCtx>;

export default Table;
export { Consumer };
