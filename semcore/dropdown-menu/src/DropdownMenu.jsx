import React from 'react';
import cn from 'classnames';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Flex, useBox, useFlex } from '@semcore/flex-box';
import ScrollAreaComponent from '@semcore/scroll-area';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

import scrollStyles from './styleScrollArea';
import style from './style/dropdown-menu.shadow.css';

const KEYS = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
const INTERACTION_TAGS = ['INPUT', 'TEXTAREA'];

class DropdownMenuRoot extends Component {
  static displayName = 'DropdownMenu';
  static style = style;
  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)];

  static defaultProps = {
    size: 'm',
    defaultVisible: false,
    defaultHighlightedIndex: null,
    i18n: localizedMessages,
    locale: 'en',
  };

  itemProps = [];

  highlightedItemRef = React.createRef();

  prevHighlightedIndex = null;

  uncontrolledProps() {
    return {
      highlightedIndex: null,
      visible: null,
    };
  }

  bindHandlerKeyDown = (place) => (e) => {
    const amount = e.shiftKey ? 5 : 1;

    if (e.key === ' ' && INTERACTION_TAGS.includes(e.target.tagName)) return;
    if (e.key === 'Enter' && e.target.tagName === 'TEXTAREA') return;
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
        if (this.highlightedItemRef.current) {
          this.highlightedItemRef.current.click();
        } else {
          if (place === 'trigger') this.handlers.visible(false);
        }
        break;
    }
  };

  getTriggerProps() {
    const { size, uid, disablePortal, visible, getI18nText, highlightedIndex } = this.asProps;

    return {
      size,
      id: `igc-${uid}-trigger`,
      'aria-controls': `igc-${uid}-popper`,
      focusHint: visible && !disablePortal ? getI18nText('triggerHint') : undefined,
      'aria-expanded': visible ? 'true' : 'false',
      'aria-activedescendant': highlightedIndex,
      onKeyDown: this.bindHandlerKeyDown('trigger'),
    };
  }

  getListProps() {
    const { size, uid } = this.asProps;
    return {
      size,
      uid,
      index: this.asProps.highlightedIndex,
    };
  }

  getPopperProps() {
    const { uid, disablePortal, ignorePortalsStacking } = this.asProps;

    return {
      tabIndex: 0,
      onKeyDown: this.bindHandlerKeyDown('popper'),
      id: `igc-${uid}-popper`,
      disablePortal,
      ignorePortalsStacking,
    };
  }

  getItemProps(props, index) {
    const { size, highlightedIndex } = this.asProps;
    const highlighted = index === highlightedIndex;
    const extraProps = {};
    this.itemProps[index] = props;
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
    this.highlightedItemRef.current = node;
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
    const itemsLastIndex = this.itemProps.length - 1;
    const selectedIndex = this.itemProps.findIndex((item) => item.selected);

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

    if (this.itemProps[newIndex] && this.itemProps[newIndex].disabled) {
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

    this.itemProps = [];

    return (
      <Root render={Dropdown} {...props}>
        <Children />
      </Root>
    );
  }
}

function List(props) {
  const SDropdownMenuList = Root;
  const { uid } = props;

  return sstyled(props.styles)(
    <SDropdownMenuList
      render={ScrollAreaComponent}
      role="menu"
      aria-labelledby={`igc-${uid}-trigger`}
      shadow={true}
      styles={scrollStyles}
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
      tabIndex={-1}
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
  return sstyled(props.styles)(<SDropdownMenuItem render={Flex} variant="hint" />);
}

function Title(props) {
  const SDropdownMenuItem = Root;
  return sstyled(props.styles)(<SDropdownMenuItem render={Flex} variant="title" />);
}

function Trigger() {
  return <Root render={Dropdown.Trigger} aria-haspopup="true" />;
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
