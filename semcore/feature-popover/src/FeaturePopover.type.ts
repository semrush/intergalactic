import type { Options as OptionsArrow } from '@popperjs/core/lib/modifiers/arrow';
import type { Options as OptionsComputeStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import type { Options as OptionsEventListeners } from '@popperjs/core/lib/modifiers/eventListeners';
import type { Options as OptionsFlip } from '@popperjs/core/lib/modifiers/flip';
import type { Options as OptionsOffset } from '@popperjs/core/lib/modifiers/offset';
import type { Options as OptionsPreventOverflow } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { Modifier, Options, PositioningStrategy } from '@popperjs/core/lib/types';
import type {
  AnimationProps,
  BoxProps,
  OutsideClickProps,
  NSPortal,
  Box, PopperContext, PopperPopperProps, Placement, Popper } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { UniqueIDProps } from '@semcore/core/lib/utils/uniqueID';
import type React from 'react';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

/**
 * Popper must have an accessible names (aria-group-name).
 */
type AriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
}>;

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
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type FeaturePopoverPopperInnerProps = {
  theme: FeaturePopoverProps['theme'];

  visible: boolean;

  $onCloseClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  animationsDisabled: boolean;
  getI18nText: (message: string, opts?: Record<string, unknown>) => string;
  autofocus: boolean;
};

export type FeaturePopoverContext = PopperContext & {
  getSpotProps: PropGetterFn;
};

export type FPPopperProps = OutsideClickProps &
  NSPortal.Props &
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

    popperMargin?: number;
  };

export type FeaturePopoverProps = FPPopperProps & {
  /** Popper visibility value */
  visible?: boolean;
  /** Function called when visibility changes */
  onVisibleChange?: (visible: boolean, e?: Event) => boolean | void;
  /**
   * The position of the popper relative to the trigger that called it.
   * @default auto
   */
  placement?: Placement;
  /**
   * The theme of FeaturePopover
   * @default accent
   */
  theme?: 'accent' | 'neutral';
};

export type FeaturePopoverDefaultProps = {
  offset: FPPopperProps['offset'];
  placement: 'bottom-start';
  defaultVisible: false;
  onOutsideClick: () => void;
  interaction: 'none';
  i18n: LocalizedMessages;
  locale: 'en';
  theme: 'accent';
};

export type FeaturePopoverTriggerProps = BoxProps & {
  theme?: FeaturePopoverProps['theme'];
};

export type FeaturePopoverSpotProps = {
  visible?: boolean;
  theme?: FeaturePopoverProps['theme'];
};

export type FeaturePopoverComponent = Intergalactic.Component<'div', FeaturePopoverProps, FeaturePopoverContext> & {
  Trigger: Intergalactic.Component<typeof Popper.Trigger, FeaturePopoverTriggerProps>;
  Popper: Intergalactic.Component<'div', FeaturePopoverPopperProps & AriaProps>;
  Spot: Intergalactic.Component<typeof Box, FeaturePopoverSpotProps>;
};
