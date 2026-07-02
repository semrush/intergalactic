import type { Options as OptionsArrow } from '@popperjs/core/lib/modifiers/arrow';
import type { Options as OptionsComputeStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import type { Options as OptionsEventListeners } from '@popperjs/core/lib/modifiers/eventListeners';
import type { Options as OptionsFlip } from '@popperjs/core/lib/modifiers/flip';
import type { Options as OptionsOffset } from '@popperjs/core/lib/modifiers/offset';
import type { Options as OptionsPreventOverflow } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { Options, Instance } from '@popperjs/core/lib/types';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { UniqueIDProps } from '@semcore/core/lib/utils/uniqueID';
import type { DOMAttributes } from 'react';

import type { ScaleProps } from '../animation';
import type { BoxProps } from '../flex-box';
import type { NSNeighborLocation } from '../neighbor-location';
import type { NSOutsideClick } from '../outside-click';
import type { NSPortal } from '../portal';

declare namespace NSPopper {
  type Strategy = Options['strategy'];
  type Modifiers = Options['modifiers'];
  type Placement = Options['placement'];
  type PopperComponent = 'trigger' | 'popper';
  type EventInteraction = {
    trigger: [Array<keyof DOMAttributes<unknown>>, Array<keyof DOMAttributes<unknown>>];
    popper: [Array<keyof DOMAttributes<unknown>>, Array<keyof DOMAttributes<unknown>>];
  };
  type Props = NSOutsideClick.Props &
    NSPortal.Props &
    UniqueIDProps &
    Omit<ScaleProps, 'placement' | 'preserveNode'> & {
      /**
       * Popper can have different positioning options
       * @default absolute
       */
      strategy?: NSPopper.Strategy;
      /**
       * Modifiers for popper.js
       */
      modifiers?: NSPopper.Modifiers;
      /**
       * The position of the popper relative to the trigger that called it.
       * 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
       * @default auto
       */
      placement?: NSPopper.Placement;
      /**
       * Interaction with a trigger to show and hide the popper
       * @default click
       */
      interaction?: 'click' | 'hover' | 'focus' | 'none' | NSPopper.EventInteraction;
      /** Timer to show and hide the popper */
      timeout?: number | [number, number];
      /** Popper visibility value */
      visible?: boolean;
      /** Default popper visibility
       * @default false */
      defaultVisible?: boolean;
      /** Function called when visibility changes */
      onVisibleChange?: (visible: boolean, e?: Event) => boolean | void;
      /** PopperJS modifier settings for popper indent */
      offset?: Partial<OptionsOffset> | number | [number, number];
      /** PopperJS modifier settings for finding borders */
      preventOverflow?: Partial<OptionsPreventOverflow>;
      /** PopperJS modifier settings responsible for the arrow */
      arrow?: Partial<OptionsArrow>;
      /** PopperJS modifier settings responsible for turning the popper when there is not enough space */
      flip?: Partial<OptionsFlip>;
      /** PopperJS modifier settings for applying styles */
      computeStyles?: Partial<OptionsComputeStyles>;
      /** PopperJS modifier settings responsible for subscribing to global events */
      eventListeners?: Partial<OptionsEventListeners>;
      /** Internal */
      onFirstUpdate?: Options['onFirstUpdate'];
      /**
       * Flag for disable Popover (if true, it will close Popper and it will not respond to handlers)
       * @default false
       */
      disabled?: boolean;
      /**
       * Disabled focus trap, autofocus and focus return
       */
      disableEnforceFocus?: boolean;
      /**
       * If enabled, after reaching the end of popper the browser focus goes to the start of popper and vice versa.
       * If disabled, after reading the end of popper the browser focus returns to trigger and popper is being closed.
       * @default `true` (`false` in Tooltip)
       */
      focusLoop?: boolean;
      /**
       * If enabled, you will need to use setTrigger function from children rendering function to set popper trigger.
       */
      explicitTriggerSet?: boolean;
      /**
       * If set, popper will be placed near the place mouse cursor entered the trigger
       */
      cursorAnchoring?: boolean;
      /** Sets a margin that reduces the maximum size of the popper  */
      popperMargin?: number;
    };
  type DefaultProps = {
    defaultVisible: false;
    placement: 'auto';
    modifiers: Props['modifiers'];
    arrow: {
      padding: 6;
    };
    strategy: 'absolute';
    interaction: 'click';
    timeout: 0;
    excludeRefs: Props['excludeRefs'];
    focusLoop: true;
    cursorAnchoring: false;
  };
  type Ctx = {
    getTriggerProps: PropGetterFn;
    getPopperProps: PropGetterFn;
    popper: React.MutableRefObject<Instance>;
    // Rename to setTriggerRef
    setTrigger: (ref: HTMLElement) => void;
    setPopper: (ref: HTMLElement) => void;
  };
  type Handlers = {
    visible: null;
  };

  namespace Trigger {
    type Props = BoxProps & {
      /**
       * Disabled focus trap, autofocus and focus return
       */
      disableEnforceFocus?: boolean;
    };
    type InnerProps = {
      /**
       * @deprecated
       */
      onKeyboardFocus: (event?: { currentTarget?: HTMLElement }) => void;
      highlighted: boolean;
      active: boolean;
      popperRef: React.MutableRefObject<HTMLElement>;
    };

    type Component = Intergalactic.Component<'div', Props, Ctx, [handlers: Handlers]>;
  }

  namespace Popper {
    type Props = BoxProps &
      NSPortal.Props &
      NSNeighborLocation.Props & {
        /**
         * Disabled focus trap, autofocus and focus return
         */
        disableEnforceFocus?: boolean;
        /** Automatically focus a popper when it opens */
        autoFocus?: boolean | 'enforced';
      };
    type InnerProps = {
      visible: boolean;
      triggerRef: React.RefObject<HTMLElement>;
      duration: number;
      animationsDisabled: boolean;
      popper: React.MutableRefObject<Instance | null>;
      focusMaster: boolean;
      handleFocusOut: () => void;
    };

    type Component = Intergalactic.Component<'div', Props, Ctx, [handlers: Handlers]>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx, [handlers: Handlers]> & {
    Trigger: Trigger.Component;
    Popper: Popper.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type PopperComponent = NSPopper.PopperComponent;
/** @deprecated It will be removed in v18. */
export type eventInteraction = NSPopper.EventInteraction;
/** @deprecated It will be removed in v18. */
export type Strategy = NSPopper.Strategy;
/** @deprecated It will be removed in v18. */
export type Modifiers = NSPopper.Modifiers;
/** @deprecated It will be removed in v18. */
export type Placement = NSPopper.Placement;
/** @deprecated It will be removed in v18. */
export type PopperProps = NSPopper.Props;
/** @deprecated It will be removed in v18. */
export type PopperDefaultProps = NSPopper.DefaultProps;
/** @deprecated It will be removed in v18. */
export type PopperTriggerProps = NSPopper.Trigger.Props;
/** @deprecated It will be removed in v18. */
export type InnerPopperTriggerProps = NSPopper.Trigger.InnerProps;
/** @deprecated It will be removed in v18. */
export type PopperPopperProps = NSPopper.Popper.Props;
/** @deprecated It will be removed in v18. */
export type InnerPopperPopperProps = NSPopper.Popper.InnerProps;
/** @deprecated It will be removed in v18. */
export type PopperContext = NSPopper.Ctx;
/** @deprecated It will be removed in v18. */
export type PopperHandlers = NSPopper.Handlers;

export type { NSPopper };
