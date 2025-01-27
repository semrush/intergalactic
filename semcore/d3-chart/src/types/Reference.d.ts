import type { UnknownProperties } from '@semcore/core';
import type { Context } from './context';
import type { IntergalacticD3Component } from './Plot';

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
export type ReferenceBackgroundProps = Context & {
  /** The position relative the `value` */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value?: any;
  /** Value of the background end */
  endValue?: number | string;
};
/** @deprecated use ReferenceBackgroundProps instead **/
export type ReferenceLineBackgroundProps = ReferenceBackgroundProps;

export type ReferenceStripesProps = Context & {
  /** The position relative the `value` */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value?: any;
  /** Value of the background end */
  endValue?: number | string;
};

export declare const ReferenceLine: IntergalacticD3Component<
  'line',
  ReferenceLineProps,
  Context
> & {
  Title: IntergalacticD3Component<'text', ReferenceLineTitleProps, Context>;
  /**
   * @deprecated use `ReferenceBackground` instead.
   */
  Background: IntergalacticD3Component<'rect', ReferenceLineBackgroundProps, Context>;
};
export declare const ReferenceBackground: IntergalacticD3Component<
  'rect',
  ReferenceLineBackgroundProps,
  Context
>;
export declare const ReferenceStripes: IntergalacticD3Component<
  'rect',
  ReferenceStripesProps,
  Context
>;
