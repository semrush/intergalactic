import React from 'react';
import cn from 'classnames';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box, Flex, useBox, useFlex } from '@semcore/flex-box';
import ScrollAreaComponent from '@semcore/scroll-area';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/dropdown-menu.shadow.css';

const KEYS = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
const INTERACTION_TAGS = ['INPUT', 'TEXTAREA'];

class DropdownMenuRoot extends Component {
  static displayName = 'DropdownMenu';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

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

  getTriggerProps() {
    const { size, uid, disablePortal, visible } = this.asProps;

    return {
      size,
      id: `igc-dropdown-menu-${uid}-trigger`,
      'aria-controls': visible ? `igc-dropdown-menu-${uid}-popper` : undefined,
      'aria-flowto': visible && !disablePortal ? `igc-dropdown-menu-${uid}-popper` : undefined,
      'aria-label': visible && !disablePortal ? `Press Tab to go to popover` : undefined,
      onKeyDown: this.handlerKeyDown,
    };
  }

  getListProps() {
    const { size } = this.asProps;
    return {
      size,
      index: this.asProps.highlightedIndex,
    };
  }

  getPopperProps() {
    const { uid, disablePortal } = this.asProps;

    return {
      tabIndex: 0,
      onKeyDown: this.handlerKeyDown,
      id: `igc-dropdown-menu-${uid}-popper`,
      'aria-flowto': !disablePortal ? `igc-dropdown-menu-${uid}-trigger` : undefined,
    };
  }

  getItemProps(props, index) {
    const { size, highlightedIndex } = this.asProps;
    const highlighted = index === highlightedIndex;
    const extraProps = {};

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
    const { Children } = this.asProps;
    const props = {};

    this._items = [];

    return (
      <Root render={Dropdown} {...props}>
        <Children />
      </Root>
    );
  }
}

function List(props) {
  const SDropdownMenuList = Root;

  return sstyled(props.styles)(
    <SDropdownMenuList
      render={Box}
      tag={ScrollAreaComponent}
      role="menu"
      aria-activedescendant={props.index}
    />,
  );
}

function Menu() {
  return (
    <DropdownMenu.Popper>
      <Root render={DropdownMenu.List} />
    </DropdownMenu.Popper>
  );
}

function Item(props) {
  const [SDropdownMenuItem, { className, ...other }] = useFlex(props, props.forwardRef);
  const styles = sstyled(props.styles);
  return (
    <SDropdownMenuItem
      role="menuitem"
      tabIndex={0}
      id={props.label}
      className={
        cn(
          styles.cn('SDropdownMenuItem', {
            ...props,
            highlighted: !props.disabled && props.highlighted,
          }).className,
          className,
        ) || undefined
      }
      {...other}
    />
  );
}

function Addon(props) {
  const [SDropdownMenuItemAddon, { className, ...other }] = useBox(props, props.forwardRef);
  const styles = sstyled(props.styles);
  return (
    <SDropdownMenuItemAddon
      className={cn(styles.cn('SDropdownMenuItemAddon', props).className, className) || undefined}
      {...other}
    />
  );
}

function Hint(props) {
  const SDropdownMenuItem = Root;
  return sstyled(props.styles)(
    <SDropdownMenuItem render={Flex} variant="hint" role="menuitem" tabIndex={0} />,
  );
}

function Title(props) {
  const SDropdownMenuItem = Root;
  return sstyled(props.styles)(
    <SDropdownMenuItem render={Flex} variant="title" role="menuitem" tabIndex={0} />,
  );
}

function Trigger() {
  return <Root render={Dropdown.Trigger} type="button" aria-haspopup="true" />;
}

const DropdownMenu = createComponent(
  DropdownMenuRoot,
  {
    Trigger,
    Popper: Dropdown.Popper,
    List,
    Menu,
    Item: [Item, { Addon }],
    ItemTitle: Title,
    ItemHint: Hint,
  },
  {
    parent: [Dropdown],
  },
);

export default DropdownMenu;
