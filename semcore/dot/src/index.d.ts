import { IBoxProps } from '@semcore/flex-box';
import { ReturnEl } from '@semcore/core';

export interface IDotProps extends IBoxProps {
  /** Size of the dot
   * @default m
   */
  size?: 'xl' | 'l' | 'm';
  /** Property for placing the Dot in the upper right corner of the component
   * @default false
   * */
  up?: boolean;
  /** The property for Dot visibility control */
  hidden?: boolean;
  /** Animation duration in ms
   * @default 0
   */
  duration?: number | [number, number];
  /** Animation titles */
  keyframes?: [string, string];
}

declare const Dot: <T>(props: IDotProps & T) => ReturnEl;

export default Dot;
