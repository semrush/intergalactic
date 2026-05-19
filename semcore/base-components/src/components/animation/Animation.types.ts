import type { UnknownProperties, Intergalactic } from '@semcore/core';

import type { BoxProps } from '../flex-box';

type CssTimingFunction =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end';

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

  /** Animation effects
   * @default undefined
   * @internal
   */
  transformStart?: string;
  /** Animation effects
   * @default undefined
   * @internal
   */
  transformEnd?: string;
};

export type AnimationDefaultProps = {
  visible: false;
  duration: 0;
  delay: 0;
  keyframes: AnimationProps['keyframes'];
  initialAnimation: false;
  timingFunction: 'ease-out';
  animationsDisabled: false;
};

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

  /** @deprecated It will be removed in v18. */
  onAnimationStart?: React.AnimationEventHandler;
  /** @deprecated It will be removed in v18. */
  onAnimationEnd?: React.AnimationEventHandler;
};

export type FadeInOutProps = AnimationProps & {};

export type TransformProps = AnimationProps & {
  /** Animation effects
   * @default []
   */
  transform?: [string, string];
};

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

export type SlideProps = AnimationProps & {
  /** Direction from which slide animation will be performed
   */
  slideOrigin?: 'top' | 'bottom' | 'left' | 'right';
};

type DisposeSubscription = () => void;

export type AnimationContext<
  AnimationStartCb = (duration: number) => void,
  AnimationEndCb = () => void,
> = {
  onAnimationStart: (callback: AnimationStartCb) => DisposeSubscription;
  onAnimationEnd: (callback: AnimationEndCb) => DisposeSubscription;
  onAnimationStartSubscribers: Array<AnimationStartCb>;
  onAnimationEndSubscribers: Array<AnimationEndCb>;
};

export type animationContext = React.Context<AnimationContext>;
export type Animation = Intergalactic.Component<'div', AnimationProps>;
export type Collapse = Intergalactic.Component<'div', CollapseProps>;
export type FadeInOut = Intergalactic.Component<'div', FadeInOutProps>;
export type Transform = Intergalactic.Component<'div', TransformProps>;
export type Scale = Intergalactic.Component<'div', ScaleProps>;
export type Slide = Intergalactic.Component<'div', SlideProps>;
