import { Intergalactic, UnknownProperties } from '@semcore/core';
import Popper, {
  PopperContext,
  PopperProps,
  PopperHandlers,
  PopperTriggerProps,
  PopperPopperProps,
} from '@semcore/popper';

/** @deprecated */
export interface IDropdownProps extends DropdownProps, UnknownProperties {}
export type DropdownProps = PopperProps & {
  /**
   * Modifier responsible for the size of the pop-up window:
   * `fixed` - a pop-up window of the same size as trigger;
   * `min` - pop-up window not less than the size of the trigger;
   * `false` - the pop-up window depends on the content within it.
   * @default 'min'
   * */
  stretch?: 'min' | 'fixed' | false;
  locale?: string;
};

/** @deprecated */
export interface IDropdownContext extends DropdownContext, UnknownProperties {}
export type DropdownContext = PopperContext & {};

/** @deprecated */
export interface IDropdownHandlers extends DropdownHandlers, UnknownProperties {}
export type DropdownHandlers = PopperHandlers & {};

export type DropdownTriggerProps = PopperTriggerProps;

/**
 * DropdownPopper must have an accessible name (aria-dialog-name).
 * It should describe popper content.
 */
type DropdownPopperAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
}>;

export type DropdownPopperProps = PopperPopperProps &
  DropdownPopperAriaProps & {
    /**
     * Popper in Dropdown should have role `dialog`.
     * @default 'dialog'
     */
    role?: 'dialog';
  };

declare const Dropdown: Intergalactic.Component<
  'div',
  DropdownProps,
  DropdownContext,
  [handlers: DropdownHandlers]
> & {
  Trigger: typeof Popper.Trigger;
  Popper: Intergalactic.Component<
    'div',
    DropdownPopperProps,
    PopperContext,
    [handlers: PopperHandlers]
  >;
};

export default Dropdown;
