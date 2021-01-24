import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, PropGetterFn, styled, use } from '@semcore/core';
import Dropdown, { IDropdownContext, IDropdownProps } from '@semcore/dropdown';
import { Box, Flex, IBoxProps, IFlexProps, useBox, useFlex } from '@semcore/flex-box';
import ScrollAreaComponent, { IScrollAreaProps } from '@semcore/scroll-area';
import logger from '@semcore/utils/lib/logger';

import style from './style/dropdown-menu.shadow.css';

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

const KEYS = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
const INTERACTION_TAGS = ['INPUT', 'TEXTAREA'];

class DropdownMenuRoot extends Component<IDropdownMenuProps> {
  static displayName = 'DropdownMenu';
  static style = style;

  static defaultProps = {
    size: 'm',
    defaultVisible: false,
    defaultHighlightedIndex: null,
  };

  _items = [];

  _highlightedItem: HTMLElement;

  prevHighlightedIndex: number = null;

  uncontrolledProps() {
    return {
      highlightedIndex: null,
      visible: null,
    };
  }

  handlerKeyDown = (e) => {
    const amount = e.shiftKey ? 5 : 1;

    if (e.key === ' ' && INTERACTION_TAGS.includes(e.target.tagName)) return;

    if (!KEYS.includes(e.key)) return;

    e.preventDefault();

    this.handlers.visible(true);

    switch (e.key) {
      case 'ArrowDown':
        this.moveHighlightedIndex(amount, e);
        break;
      case 'ArrowUp':
        this.moveHighlightedIndex(-amount, e);
        break;
      case ' ':
      case 'Enter':
        if (this._highlightedItem) this._highlightedItem.click();
        break;
    }
  };

  bindHandlerFallbackSelect = (props, index) => () => {
    const { onSelect, multiselect } = this.asProps;
    const result = onSelect({
      index,
      ...props,
    });
    // @ts-ignore
    if (!multiselect && result !== false) {
      this.handlers.visible(false);
    }
  };

  getTriggerProps() {
    const { size } = this.asProps;
    return {
      size,
      onKeyDown: this.handlerKeyDown,
    };
  }

  getListProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  getPopperProps() {
    return {
      onKeyDown: this.handlerKeyDown,
    };
  }

  getItemProps(props, index) {
    const { size, highlightedIndex, onSelect } = this.asProps;
    const highlighted = index === highlightedIndex;
    const extraProps = {} as any;

    if (onSelect !== undefined) {
      extraProps.onClick = this.bindHandlerFallbackSelect(props, index);
    }

    this._items.push(props);
    if (highlighted) {
      extraProps.ref = this.scrollToNode;
    }

    return {
      size,
      highlighted,
      ...extraProps,
    };
  }

  getItemHintProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  getItemTitleProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  scrollToNode = (node) => {
    this._highlightedItem = node;
    if (node && node.scrollIntoView) {
      if (this.asProps.highlightedIndex !== this.prevHighlightedIndex) {
        this.prevHighlightedIndex = this.asProps.highlightedIndex;
        node.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
  };

  moveHighlightedIndex(amount, e) {
    let { highlightedIndex } = this.asProps;
    const itemsLastIndex = this._items.length - 1;
    const selectedIndex = this._items.findIndex((item) => item.selected);

    if (itemsLastIndex < 0) return;

    if (highlightedIndex == null) {
      if (selectedIndex !== -1) {
        highlightedIndex = selectedIndex;
      } else {
        highlightedIndex = amount < 0 ? 0 : itemsLastIndex;
      }
    }

    let newIndex = highlightedIndex + amount;
    if (newIndex < 0) {
      newIndex = amount + itemsLastIndex + 1;
    } else if (newIndex > itemsLastIndex) {
      newIndex = newIndex - itemsLastIndex - 1;
    }

    if (this._items[newIndex] && this._items[newIndex].disabled) {
      this.moveHighlightedIndex(amount < 0 ? amount - 1 : amount + 1, e);
    } else {
      this.handlers.highlightedIndex(newIndex, e);
    }
  }

  componentDidUpdate() {
    const { visible } = this.asProps;

    if (!visible) {
      this.handlers.highlightedIndex(null);
    }
  }

  render() {
    const Root = this.Root;
    const { optionCount, triggerType, onSelect, ...other } = this.asProps;
    const props = {} as any;

    this._items = [];

    logger.warn(
      onSelect !== undefined,
      "Свойство 'onSelect' является устаревшим, подпишитесь на 'onClick' нужного 'Item'",
      other['data-ui-name'] || DropdownMenu.displayName,
    );
    logger.warn(
      optionCount !== undefined,
      "Свойство 'optionCount' является устаревшим и теперь определяется автоматически от количества Item",
      other['data-ui-name'] || DropdownMenu.displayName,
    );
    logger.warn(
      triggerType !== undefined,
      "Свойство 'triggerType' является устаревшим, используйте 'interaction=\"focus\"'",
      other['data-ui-name'] || DropdownMenu.displayName,
    );
    if (triggerType === 'input') {
      props.interaction = 'focus';
    }

    return <Root render={Dropdown} {...props} />;
  }
}

function List(props) {
  const { Root: SDropdownMenuList, styles } = props;
  return styled(styles)(<SDropdownMenuList render={Box} tag={ScrollAreaComponent} role="menu" />);
}

function Menu(props) {
  const { Root } = props;
  return (
    <DropdownMenu.Popper>
      <Root render={DropdownMenu.List} />
    </DropdownMenu.Popper>
  );
}

function Item(props) {
  const [SDropdownMenuItem, other] = useFlex(props, props.forwardRef);
  const { styles, selected, disabled, highlighted, size, notInteractive } = props;
  return styled(styles)(
    <SDropdownMenuItem
      role="menuitem"
      tabIndex={-1}
      {...use({
        size,
        selected,
        disabled,
        notInteractive,
        highlighted: !disabled && highlighted,
      })}
      {...other}
    />,
  );
}

function Addon(props) {
  const [SDropdownMenuItemAddon, other] = useBox(props, props.forwardRef);
  const { styles } = props;

  return styled(styles)(<SDropdownMenuItemAddon {...other} />);
}

function Hint(props) {
  const SDropdownMenuItem = Flex;
  const { styles, size, forwardRef, ...other } = props;

  return styled(styles)(
    <SDropdownMenuItem ref={forwardRef} {...use({ variant: 'hint', size })} {...other} />,
  );
}

function Title(props) {
  const SDropdownMenuItem = Flex;
  const { styles, size, forwardRef, ...other } = props;

  return styled(styles)(
    <SDropdownMenuItem ref={forwardRef} {...use({ variant: 'title', size })} {...other} />,
  );
}

const DropdownMenu = createComponent<
  DropdownMenuRoot,
  {
    Trigger: ComponentProps<typeof Dropdown.Trigger>;
    Popper: ComponentProps<typeof Dropdown.Popper>;
    List: Merge<IDropdownMenuListProps, HTMLAttributes<HTMLDivElement>>;
    Menu: Merge<IDropdownMenuMenuProps, HTMLAttributes<HTMLDivElement>>;
    Item: [
      Merge<IDropdownMenuItemProps, HTMLAttributes<HTMLDivElement>>,
      {
        Addon: ComponentProps<typeof Box>;
      },
    ];
    ItemTitle: Merge<IDropdownMenuItemTitleProps, HTMLAttributes<HTMLDivElement>>;
    ItemHint: Merge<IDropdownMenuItemHintProps, HTMLAttributes<HTMLDivElement>>;
  },
  Merge<IDropdownMenuContext, IDropdownMenuProps>
>(
  DropdownMenuRoot,
  {
    Trigger: Dropdown.Trigger,
    Popper: Dropdown.Popper,
    List,
    Menu,
    Item: [Item, { Addon }],
    ItemTitle: Title,
    ItemHint: Hint,
  },
  {
    parent: Dropdown,
  },
);

export default DropdownMenu;
