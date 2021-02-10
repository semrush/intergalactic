import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface ILineProps extends IContext {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Line generators
   * @default d3.line() */
  d3?: Line<Datum>;
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
}

export interface ILineDotsProps extends IContext {
  /** Show all Dot */
  display?: boolean;
  /** Hide property */
  hide?: boolean;
  /** Index active of element */
  activeIndex?: number;
}

export interface ILineDotsContext {
  /** Value element of data */
  value?: any;
  /** Index element of data */
  index?: number;
}

export interface ILineNullProps extends IContext {
  /** Hide property */
  hide?: boolean;
}

declare const Line: (<T>(props: CProps<ILineProps & T>) => ReturnEl) & {
  Dots: <T>(props: CProps<ILineDotsProps & T, ILineDotsContext>) => ReturnEl;
  Null: <T>(props: CProps<ILineNullProps & T>) => ReturnEl;
};

export default Line;
