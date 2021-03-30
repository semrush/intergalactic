import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

export interface IAnimationProps extends IBoxProps {
  /** The property is responsible for the visibility of the element */
  visible?: boolean;
  /** Animation duration in ms
   * @default 0
   */
  duration?: number | [number, number];
  /** Animation delay in ms
   * @default 0
   */
  delay?: number | [number, number];
  /** Animation titles */
  keyframes?: [string, string];
}

export interface ICollapseProps extends IAnimationProps {}

export interface IFadeInOutProps extends IAnimationProps {}

export interface ITransformProps extends IAnimationProps {
  /** Animation effects
   * @default []
   */
  transform?: [string, string];
}

declare const Animation: <T>(props: CProps<IAnimationProps & T>) => ReturnEl;

declare const Collapse: <T>(props: CProps<ICollapseProps & T>) => ReturnEl;

declare const FadeInOut: <T>(props: CProps<IFadeInOutProps & T>) => ReturnEl;

declare const Transform: <T>(props: CProps<ITransformProps & T>) => ReturnEl;

export default Animation;

export { Collapse, FadeInOut, Transform };
