import React from 'react';
import { Intergalactic, UnknownProperties } from '@semcore/core';
import Popper, {
  PopperContext,
  PopperProps,
  PopperTriggerProps,
  eventInteraction,
} from '@semcore/popper';

/** @deprecated */
export interface ITooltipProps extends TooltipProps, UnknownProperties {}
export type TooltipProps = Intergalactic.InternalTypings.EfficientOmit<PopperProps, 'interaction'> &
  PopperTriggerProps & {
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
    interaction?: 'hover' | 'click' | 'focus' | 'none' | eventInteraction;
  };

export type TooltipTriggerContext = PopperContext & {
  popperId?: string;
};
/** @deprecated */
export interface ITooltipContext extends TooltipContext, UnknownProperties {}
export type TooltipContext = PopperContext & {};

declare const Tooltip: Intergalactic.Component<'div', TooltipProps, TooltipContext> & {
  Trigger: Intergalactic.Component<'div', PopperTriggerProps, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', TooltipProps, TooltipContext>;
};

export type TooltipHintProps = Intergalactic.InternalTypings.EfficientOmit<
  PopperProps,
  'interaction'
> &
  PopperTriggerProps & {
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
  HintProps,
  'title'
>;

/** @deprecated, use `TooltipHintProps` instead */
export type HintProps = TooltipHintProps;
/** @deprecated, use `TooltipHintPopperProps` instead */
export type HintPopperProps = TooltipHintPopperProps;

declare const Hint: Intergalactic.Component<'div', HintProps, TooltipTriggerContext> & {
  Trigger: Intergalactic.Component<'div', PopperTriggerProps, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', HintPopperProps, TooltipContext>;
};

export type DescriptionTooltipProps = Intergalactic.InternalTypings.EfficientOmit<
  PopperProps,
  'interaction'
> &
  PopperTriggerProps & {
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

declare const DescriptionTooltip: Intergalactic.Component<
  'div',
  DescriptionTooltipProps,
  TooltipTriggerContext
> & {
  Trigger: Intergalactic.Component<'div', PopperTriggerProps, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', DescriptionTooltipProps, TooltipContext>;
};

export default Tooltip;
export { Hint, DescriptionTooltip };
