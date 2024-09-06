import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import Dropdown, {
  DropdownContext,
  DropdownProps,
  DropdownHandlers,
  DropdownTriggerProps,
} from '@semcore/dropdown';
import { Box, BoxProps, FlexProps, Flex } from '@semcore/flex-box';
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
  defaultHighlightedIndex?: number | null;
  /**
   * Index of the selected item
   */
  highlightedIndex?: number | null;
  /**
   * Callback for highlightedIndex change
   * highlightedIndex -  Index of the selected item
   */
  onHighlightedIndexChange?: (highlightedIndex: number | null) => void;
  locale?: string;
  /**
   * Flag for menu that using as actions on DropdownMenu.Item
   */
  inlineActions?: boolean;
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

export type DropdownMenuGroupProps = BoxProps & {
  /** Title for group of dropdown menu items */
  title: React.ReactNode;
  /** Subtitle for group of dropdown menu items */
  subTitle?: string;
};

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
  Actions: Intergalactic.Component<
    typeof Flex,
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
    Content: typeof Flex;
    Hint: typeof Flex;
  };
  /**
   * @deprecated Use Group with title prop
   */
  ItemTitle: Intergalactic.Component<'div', DropdownMenuItemTitleProps>;
  /**
   * @deprecated Use prop subTitle on Group or Item component
   */
  ItemHint: Intergalactic.Component<'div', DropdownMenuItemHintProps>;
  Group: Intergalactic.Component<'div', DropdownMenuGroupProps>;
  /**
   * @deprecated Use Item instead of Nesting
   */
  Nesting: Intergalactic.Component<
    'div',
    DropdownMenuItemProps,
    DropdownMenuContext,
    [handlers: DropdownMenuHandlers]
  > & {
    /**
     * @deprecated Use Item instead of Nesting
     */
    Trigger: Intergalactic.Component<'div', DropdownMenuItemProps>;
    /**
     * @deprecated Use Item instead of Nesting
     */
    Item: Intergalactic.Component<'div', DropdownMenuItemProps>;
    /**
     * @deprecated Use Item instead of Nesting
     */
    Addon: typeof Box;
  };

  selectedIndexContext: React.Context<number>;
};

export default DropdownMenu;

export { DropdownMenu as DropdownMenuOld };
