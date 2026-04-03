import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

export type SpinSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

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
  /** Specifies the locale for i18n support */
  locale?: string;
};

declare const Spin: Intergalactic.Component<'div', SpinProps>;

export default Spin;
