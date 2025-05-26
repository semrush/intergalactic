import { UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '../flex-box';

type CssTimingFunction =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end';

/** @deprecated */
export interface IAnimationProps extends AnimationProps, UnknownProperties {}
export type AnimationProps = BoxProps & {
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
};

/** @deprecated */
export interface ICollapseProps extends CollapseProps, UnknownProperties {}
export type CollapseProps = AnimationProps & {
  /**
   * Add overflow=clip when passing animation
   * @default true
   * */
  overflowHidden?: boolean;

  /**
   * Value for height after animation
   * @default auto
   */
  defaultHeight?: 'auto' | '100%';
};

/** @deprecated */
export interface IFadeInOutProps extends FadeInOutProps, UnknownProperties {}
export type FadeInOutProps = AnimationProps & {};

/** @deprecated */
export interface ITransformProps extends TransformProps, UnknownProperties {}
export type TransformProps = AnimationProps & {
  /** Animation effects
   * @default []
   */
  transform?: [string, string];
};

/** @deprecated */
export interface IScaleProps extends ScaleProps, UnknownProperties {}
export type ScaleProps = AnimationProps & {
  /** Placement of appearing block
   */
  placement?:
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
};

/** @deprecated */
export interface ISlideProps extends SlideProps, UnknownProperties {}
export type SlideProps = AnimationProps & {
  /** Direction from which slide animation will be performed
   */
  slideOrigin?: 'top' | 'bottom' | 'left' | 'right';
};

type DisposeSubscription = () => void;

export type AnimationContext = {
  onAnimationStart: (callback: (duration: number) => void) => DisposeSubscription;
  onAnimationEnd: (callback: () => void) => DisposeSubscription;
};

declare const animationContext: React.Context<AnimationContext>;
declare const Animation: Intergalactic.Component<'div', AnimationProps>;
declare const Collapse: Intergalactic.Component<'div', CollapseProps>;
declare const FadeInOut: Intergalactic.Component<'div', FadeInOutProps>;
declare const Transform: Intergalactic.Component<'div', TransformProps>;
declare const Scale: Intergalactic.Component<'div', ScaleProps>;
declare const Slide: Intergalactic.Component<'div', SlideProps>;

export { Animation, Collapse, FadeInOut, Transform, Scale, Slide, animationContext };
