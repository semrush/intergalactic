import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { IBoxProps, IFlexProps } from '@semcore/flex-box';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactNode) | React.ReactNode;
};
type ReturnEl = React.ReactElement | null;

/* utils type */

export interface IColProps extends IBoxProps {
  /** Column size */
  span?: number | boolean | Array<number | boolean>;
  /** Column size on device with 992px screen width and less */
  md?: number | boolean;
  /** Column width on device with 768px screen width and less */
  sm?: number | boolean;
  /** Column width on device with 375px screen width and less */
  xs?: number | boolean;
  /** Column offset, specified in the number of columns */
  offset?: number | Array<number>;
  /** Column offset on device with 992px screen width and less */
  mdOffset?: number;
  /** Column offset on device with 768px screen width and less */
  smOffset?: number;
  /** Column offset on device with 375px screen width and less */
  xsOffset?: number;
  /** Column gutter, determined from Row */
  gutter?: number;
}

export interface IRowProps extends IFlexProps {
  /**
   * Gutter between columns
   * @default 0
   */
  gutter?: number;
}

interface IGridCtx extends IRowProps {
  getColProps: PropGetterFn;
}

declare const Row: (<T>(props: CProps<IRowProps & T, IGridCtx>) => ReturnEl) & {
  Col: <T>(props: CProps<IColProps & T, IRowProps>) => ReturnEl;
};
declare const Col: typeof Row.Col;

export { Row, Col };
