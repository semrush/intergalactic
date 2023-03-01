import { CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

type CssTimingFunction =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end';

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
  /** If it set to `true`, animated node is persisted in dom even if `visible=false`   */
  preserveNode?: boolean;
  /** Enables animation on first rendering
   * @default false
   */
  initialAnimation?: boolean;
  /**
   * @default ease-out
   */
  timingFunction?: CssTimingFunction;
  /**
   * @default false
   */
  animationsDisabled?: boolean;
}

export interface ICollapseProps extends IAnimationProps {
  /**
   * Add overflow=hidden when passing animation
   * @default true
   * */
  overflowHidden?: boolean;
}

export interface IFadeInOutProps extends IAnimationProps {}

export interface ITransformProps extends IAnimationProps {
  /** Animation effects
   * @default []
   */
  transform?: [string, string];
}

export interface IScaleProps extends IAnimationProps {
  /** Placement of appearing block
   */
  placement:
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
}

export interface ISlideProps extends IAnimationProps {
  /** Direction from which slide animation will be performed
   */
  slideOrigin?: 'top' | 'bottom' | 'left' | 'right';
}

declare const Animation: <T>(props: CProps<IAnimationProps & T>) => ReturnEl;
declare const Collapse: <T>(props: CProps<ICollapseProps & T>) => ReturnEl;
declare const FadeInOut: <T>(props: CProps<IFadeInOutProps & T>) => ReturnEl;
declare const Transform: <T>(props: CProps<ITransformProps & T>) => ReturnEl;
declare const Scale: <T>(props: CProps<IScaleProps & T>) => ReturnEl;
declare const Slide: <T>(props: CProps<ISlideProps & T>) => ReturnEl;

export { Animation, Collapse, FadeInOut, Transform, Scale, Slide };
