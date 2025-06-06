import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';

/** @deprecated */
export interface IProgressBarProps extends ProgressBarProps, UnknownProperties {}
export type ProgressBarProps = BoxProps & {
  /**
   * Progress bar theme
   * @default invert
   */
  theme?: 'dark' | 'invert' | string;
  /**
   * Progress bar size
   * @default m
   */
  size?: 's' | 'm' | 'l';
  /** Value as a percentage */
  value?: number;
  /** Duration of animation, ms
   * @default 1000
   */
  duration?: number;
};

/** @deprecated */
export interface IValueProps extends ValueProps, UnknownProperties {}
export type ValueProps = BoxProps & {
  size?: 's' | 'm' | 'l';
  value?: number;
  duration?: number;
  theme?: string;
};

/** @deprecated */
export interface IProgressBarCxt extends ProgressBarCxt, UnknownProperties {}
export type ProgressBarCxt = {
  getValueProps: PropGetterFn;
};

declare const ProgressBar: Intergalactic.Component<'div', ProgressBarProps, ProgressBarCxt> & {
  Value: Intergalactic.Component<'div', ValueProps>;
};

export default ProgressBar;
