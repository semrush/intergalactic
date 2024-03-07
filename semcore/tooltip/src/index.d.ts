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
     * Tooltip should have only one interaction - `hover`. You shouldn't use it with another interactions.
     * We'll delete this prop in next major release.
     */
    interaction?:
      | 'hover'
      | 'click' /** @deprecated */
      | 'focus' /** @deprecated */
      | 'none' /** @deprecated */
      | eventInteraction /** @deprecated */;
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

export type HintProps = Intergalactic.InternalTypings.EfficientOmit<PopperProps, 'interaction'> &
  PopperTriggerProps & {
    /**
     * Tooltip text
     */
    title?: string;
    /**
     * Tooltip theme. You can use the default themes or create your own
     * @default default
     */
    theme?: 'default' | 'warning' | 'invert';

    /**
     * Tooltip should have only one interaction - `hover`. You shouldn't use it with another interactions.
     * We'll delete this prop in next major release.
     */
    interaction?: 'hover' | 'focus';
  };
export type HintPopperProps = Intergalactic.InternalTypings.EfficientOmit<HintProps, 'title'>;

declare const Hint: Intergalactic.Component<'div', HintProps, TooltipTriggerContext> & {
  Trigger: Intergalactic.Component<'div', PopperTriggerProps, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', HintPopperProps, TooltipContext>;
};

export type InformationDropdownProps = Intergalactic.InternalTypings.EfficientOmit<
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
     * Tooltip should have only one interaction - `hover`. You shouldn't use it with another interactions.
     * We'll delete this prop in next major release.
     */
    interaction?: 'hover' | 'click';
  };

declare const InformationDropdown: Intergalactic.Component<
  'div',
  InformationDropdownProps,
  TooltipTriggerContext
> & {
  Trigger: Intergalactic.Component<'div', PopperTriggerProps, TooltipTriggerContext>;
  Popper: Intergalactic.Component<'div', InformationDropdownProps, TooltipContext>;
};

export default Tooltip;
export { Hint, InformationDropdown };
