import type { Intergalactic } from '@semcore/core';

import type { NSBox } from '../flex-box';

declare namespace NSAnimation {
  type TimingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end';
  type StartCb = (duration: number) => void;
  type EndCb = () => void;
  type Props = NSBox.Props & {
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
    timingFunction?: NSAnimation.TimingFunction;
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
  type DefaultProps = {
    visible: false;
    duration: 0;
    delay: 0;
    keyframes: AnimationProps['keyframes'];
    initialAnimation: false;
    timingFunction: 'ease-out';
    animationsDisabled: false;
  };
  type State = {
    animationRunning: boolean;
    render: NSAnimation.Props['visible'] | NSAnimation.Props['preserveNode'];
    wasInvisible: NSAnimation.Props['visible'];
  };
  type Ctx<AnimationStartCb = NSAnimation.StartCb, AnimationEndCb = NSAnimation.EndCb> = {
    onAnimationStart: (callback: AnimationStartCb) => NSAnimation.EndCb;
    onAnimationEnd: (callback: AnimationEndCb) => NSAnimation.EndCb;
    onAnimationStartSubscribers: Array<AnimationStartCb>;
    onAnimationEndSubscribers: Array<AnimationEndCb>;
  };

  namespace Collapse {
    type Props = NSAnimation.Props & {
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

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace FadeInOut {
    type Props = NSAnimation.Props;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Transform {
    type Props = NSAnimation.Props & {
      /** Animation effects
       * @default []
       */
      transform?: [string, string];
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Scale {
    type Props = NSAnimation.Props & {
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

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Slide {
    type Props = NSAnimation.Props & {
      /** Direction from which slide animation will be performed
       */
      slideOrigin?: 'top' | 'bottom' | 'left' | 'right';
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type AnimationProps = NSAnimation.Props;
/** @deprecated It will be removed in v18. */
export type AnimationDefaultProps = NSAnimation.DefaultProps;
/** @deprecated It will be removed in v18. */
export type CollapseProps = NSAnimation.Collapse.Props;
/** @deprecated It will be removed in v18. */
export type FadeInOutProps = NSAnimation.FadeInOut.Props;
/** @deprecated It will be removed in v18. */
export type TransformProps = NSAnimation.Transform.Props;
/** @deprecated It will be removed in v18. */
export type ScaleProps = NSAnimation.Scale.Props;
/** @deprecated It will be removed in v18. */
export type SlideProps = NSAnimation.Slide.Props;

export type { NSAnimation };
