import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface ICounterProps extends IBoxProps {
  /** A counter theme you can add your color to */
  theme?: string;

  /** Counter size
   * @default m */
  size?: 'm' | 'l' | 'xl';
}

declare const Counter: <T>(props: CProps<ICounterProps & T>) => ReturnEl;

export default Counter;
