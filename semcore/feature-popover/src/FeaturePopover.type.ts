import type { Options as OptionsArrow } from '@popperjs/core/lib/modifiers/arrow';
import type { Options as OptionsComputeStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import type { Options as OptionsEventListeners } from '@popperjs/core/lib/modifiers/eventListeners';
import type { Options as OptionsFlip } from '@popperjs/core/lib/modifiers/flip';
import type { Options as OptionsOffset } from '@popperjs/core/lib/modifiers/offset';
import type { Options as OptionsPreventOverflow } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { Modifier, Options, PositioningStrategy } from '@popperjs/core/lib/types';
import type { NSAnimation, NSBox, NSOutsideClick, NSPortal, NSPopper } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import type { UniqueIDProps } from '@semcore/core/lib/utils/uniqueID';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSFeaturePopover {
  type Props = FPPopperProps & {
    /** Popper visibility value */
    visible?: boolean;
    /** Function called when visibility changes */
    onVisibleChange?: (visible: boolean, e?: Event) => boolean | void;
    /**
      * The position of the popper relative to the trigger that called it.
      * @default auto
      */
    placement?: NSPopper.Placement;
    /**
      * The theme of FeaturePopover
      * @default accent
      */
    theme?: 'accent' | 'neutral';
  };
  type DefaultProps = {
    offset: NSFeaturePopover.Props['offset'];
    placement: 'bottom-start';
    defaultVisible: false;
    onOutsideClick: () => void;
    interaction: 'none';
    i18n: LocalizedMessages;
    locale: 'en';
    theme: 'accent';
  };
  type InternalProps = WithI18nEnhanceProps & {
    interaction?: NSPopper.Props['interaction'];
  };
  type Handlers = {
    visible: null;
  };
  type Ctx = NSPopper.Ctx & {
    getSpotProps: PropGetterFn;
  };

  namespace Trigger {
    type Props = NSBox.Props & {
      theme?: NSFeaturePopover.Props['theme'];
    };

    type Component = Intergalactic.Component<NSPopper.Trigger.Component, Props>;
  }

  namespace Popper {
    type Props = NSPopper.Popper.Props &
      /**
       * Popper must have an accessible names (aria-group-name).
       */
      Intergalactic.RequireAtLeastOne<{
        'aria-label'?: string;
        'aria-labelledby'?: string;
        'title'?: string;
      }> & {
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
        /**
         * Disable animation
         * @deprecated
         */
        animationsDisabled?: boolean;
      };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Spot {
    type Props = {
      visible?: boolean;
      theme?: NSFeaturePopover.Props['theme'];
    };

    type Component = Intergalactic.Component<NSBox.Component, Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Trigger: Trigger.Component;
    Popper: Popper.Component;
    Spot: Spot.Component;
  };
}

// Re-think it since looks like those props aren't needed for the Root component.
/** @deprecated It will be removed in v18. */
export type FPPopperProps = NSOutsideClick.Props &
  NSPortal.Props &
  UniqueIDProps &
  NSAnimation.Props & {
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

/** @deprecated It will be removed in v18. */
export type FeaturePopoverPopperProps = NSFeaturePopover.Popper.Props;
/** @deprecated It will be removed in v18. */
export type FeaturePopoverContext = NSFeaturePopover.Ctx;
/** @deprecated It will be removed in v18. */
export type FeaturePopoverProps = NSFeaturePopover.Props;
/** @deprecated It will be removed in v18. */
export type FeaturePopoverDefaultProps = NSFeaturePopover.DefaultProps;
/** @deprecated It will be removed in v18. */
export type FeaturePopoverTriggerProps = NSFeaturePopover.Trigger.Props;
/** @deprecated It will be removed in v18. */
export type FeaturePopoverSpotProps = NSFeaturePopover.Spot.Props;
/** @deprecated It will be removed in v18. */
export type FeaturePopoverComponent = NSFeaturePopover.Component;

export type { NSFeaturePopover };
