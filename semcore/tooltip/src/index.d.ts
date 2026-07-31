import type { NSPopper } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type React from 'react';

export type ArrowCustom = {
  arrowBgColor?: string;
  arrowShadowColor?: string;
};

export type TooltipProps = Intergalactic.InternalTypings.EfficientOmit<NSPopper.Props, 'interaction'> &
  NSPopper.Trigger.Props & {
    /**
     * Tooltip text
     */
    title?: React.ReactNode;
    /**
     * Tooltip theme. You can use the default themes or create your own
     * @default default
     */
    theme?: 'default' | 'warning' | 'invert';

    /**
     * Hover interaction means that popper will be shown on mouse hover or keyboard focus.
     * Click interactions means that popper will be shown on mouse click or keyboard Space/Enter keydown.
     * Focus interaction means that popper will be shown on mouse or keyboard focus.
     * @default hover
     */
    interaction?: 'hover' | 'click' | 'focus' | 'none' | NSPopper.EventInteraction;
  };

export type TooltipTriggerContext = NSPopper.Ctx & {
  popperId?: string;
};

export type TooltipContext = NSPopper.Ctx & {};

declare const Tooltip: Intergalactic.Component<'div', TooltipProps, TooltipContext> & {
  Trigger: Intergalactic.Component<'div', NSPopper.Trigger.Props, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', TooltipProps & ArrowCustom, TooltipContext>;
};

export type TooltipHintProps = Intergalactic.InternalTypings.EfficientOmit<
  NSPopper.Props,
  'interaction'
> &
NSPopper.Trigger.Props & {
  /**
     * Tooltip text
     */
  title?: string;
  /**
     * Tooltip theme. You can use the default themes or create your own
     * @default default
     */
  theme?: 'default' | 'invert';
};
export type TooltipHintPopperProps = Intergalactic.InternalTypings.EfficientOmit<
  TooltipHintProps,
  'title'
>;

declare const Hint: Intergalactic.Component<'div', TooltipHintProps, TooltipTriggerContext> & {
  Trigger: Intergalactic.Component<'div', NSPopper.Trigger.Props, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', TooltipHintPopperProps & ArrowCustom, TooltipContext>;
};

export type DescriptionTooltipProps = Intergalactic.InternalTypings.EfficientOmit<
  NSPopper.Props,
  'interaction'
> &
NSPopper.Trigger.Props & {
  /**
     * Tooltip theme. You can use the default themes or create your own
     * @default default
     */
  theme?: 'default' | 'warning' | 'invert';

  /**
     * Hover interaction means that popper will be shown on mouse hover or keyboard focus.
     * Click interactions means that popper will be shown on mouse click or keyboard Space/Enter keydown.
     * @default click
     */
  interaction?: 'hover' | 'click';
};

/**
 * DescriptionTooltipPopper must have an accessible name (aria-dialog-name).
 * It should describe popper content.
 */
type DescriptionTooltipPopperAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
}>;

export type DescriptionTooltipPopperProps = DescriptionTooltipProps &
  DescriptionTooltipPopperAriaProps &
  ArrowCustom & {
    /**
     * Popper in DescriptionTooltip should have role `dialog`.
     * @default 'dialog'
     */
    role?: 'dialog';
  };

declare const DescriptionTooltip: Intergalactic.Component<
  'div',
  DescriptionTooltipProps,
  TooltipTriggerContext
> & {
  Trigger: Intergalactic.Component<'div', NSPopper.Trigger.Props, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', DescriptionTooltipPopperProps, TooltipContext>;
};

export default Tooltip;
export {
  /** @deprecated. Use Hint component from @semcore/base-components */
  Hint,
  DescriptionTooltip,
};
