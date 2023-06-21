import { Intergalactic } from '@semcore/core';
import { Context } from './context';

/** @deprecated **/
export interface IReferenceLineProps extends ReferenceLineProps, UnknownProperties {}
export type ReferenceLineProps = Context & {
  /** The position of the title relative reference line
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value: any;
};

/** @deprecated **/
export interface IReferenceLineTitleProps extends ReferenceLineTitleProps, UnknownProperties {}
export type ReferenceLineTitleProps = Context & {
  /** The position of the axis relative reference line */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value: any;
};

/** @deprecated **/
export interface IReferenceLineBackgroundProps
  extends ReferenceLineBackgroundProps,
    UnknownProperties {}
export type ReferenceLineBackgroundProps = Context & {
  /** The position of the axis relative reference line */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value: any;
};

declare const ReferenceLine: Intergalactic.Component<'line', ReferenceLineProps, Context> & {
  Title: Intergalactic.Component<'text', ReferenceLineTitleProps, Context>;
  Background: Intergalactic.Component<'rect', ReferenceLineBackgroundProps, Context>;
};

export default ReferenceLine;
