import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
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

declare const ReferenceLine: (<T>(props: MapProps<IReferenceLineProps & T>) => ReturnEl) & {
  Title: <T>(props: MapProps<IReferenceLineTitleProps & T>) => ReturnEl;
  Background: <T>(props: MapProps<IReferenceLineBackgroundProps & T>) => ReturnEl;
};

export default ReferenceLine;
