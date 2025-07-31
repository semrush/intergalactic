import type { Options as OptionsArrow } from '@popperjs/core/lib/modifiers/arrow';
import type { Options as OptionsComputeStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import type { Options as OptionsEventListeners } from '@popperjs/core/lib/modifiers/eventListeners';
import type { Options as OptionsFlip } from '@popperjs/core/lib/modifiers/flip';
import type { Options as OptionsOffset } from '@popperjs/core/lib/modifiers/offset';
import type { Options as OptionsPreventOverflow } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { Modifier, Options, PositioningStrategy } from '@popperjs/core/lib/types';
import type { AnimationProps, BoxProps, OutsideClickProps, PortalProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn, UnknownProperties } from '@semcore/core';
import type { Box } from '@semcore/flex-box';
import type { PopperContext, PopperPopperProps } from '@semcore/popper';
import type Popper, { Placement } from '@semcore/popper';

/**
 * Popper must have an accessible names (aria-group-name).
 */
type AriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
}>;

/** @deprecated */
export interface IFeaturePopoverPopperProps extends FeaturePopoverPopperProps, UnknownProperties {}
export type FeaturePopoverPopperProps = PopperPopperProps & {
  /**
   * The property responsible for the visibility of the closing icon
   * @default false
   */
  closeIcon?: boolean;
  /** Animation display duration in `ms`
   * @default 200
   */
  duration?: number;

  locale?: string;
};

/** @deprecated */
export interface IFeaturePopoverContext extends FeaturePopoverContext, UnknownProperties {}
export type FeaturePopoverContext = PopperContext & {
  getSpotProps: PropGetterFn;
};

export type FPPopperProps = OutsideClickProps &
  PortalProps &
  UniqueIDProps &
  AnimationProps & {
    /**
     * Popper can have different positioning options
     * @default absolute
     */
    strategy?: PositioningStrategy;
    /**
     * Modifiers for popper.js
     */
    modifiers?: Array<Partial<Modifier<any, any>>>;
    /**
     * The position of the popper relative to the trigger that called it.
     * @default auto
     */
    placement?: Placement;
    /** Timer to show and hide the popper */
    timeout?: number | [number, number];
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
     * If enabled, you will need to use setTrigger function from children rendering function to set popper trigger.
     */
    explicitTriggerSet?: boolean;
    /**
     * If set, popper will be placed near the place mouse cursor entered the trigger
     */
    cursorAnchoring?: boolean;

    popperMargin?: number;

    /**
     * You shouldn't change an interaction in FeaturePopover. Comes from a Popper component.
     * @deprecated
     * @default none
     */
    interaction?: 'click' | 'hover' | 'focus' | 'none' | eventInteraction;
    /**
     * You shouldn't change it in FeaturePopover as it should be controlled always. Comes from a Popper component.
     * @deprecated
     * @default false */
    defaultVisible?: boolean;
    /**
     * Disabled focus trap, autofocus and focus return
     * You shouldn't change it in FeaturePopover as it should be controlled always. Comes from a Popper component.
     * @deprecated
     */
    disableEnforceFocus?: boolean;
    /**
     * If enabled, after reaching the end of popper the browser focus goes to the start of popper and vice versa.
     * If disabled, after reading the end of popper the browser focus returns to trigger and popper is being closed.
     * You shouldn't change it in FeaturePopover as it should be controlled always. Comes from a Popper component.
     * @deprecated
     * @default `true` (`false` in Tooltip)
     */
    focusLoop?: boolean;
  };

export type FeaturePopoverProps = FPPopperProps & {
  /** Popper visibility value */
  visible?: boolean;
  /** Function called when visibility changes */
  onVisibleChange?: (visible: boolean, e?: Event) => boolean | void;
};

export type FeaturePopoverTriggerProps = BoxProps;

declare const FeaturePopover: Intergalactic.Component<'div', FeaturePopoverProps, FeaturePopoverContext> & {
  Trigger: Intergalactic.Component<typeof Popper.Trigger, FeaturePopoverTriggerProps>;
  Popper: Intergalactic.Component<'div', FeaturePopoverPopperProps & AriaProps>;
  Spot: typeof Box;
};

export default FeaturePopover;
