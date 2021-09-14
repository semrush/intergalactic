import { IBoxProps } from '@semcore/flex-box';
import { ReturnEl } from '@semcore/core';
import { IAnimationProps } from '@semcore/animation';

export interface IDotProps extends IBoxProps, IAnimationProps {
  /** Size of the dot
   * @default m
   */
  size?: 'm' | 'l';
  /** Property for placing the Dot in the upper right corner of the component
   * @default false
   * */
  up?: boolean;
  /** The property for Dot visibility control */
  hidden?: boolean;
}

declare const Dot: <T>(props: IDotProps & T) => ReturnEl;

export default Dot;
