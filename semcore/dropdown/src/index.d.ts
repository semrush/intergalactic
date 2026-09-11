import type { NSBox, NSPopper } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type Notice from '@semcore/notice';
import type React from 'react';

export type DropdownProps = NSPopper.Props & {
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

export type DropdownContext = NSPopper.Ctx & {
  getGroupProps: PropGetterFn;
};

export type DropdownHandlers = NSPopper.Handlers & {};

export type DropdownTriggerProps = NSPopper.Trigger.Props;

/**
 * DropdownPopper must have an accessible name (aria-dialog-name).
 * It should describe popper content.
 */
export type DropdownPopperAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
}>;

export type DropdownPopperProps = NSPopper.Popper.Props &
  DropdownPopperAriaProps & {
    /**
     * Popper in Dropdown should have role `dialog`.
     * @default 'dialog'
     */
    role?: 'dialog';
  };

export type DropdownGroupProps = NSBox.Props & {
  /** Title for group of dropdown menu items */
  title: React.ReactNode;
  /** Subtitle for group of dropdown menu items */
  subTitle?: string;
  /** Render group title as sticky element for nested items */
  sticky?: boolean;
};

export type StatusItemState = 'loading' | 'default' | 'error';

export type DropdownStatusItemProps = {
  /** State to display */
  state?: StatusItemState;
  /** Count of found items */
  itemsCount: number;
  /** Custom text content */
  children?: React.ReactNode;
};

export type StatusItemComponent = Intergalactic.Component<'div', DropdownStatusItemProps>;

export type DropdownNoticeComponent = typeof Notice;

declare const Dropdown: Intergalactic.Component<
  'div',
  DropdownProps,
  DropdownContext,
  [handlers: DropdownHandlers]
> & {
  Trigger: NSPopper.Trigger.Component;
  Popper: Intergalactic.Component<
    'div',
    DropdownPopperProps,
    NSPopper.Ctx,
    [handlers: NSPopper.Handlers]
  >;
  Item: Intergalactic.Component<NSBox.Component>;
  Group: Intergalactic.Component<'div', DropdownGroupProps>;
  StatusItem: StatusItemComponent;
  Notice: DropdownNoticeComponent;
};

export default Dropdown;
