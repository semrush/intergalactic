import React from 'react';
import type { Intergalactic, UnknownProperties, PropGetterFn } from '@semcore/core';
import type Popper from '@semcore/popper';
import type {
  PopperContext,
  PopperProps,
  PopperHandlers,
  PopperTriggerProps,
  PopperPopperProps,
} from '@semcore/popper';
import type { Box, BoxProps } from '@semcore/flex-box';

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
export type DropdownContext = PopperContext & {
  getGroupProps: PropGetterFn;
};

/** @deprecated */
export interface IDropdownHandlers extends DropdownHandlers, UnknownProperties {}
export type DropdownHandlers = PopperHandlers & {};

export type DropdownTriggerProps = PopperTriggerProps;

/**
 * DropdownPopper must have an accessible name (aria-dialog-name).
 * It should describe popper content.
 */
export type DropdownPopperAriaProps = Intergalactic.RequireAtLeastOne<{
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

export type DropdownGroupProps = BoxProps & {
  /** Title for group of dropdown menu items */
  title: React.ReactNode;
  /** Subtitle for group of dropdown menu items */
  subTitle?: string;
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
  Item: Intergalactic.Component<typeof Box>;
  Group: Intergalactic.Component<'div', DropdownGroupProps>;
};

export default Dropdown;
