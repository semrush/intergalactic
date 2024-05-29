import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { IntergalacticD3Component } from './Plot';

/** @deprecated **/
export interface IReferenceLineProps extends ReferenceLineProps, UnknownProperties {}
export type ReferenceLineProps = Context & {
  /** The position of the title relative reference line
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value?: any;

  title?: string;
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
  value?: any;
  /** Value of the background end */
  endValue?: number | string;
};

export type ReferenceLineStripesProps = ReferenceLineBackgroundProps;

declare const ReferenceLine: IntergalacticD3Component<'line', ReferenceLineProps, Context> & {
  Title: IntergalacticD3Component<'text', ReferenceLineTitleProps, Context>;
  Background: IntergalacticD3Component<'rect', ReferenceLineBackgroundProps, Context>;
  Stripes: IntergalacticD3Component<'rect', ReferenceLineStripesProps, Context>;
};

export default ReferenceLine;
