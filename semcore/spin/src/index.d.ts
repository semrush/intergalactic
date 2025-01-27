import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';

export type SpinSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

/** @deprecated */
export interface ISpinProps extends SpinProps, UnknownProperties {}
export type SpinProps = BoxProps & {
  /** Spinner size
   * @default m
   **/
  size?: SpinSize;
  /** Spinner theme. There are several default themes or you can use your own color
   * @default dark
   **/
  theme?: 'dark' | 'invert' | string;
  /** Whether the spinner should be in the center of the parent.
   * This works for a nested spinner in flex,
   * otherwise only horizontal alignment will occur.
   * */
  centered?: boolean;

  locale?: string;
};

declare const Spin: Intergalactic.Component<'div', SpinProps>;

export default Spin;
