import type { DOMAttributes } from 'react';
import type { Options, Instance } from '@popperjs/core/lib/types';
import type { Options as OptionsOffset } from '@popperjs/core/lib/modifiers/offset';
import type { Options as OptionsPreventOverflow } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { Options as OptionsArrow } from '@popperjs/core/lib/modifiers/arrow';
import type { Options as OptionsFlip } from '@popperjs/core/lib/modifiers/flip';
import type { Options as OptionsComputeStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import type { Options as OptionsEventListeners } from '@popperjs/core/lib/modifiers/eventListeners';

import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { OutsideClickProps } from '@semcore/outside-click';
import type { PortalProps } from '@semcore/portal';
import type { BoxProps } from '@semcore/flex-box';
import type { ScaleProps } from '@semcore/animation';
import type { NeighborLocationProps } from '@semcore/neighbor-location';
import type { UniqueIDProps } from '@semcore/utils/lib/uniqueID';
import type { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export type eventInteraction = {
  trigger: [Array<keyof DOMAttributes<unknown>>, Array<keyof DOMAttributes<unknown>>];
  popper: [Array<keyof DOMAttributes<unknown>>, Array<keyof DOMAttributes<unknown>>];
};

export type Strategy = Options['strategy'];
export type Modifiers = Options['modifiers'];
export type Placement = Options['placement'];

/** @deprecated */
export interface IPopperProps extends PopperProps, UnknownProperties {}
export type PopperProps = OutsideClickProps &
  PortalProps &
  UniqueIDProps &
  Omit<ScaleProps, 'placement'> & {
    /**
     * Popper can have different positioning options
     * @default absolute
     */
    strategy?: Strategy;
    /**
     * Modifiers for popper.js
     */
    modifiers?: Modifiers;
    /**
     * The position of the popper relative to the trigger that called it.
     * 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
     * @default auto
     */
    placement?: Placement;
    /**
     * Interaction with a trigger to show and hide the popper
     * @default click
     */
    interaction?: 'click' | 'hover' | 'focus' | 'none' | eventInteraction;
    /** Timer to show and hide the popper */
    timeout?: number | [number, number];
    /** Popper visibility value */
    visible?: boolean;
    /** Default popper visibility
     * @default false */
    defaultVisible?: boolean;
    /** Function called when visibility changes */
    onVisibleChange?: (visible: boolean, e?: Event) => boolean | undefined;
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
    /** @ignore */
    onFirstUpdate?: Options['onFirstUpdate'];
    /**
     * Flag for disable Popover (if true, it will close Popper and it will not respond to handlers)
     * @default false
     */
    disabled?: boolean;
    /**
     * Disabled focus trap, autofocus and focus return
     */
    disableEnforceFocus?: boolean /**
     * If enabled, after reaching the end of popper the browser focus goes to the start of popper and vice versa.
     * If disabled, after reading the end of popper the browser focus returns to trigger and popper is being closed.
     * @default `true` (`false` in Tooltip)
     */;
    focusLoop?: boolean;
    /**
     * If enabled, you will need to use setTrigger function from children rendering function to set popper trigger.
     */
    explicitTriggerSet?: boolean;
    /**
     * If set, popper will be placed near the place mouse cursor entered the trigger
     */
    cursorAnchoring?: boolean;
  };

/** @deprecated */
export interface IPopperTriggerProps extends PopperTriggerProps, UnknownProperties {}
export type PopperTriggerProps = BoxProps & {
  /**
   * Disabled focus trap, autofocus and focus return
   */
  disableEnforceFocus?: boolean;
};

/** @deprecated */
export interface IPopperPopperProps extends PopperPopperProps, UnknownProperties {}
export type PopperPopperProps = BoxProps &
  KeyboardFocusProps &
  NeighborLocationProps & {
    /**
     * Disabled focus trap, autofocus and focus return
     */
    disableEnforceFocus?: boolean;
  };

/** @deprecated */
export interface IPopperContext extends PopperContext, UnknownProperties {}
export type PopperContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  popper: Instance;
  // Rename to setTriggerRef
  setTrigger: (ref: HTMLElement) => void;
  setPopper: (ref: HTMLElement) => void;
};

/** @deprecated */
export interface IPopperHandlers extends PopperHandlers, UnknownProperties {}
export type PopperHandlers = {
  visible: (visible: boolean) => void;
};

declare const Popper: Intergalactic.Component<
  'div',
  PopperProps,
  PopperContext,
  [handlers: PopperHandlers]
> & {
  Trigger: Intergalactic.Component<
    'div',
    PopperTriggerProps,
    PopperContext,
    [handlers: PopperHandlers]
  >;
  Popper: Intergalactic.Component<
    'div',
    PopperPopperProps,
    PopperContext,
    [handlers: PopperHandlers]
  >;
};

export default Popper;
