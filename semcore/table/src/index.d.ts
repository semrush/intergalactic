import { CProps, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { ITextProps } from '@semcore/typography';
import { IScrollAreaProps } from '@semcore/scroll-area';

export interface ITableCtx {
  styles: { [key: string]: any };
  use: 'primary' | 'secondary' | false;
  self: { [key: string]: any };
}

export type RowTheme = 'info' | 'success' | 'warning' | 'danger' | 'default' | false;

export interface ITableProps extends IBoxProps {
  /**
   * @default primary
   */
  use?: ITableCtx['use'];
}

export interface ICellProps extends ITextProps {
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
}

export interface ITableCellHeadProps extends ICellProps {
  /** Responsible for the sort direction */
  sorting?: 'asc' | 'desc' | false;
  /** Responsible for the activity of the cell */
  active?: boolean;
}

export interface ITableCellRowProps extends ICellProps {
  /** Property responsible for highlighting the cell */
  highlighted?: boolean;
  /** Property responsible for the cell interactivity */
  interactive?: boolean;
  /** The cell theme */
  theme?: RowTheme;
}

export interface IStickyHeadProps extends IScrollAreaProps {
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
}

export interface ITableRowProps extends IBoxProps {
  /** Property responsible for the row interactivity */
  interactive?: boolean;
  /** The cell theme
   * @default default
   * */
  theme?: RowTheme;
}

declare const Table: (<T>(props: CProps<ITableProps & T, ITableCtx>) => ReturnEl) & {
  Head: typeof Box;
  Body: typeof Box;
  StickyHead: <T>(props: IStickyHeadProps & T) => ReturnEl;
  Row: <T>(props: ITableRowProps & T) => ReturnEl;
  Cell: <T>(props: ITableCellRowProps & T) => ReturnEl;
  CellHead: <T>(props: ITableCellHeadProps & T) => ReturnEl;
};

export default Table;
