import type { Box, BoxProps, FlexProps, Flex, eventInteraction, ScrollAreaProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type {
  DropdownContext,
  DropdownProps,
  DropdownHandlers,
  DropdownTriggerProps,
  DropdownPopperAriaProps,
  StatusItemComponent,
} from '@semcore/dropdown';
import type Dropdown from '@semcore/dropdown';
import type { Text } from '@semcore/typography';

import type { VirtualList, RenderRowProps } from './components/VirtualList';

export type DropdownMenuSize = 'm' | 'l';

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
};

export type DropdownMenuListProps = BoxProps &
  ScrollAreaProps & {
    /**
     * Size of the menu
     * @default m
     */
    size?: DropdownMenuSize;
  };

export type DropdownMenuMenuProps = DropdownMenuListProps & {};

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
   * Size of the component
   * @default m
   */
  size?: DropdownMenuSize;
  /**
   * Index of item (used in virtualized lists)
   */
  index?: number;
};

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

  Group: typeof Dropdown.Group;

  StatusItem: StatusItemComponent;

  VirtualList: typeof VirtualList;

  selectedIndexContext: React.Context<number>;
  nestedMenuInteraction: eventInteraction;
};

export default DropdownMenu;

export {
  RenderRowProps,
};
