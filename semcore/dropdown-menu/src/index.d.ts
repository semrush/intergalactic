import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import Dropdown, { IDropdownContext, IDropdownProps, IDropdownHandlers } from '@semcore/dropdown';
import { Box, IBoxProps, IFlexProps } from '@semcore/flex-box';
import { IScrollAreaProps } from '@semcore/scroll-area';

export type DropdownMenuSize = 'm' | 'l' | 'xl';

export interface IDropdownMenuProps extends IDropdownProps {
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
  /** @deprecated v2.0.0 */
  optionCount?: number;
  /** Trigger type selection
   * @deprecated v2.0.0 */
  triggerType?: 'button' | 'input';
  /** Handler in option selection
   * @deprecated v2.0.0 */
  onSelect?: (item: any) => void;
  /** Multiple choice of options
   * @deprecated v2.0.0 {@link ISelectProps.multiselect} */
  multiselect?: boolean;
}

export interface IDropdownMenuListProps extends IBoxProps, IScrollAreaProps {
  /**
   * Size of the menu
   * @default m
   */
  size?: DropdownMenuSize;
}

export interface IDropdownMenuMenuProps extends IDropdownMenuListProps {}

export interface IDropdownMenuItemProps extends IFlexProps {
  /**
   * Enables selected state
   */
  selected?: boolean;
  /**
   * Disables the component
   */
  disabled?: boolean;
  /**
   * Adds focus styles around
   */
  highlighted?: boolean;
  /**
   * Makes the element non-interactive
   */
  notInteractive?: boolean;
  /**
   * Size of the component
   * @default m
   */
  size?: DropdownMenuSize;
}

export interface IDropdownMenuItemHintProps extends IFlexProps {
  /**
   * Size of the component
   * @default m
   */
  size?: DropdownMenuSize;
}

export interface IDropdownMenuItemTitleProps extends IFlexProps {
  /**
   * Size of the component
   * @default m
   */
  size?: DropdownMenuSize;
}

export interface IDropdownMenuContext extends IDropdownContext {
  getListProps: PropGetterFn;
  getItemProps: PropGetterFn;
  getItemHintProps: PropGetterFn;
  getItemTitleProps: PropGetterFn;
}

export interface IDropdownMenuHandlers extends IDropdownHandlers {
  highlightedIndex: (index: number) => void;
}

declare const DropdownMenu: (<T>(
  props: CProps<IDropdownMenuProps & T, IDropdownMenuContext, IDropdownMenuHandlers>,
) => ReturnEl) & {
  Trigger: typeof Dropdown.Trigger;
  Popper: typeof Dropdown.Popper;
  List: <T>(
    props: CProps<IDropdownMenuListProps & T, IDropdownMenuContext, IDropdownMenuHandlers>,
  ) => ReturnEl;
  Menu: <T>(
    props: CProps<IDropdownMenuMenuProps & T, IDropdownMenuContext, IDropdownMenuHandlers>,
  ) => ReturnEl;
  Item: (<T>(
    props: CProps<IDropdownMenuItemProps & T, IDropdownMenuContext, IDropdownMenuHandlers>,
  ) => ReturnEl) & {
    Addon: typeof Box;
  };
  ItemTitle: <T>(props: IDropdownMenuItemTitleProps & T) => ReturnEl;
  ItemHint: <T>(props: IDropdownMenuItemHintProps & T) => ReturnEl;
};

export default DropdownMenu;
