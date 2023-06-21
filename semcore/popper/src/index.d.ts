import { DOMAttributes } from 'react';
import { Options, Instance } from '@popperjs/core/lib/types';
import { Options as OptionsOffset } from '@popperjs/core/lib/modifiers/offset';
import { Options as OptionsPreventOverflow } from '@popperjs/core/lib/modifiers/preventOverflow';
import { Options as OptionsArrow } from '@popperjs/core/lib/modifiers/arrow';
import { Options as OptionsFlip } from '@popperjs/core/lib/modifiers/flip';
import { Options as OptionsComputeStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import { Options as OptionsEventListeners } from '@popperjs/core/lib/modifiers/eventListeners';

import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { OutsideClickProps } from '@semcore/outside-click';
import { PortalProps } from '@semcore/portal';
import { BoxProps } from '@semcore/flex-box';
import { ScaleProps } from '@semcore/animation';
import { NeighborLocationProps } from '@semcore/neighbor-location';
import { UniqueIDProps } from '@semcore/utils/lib/uniqueID';

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
    /** @ignore */
    onFirstUpdate?: Options['onFirstUpdate'];

    /**
     * By default, Popper is styled as position: absolute. Allows to switch to fixed
     * @deprecated v4.0.0
     * @use IPopperProps.strategy
     */
    positionFixed?: boolean;

    /**
     * Turns off subscription to global `resize/scroll` events
     * @deprecated v4.0.0
     * @use IPopperProps.eventListeners
     */
    eventsDisabled?: boolean;

    /**
     * Trigger events to show and hide the popper
     * @deprecated v4.0.0
     * @use IPopperProps.interaction
     */
    displayEvents?: {
      show: string[];
      hide: string[];
    };

    /**
     * Trigger timer to show and hide the popper
     * @deprecated v4.0.0
     * @use IPopperProps.timeout
     */
    displayTimeout?: {
      show: number;
      hide: number;
    };

    /**
     * z-index Popper.Popper
     * @deprecated v4.0.0
     */
    popperZIndex?: string | number;

    /**
     * Defines the border element used by Popper for its flip and preventOverflow modifiers. Three abbreviated keywords are supported; Popper will find the correct DOM element.
     * `'scrollParent' | 'viewport' | 'window' | HTMLElement`
     * @deprecated v4.0.0
     * @use IPopperProps.preventOverflow
     */
    // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
    boundary?: 'scrollParent' | 'viewport' | 'window' | HTMLElement;

    /**
     * Disabled focus trap, autofocus and focus return
     */
    disableEnforceFocus?: boolean;
  };

/** @deprecated */
export interface IPopperTriggerProps extends PopperTriggerProps, UnknownProperties {}
export type PopperTriggerProps = BoxProps & {};

/** @deprecated */
export interface IPopperPopperProps extends PopperPopperProps, UnknownProperties {}
export type PopperPopperProps = BoxProps &
  NeighborLocationProps & {
    /**
     * Defines the border element used by Popper for its flip and preventOverflow modifiers. Three abbreviated keywords are supported; Popper will find the correct DOM element.
     * `'scrollParent' | 'viewport' | 'window' | HTMLElement`
     * @deprecated v4.0.0
     * @use IPopperProps.preventOverflow
     */

    boundary?: 'scrollParent' | 'viewport' | 'window' | HTMLElement;

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

declare const Popper: Intergalactic.Component<'div', PopperProps, PopperContext, PopperHandlers> & {
  Trigger: Intergalactic.Component<'div', PopperTriggerProps, PopperContext, PopperHandlers>;
  Popper: Intergalactic.Component<'div', PopperPopperProps, PopperContext, PopperHandlers>;
};

export default Popper;
