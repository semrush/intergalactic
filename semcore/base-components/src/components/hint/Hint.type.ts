import { type Placement } from '@floating-ui/dom';
import type { Intergalactic } from '@semcore/core';
import type { DataType } from 'csstype';
import type React from 'react';

declare namespace NSHint {
  type Props = {
    /** Ref to the trigger element */
    triggerRef: React.RefObject<HTMLElement | null>;
    /**
     * The position of the popper relative to the trigger that called it.
     * @default top
     */
    placement?: Placement;
    /**
     * Timer to show and hide the popper
     * @default [500, 500]
     */
    timeout?: DefaultProps['timeout'];
    /**
     * Hint content.
     * Better to use here some short text.
     * */
    children: React.ReactNode;

    /** Popper visibility value */
    visible?: boolean;
    /** Default popper visibility
     * @default false */
    defaultVisible?: boolean;
    /** Function called when visibility changes */
    onVisibleChange?: (visible: boolean, e?: Event) => boolean | void;
    /**
     * Set ignore for portal stacking
     * @default true
     */
    ignorePortalsStacking?: boolean;
  };
  type InnerProps = {
    timingFunction: DataType.EasingFunction;
  };
  type DefaultProps = {
    defaultVisible?: boolean;
    timeout: number | [number, number];
    timingFunction: DataType.EasingFunction;
    placement?: Placement;
    ignorePortalsStacking?: boolean;
  };
  type State = {
    innerVisible: boolean | null;
    calculatedPlacement?: Placement;
  };
  type Handlers = {
    visible: null;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type SimpleHintPopperProps = NSHint.Props;

export type { NSHint };
