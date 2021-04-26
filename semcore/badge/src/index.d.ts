import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface IBadgeProps extends IBoxProps {
  /** Fill color
   * @default mist
   * */
  bg?: 'mist' | 'cyan' | 'red' | 'orange' | 'green' | 'white' | string;

  /** Text color
   * @default white
   * */
  color?: 'white' | 'gray20' | string;
}

declare const Badge: <T>(props: CProps<IBadgeProps & T>) => ReturnEl;

export default Badge;
