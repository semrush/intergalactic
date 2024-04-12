import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import Dropdown, {
  DropdownContext,
  DropdownProps,
  DropdownHandlers,
  DropdownTriggerProps,
} from '@semcore/dropdown';
import { Box, BoxProps, FlexProps } from '@semcore/flex-box';
import { ScrollAreaProps } from '@semcore/scroll-area';

export type DropdownMenuSize = 'm' | 'l';

/** @deprecated */
export interface IDropdownMenuProps extends DropdownMenuProps, UnknownProperties {}
export type DropdownMenuProps = DropdownProps & {
  /**
   * Size of the menu
   * @default m
   */
  size?: DropdownMenuSize;
  /**
   * Index of the element selected by default
   */
  defaultHighlightedIndex?: number;
  /**
   * Index of the selected item
   */
  highlightedIndex?: number;
  /**
   * Callback for highlightedIndex change
   * highlightedIndex -  Index of the selected item
   */
  onHighlightedIndexChange?: (highlightedIndex: number) => void;
  locale?: string;
};

/** @deprecated */
export interface IDropdownMenuListProps extends DropdownMenuListProps, UnknownProperties {}
export type DropdownMenuListProps = BoxProps &
  ScrollAreaProps & {
    /**
     * Size of the menu
     * @default m
     */
    size?: DropdownMenuSize;
  };

/** @deprecated */
export interface IDropdownMenuMenuProps extends DropdownMenuMenuProps, UnknownProperties {}
export type DropdownMenuMenuProps = DropdownMenuListProps & {};

/** @deprecated */
export interface IDropdownMenuItemProps extends DropdownMenuItemProps, UnknownProperties {}
export type DropdownMenuItemProps = FlexProps & {
  /**
   * Enables selected state
   */
  selected?: boolean;
  /**
   * Disables item
   */
  disabled?: boolean;
  /**
   * Adds focus styles around
   */
  highlighted?: boolean;
  /**
   * Disables hover state
   * @deprecated use `disabled` instead
   */
  notInteractive?: boolean;
  /**
   * Size of the component
   * @default m
   */
  size?: DropdownMenuSize;
};

/** @deprecated */
export interface IDropdownMenuItemHintProps extends DropdownMenuItemHintProps, UnknownProperties {}
export type DropdownMenuItemHintProps = FlexProps & {
  /**
   * Size of the component
   * @default m
   */
  size?: DropdownMenuSize;
};

/** @deprecated */
export interface IDropdownMenuItemTitleProps
  extends DropdownMenuItemTitleProps,
    UnknownProperties {}
export type DropdownMenuItemTitleProps = FlexProps & {
  /**
   * Size of the component
   * @default m
   */
  size?: DropdownMenuSize;
};

/** @deprecated */
export interface IDropdownMenuContext extends DropdownMenuContext, UnknownProperties {}
export type DropdownMenuContext = DropdownContext & {
  highlightedIndex?: number;
  getListProps: PropGetterFn;
  getItemProps: PropGetterFn;
  getItemHintProps: PropGetterFn;
  getItemTitleProps: PropGetterFn;
};

/** @deprecated */
export interface IDropdownMenuHandlers extends DropdownMenuHandlers, UnknownProperties {}
export type DropdownMenuHandlers = DropdownHandlers & {
  highlightedIndex: (index: number) => void;
};

export type DropdownMenuTriggerProps = DropdownTriggerProps;

declare const DropdownMenu: Intergalactic.Component<
  'div',
  DropdownMenuProps,
  DropdownMenuContext,
  [handlers: DropdownMenuHandlers]
> & {
  Trigger: typeof Dropdown.Trigger;
  Popper: Intergalactic.Component<'div', DropdownMenuProps>;
  List: Intergalactic.Component<
    'div',
    DropdownMenuListProps,
    DropdownMenuContext,
    [handlers: DropdownMenuHandlers]
  >;
  Menu: Intergalactic.Component<
    'div',
    DropdownMenuMenuProps,
    DropdownMenuContext,
    [handlers: DropdownMenuHandlers]
  >;
  Item: Intergalactic.Component<
    'div',
    DropdownMenuItemProps,
    DropdownMenuContext,
    [handlers: DropdownMenuHandlers]
  > & {
    Addon: typeof Box;
  };
  ItemTitle: Intergalactic.Component<'div', DropdownMenuItemTitleProps>;
  ItemHint: Intergalactic.Component<'div', DropdownMenuItemHintProps>;
  Nesting: Intergalactic.Component<
    'div',
    DropdownMenuItemProps,
    DropdownMenuContext,
    [handlers: DropdownMenuHandlers]
  > & {
    Trigger: Intergalactic.Component<'div', DropdownMenuItemProps>;
    Item: Intergalactic.Component<'div', DropdownMenuItemProps>;
    Addon: typeof Box;
  };
};

export default DropdownMenu;
