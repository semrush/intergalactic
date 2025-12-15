import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { BoxProps, FlexProps } from '../flex-box';

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

export type RowProps = FlexProps & {
  /**
   * Gutter between columns
   * @default 0
   */
  gutter?: number;
};

export type GridContext = {
  getColProps: PropGetterFn;
};

export type RowType = Intergalactic.Component<'div', RowProps, GridContext> & {
  Col: Intergalactic.Component<'div', ColProps, RowProps>;
};
