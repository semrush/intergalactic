import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IReferenceLineProps extends IContext {
  /** The position of the title relative reference line
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value: any;
}

export interface IReferenceLineTitleProps extends IContext {
  /** The position of the axis relative reference line */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value: any;
}

export interface IReferenceLineBackgroundProps extends IContext {
  /** The position of the axis relative reference line */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Value element of data */
  value: any;
}

declare const ReferenceLine: (<T>(props: CProps<IReferenceLineProps & T>) => ReturnEl) & {
  Title: <T>(props: CProps<IReferenceLineTitleProps & T>) => ReturnEl;
  Background: <T>(props: CProps<IReferenceLineBackgroundProps & T>) => ReturnEl;
};

export default ReferenceLine;
