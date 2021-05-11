import { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import Popper, { IPopperContext, IPopperProps } from '@semcore/popper';

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

export interface IDropdownContext extends IPopperContext {
}

declare const Dropdown: ((props: CProps<IDropdownProps, IDropdownContext>) => ReturnEl) & {
  Trigger: <T>(props: ComponentProps<typeof Popper.Trigger> & T) => ReturnEl;
  Popper: <T>(props: ComponentProps<typeof Popper.Popper> & T) => ReturnEl;
};

export default Dropdown;