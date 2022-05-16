import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export type SpinSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export interface ISpinProps extends IBoxProps {
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
}

declare const Spin: <T>(props: CProps<ISpinProps & T>) => ReturnEl;

export default Spin;
