import type { Box, BoxProps,
  Popper,
  PopperContext,
  PopperProps,
  PopperHandlers,
  PopperTriggerProps,
  PopperPopperProps,
} from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type React from 'react';

export type DropdownProps = PopperProps & {
  /**
   * Modifier responsible for the size of the pop-up window:
   * `fixed` - a pop-up window of the same size as trigger;
   * `min` - pop-up window not less than the size of the trigger;
   * `false` - the pop-up window depends on the content within it.
   * @default 'min'
   * */
  stretch?: 'min' | 'fixed' | false;
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type DropdownContext = PopperContext & {
  getGroupProps: PropGetterFn;
};

export type DropdownHandlers = PopperHandlers & {};

export type DropdownTriggerProps = PopperTriggerProps;

/**
 * DropdownPopper must have an accessible name (aria-dialog-name).
 * It should describe popper content.
 */
export type DropdownPopperAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
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
  /** Render group title as sticky element for nested items */
  sticky?: boolean;
};

export type StatusItemState = 'loading' | 'default' | 'error';

type DropdownStatusItemProps = {
  state?: StatusItemState;
  itemsCount: number;
  children?: React.ReactNode;
};

export type StatusItemComponent = Intergalactic.Component<'div', DropdownStatusItemProps>;

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
  StatusItem: StatusItemComponent;
};

export default Dropdown;
