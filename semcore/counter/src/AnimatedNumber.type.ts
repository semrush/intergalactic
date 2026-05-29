import type { Intergalactic } from '@semcore/core';

declare namespace NSAnimatedNumber {
  type Props = {
    /** Animates number change, receives value between 0 and 1 and returns value in range from 0 to 1, e.g. for linear easing pass (t) => t */
    easing?: (t: number) => number;
    /** Stringify number, receives a fraction value */
    formatValue?: (value: number) => string;
    /**
     * Duration time in ms
     * @default 200
     * */
    duration?: number;
    /**
     * Delay before animation in ms
     * @default 0
     * */
    delay?: number;
    /**
     * The value from which to start the animation
     * @default 0
     * */
    initValue?: number;
    /** The value by which to end the animation */
    value: number;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type AnimatedNumberBaseProps = NSAnimatedNumber.Props;

export type { NSAnimatedNumber };
