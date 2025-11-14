import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type {
  DropdownContext,
  DropdownProps,
  DropdownHandlers,
  DropdownTriggerProps,
  DropdownPopperAriaProps,
} from '@semcore/dropdown';
import type Dropdown from '@semcore/dropdown';
import type { Box, BoxProps, FlexProps, Flex } from '@semcore/flex-box';
import type { eventInteraction } from '@semcore/popper';
import type { ScrollAreaProps } from '@semcore/scroll-area';
import type { Text } from '@semcore/typography';

export type DropdownMenuSize = 'm' | 'l';

/** @deprecated */
export interface IDropdownMenuProps extends DropdownMenuProps, UnknownProperties {}
export type DropdownMenuProps = DropdownProps & {
  /**
   * Set role `menuitemradio` (or `menuitemcheckbox` if `multiselect`) for Dropdown.Item
   */
  selectable?: boolean;
  /**
   * Multiple select
   */
  multiselect?: boolean;
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
  /** Specifies the locale for i18n support */
  locale?: string;
  /**
   * Flag for menu that using as actions on DropdownMenu.Item
   */
  inlineActions?: boolean;

  /**
   * Count of menu items (for virtual lists only)
   */
  itemsCount?: number;

  /**
    * Prevents default focus behaviour
  */
  preventDefaultFocusBehavior?: boolean;
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
   * Enables selected state. For selectable dropdowns only.
   */
  selected?: boolean;
  /**
   * Disables item
   */
  disabled?: boolean;
  /**
   * Adds focus styles around
   * @deprecated set focus manually by `.focus()` method to the same behaviour
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
  /**
   * Index of item (used in virtualized lists)
   */
  index?: number;
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
  /**
    * Tracks which menu item is currently highlighted/focused for keyboard navigation
  **/
  highlightedIndex?: number;
  /**
    * Returns props for the menu list container
  **/
  getListProps: PropGetterFn;
  /**
    * Returns props for individual menu items
  **/
  getItemProps: PropGetterFn;
  /**
    * Returns props for item hint/description elements
  **/
  getItemHintProps: PropGetterFn;
  /**
    *  Returns props for item title elements
  **/
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
  Popper: Intergalactic.Component<'div', DropdownMenuProps & DropdownPopperAriaProps>;
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
    typeof Dropdown.Item,
    DropdownMenuItemProps,
    DropdownMenuContext,
    [handlers: DropdownMenuHandlers]
  > & {
    Addon: typeof Box;
    Content: typeof Flex;
    Text: typeof Text;
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
  Group: typeof Dropdown.Group;
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
  nestedMenuInteraction: eventInteraction;
};

export default DropdownMenu;
