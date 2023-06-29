import { Intergalactic, UnknownProperties } from '@semcore/core';
import Popper, {
  PopperContext,
  PopperProps,
  PopperHandlers,
  PopperTriggerProps,
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

declare const Dropdown: Intergalactic.Component<
  'div',
  DropdownProps,
  DropdownContext,
  [handlers: DropdownHandlers]
> & {
  Trigger: typeof Popper.Trigger;
  Popper: typeof Popper.Popper;
};

export default Dropdown;
