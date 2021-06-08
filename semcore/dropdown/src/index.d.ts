import { CProps, ReturnEl } from '@semcore/core';
import Popper, { IPopperContext, IPopperProps, IPopperHandlers } from '@semcore/popper';

export interface IDropdownProps extends IPopperProps {
  /**
   * Modifier responsible for the size of the pop-up window
   * `fixed` - a pop-up window of the same size as trigger
   * `min` - pop-up window not less than the size of the trigger
   * `false` - the pop-up window depends on the content within it
   * @default 'min'
   * */
  stretch?: 'min' | 'fixed' | false;

  /**
   * @deprecated {@link IDropdownProps.stretch}
   * */
  popperStretch?: 'min' | 'fixed' | false;
}

export interface IDropdownContext extends IPopperContext {}

export interface IDropdownHandlers extends IPopperHandlers {}

declare const Dropdown: (<T>(
  props: CProps<IDropdownProps & T, IDropdownContext, IDropdownHandlers>,
) => ReturnEl) & {
  Trigger: typeof Popper.Trigger;
  Popper: typeof Popper.Popper;
};

export default Dropdown;
