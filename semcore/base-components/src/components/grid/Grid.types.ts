import { PropGetterFn, Intergalactic, UnknownProperties } from '@semcore/core';
import { BoxProps, FlexProps } from '../flex-box';

/* utils type */

/** @deprecated */
export interface IColProps extends ColProps, UnknownProperties {}
export type ColProps = BoxProps & {
  /** Column size */
  span?: number | boolean | Array<number | boolean>;
  /** Column size on device with 1184px screen width and less */
  md?: number | boolean;
  /** Column width on device with 768px screen width and less */
  sm?: number | boolean;
  /** Column width on device with 414px screen width and less */
  xs?: number | boolean;
  /** Column offset, specified in the number of columns */
  offset?: number | Array<number>;
  /** Column offset on device with 1184px screen width and less */
  mdOffset?: number;
  /** Column offset on device with 768px screen width and less */
  smOffset?: number;
  /** Column offset on device with 414px screen width and less */
  xsOffset?: number;
  /** Column gutter, determined from Row */
  gutter?: number;
};

/** @deprecated */
export interface IRowProps extends RowProps, UnknownProperties {}
export type RowProps = FlexProps & {
  /**
   * Gutter between columns
   * @default 0
   */
  gutter?: number;
};

type GridContext = {
  getColProps: PropGetterFn;
};

declare const Row: Intergalactic.Component<'div', RowProps, GridContext> & {
  Col: Intergalactic.Component<'div', ColProps, RowProps>;
};
declare const Col: typeof Row.Col;

export { Row, Col };
