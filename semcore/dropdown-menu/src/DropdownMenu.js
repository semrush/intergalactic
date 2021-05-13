import React from 'react';
import createComponent, { Component, styled, use, Root } from '@semcore/core';
import Dropdown, { IDropdownContext, IDropdownProps } from '@semcore/dropdown';
import { Box, Flex, useBox, useFlex } from '@semcore/flex-box';
import ScrollAreaComponent from '@semcore/scroll-area';
import logger from '@semcore/utils/lib/logger';

import style from './style/dropdown-menu.shadow.css';

const KEYS = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
const INTERACTION_TAGS = ['INPUT', 'TEXTAREA'];

class DropdownMenuRoot extends Component {
  static displayName = 'DropdownMenu';
  static style = style;

  static defaultProps = {
    size: 'm',
    defaultVisible: false,
    defaultHighlightedIndex: null,
  };

  _items = [];

  _highlightedItem = null;

  prevHighlightedIndex = null;

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
    const extraProps = {};

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
    const { optionCount, triggerType, onSelect, ...other } = this.asProps;
    const props = {};

    this._items = [];

    logger.warn(
      onSelect !== undefined,
      "Property 'onSelect' is deprecated, subscribe to the 'onClick' of the needed 'Item'",
      other['data-ui-name'] || DropdownMenu.displayName,
    );
    logger.warn(
      optionCount !== undefined,
      "The 'optionCount' property is deprecated and is now automatically determined from the number of Item",
      other['data-ui-name'] || DropdownMenu.displayName,
    );
    logger.warn(
      triggerType !== undefined,
      "The 'triggerType' property is deprecated, use 'interaction=\"focus\"'",
      other['data-ui-name'] || DropdownMenu.displayName,
    );
    if (triggerType === 'input') {
      props.interaction = 'focus';
    }

    return <Root render={Dropdown} {...props} />;
  }
}

function List(props) {
  const SDropdownMenuList = Root;
  const { styles } = props;
  return styled(styles)(<SDropdownMenuList render={Box} tag={ScrollAreaComponent} role="menu" />);
}

function Menu(props) {
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

const DropdownMenu = createComponent(
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
