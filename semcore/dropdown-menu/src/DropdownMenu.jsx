import React from 'react';
import cn from 'classnames';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Flex, useBox, useFlex } from '@semcore/flex-box';
import ScrollAreaComponent from '@semcore/scroll-area';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { hasFocusableIn } from '@semcore/utils/lib/use/useFocusLock';
import logger from '@semcore/utils/lib/logger';

import scrollStyles from './styleScrollArea';
import style from './style/dropdown-menu.shadow.css';

const KEYS = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
const INTERACTION_TAGS = ['INPUT', 'TEXTAREA', 'BUTTON'];

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
    interaction: 'click',
  };

  popperRef = React.createRef();

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
    const targetTagName = e.target.tagName;

    if (e.key === ' ' && INTERACTION_TAGS.includes(targetTagName)) return;
    if (e.key === 'Enter') {
      if (targetTagName === 'TEXTAREA') return;
      if (place === 'popper' && (targetTagName === 'BUTTON' || targetTagName === 'A')) return;
    }

    const { visible } = this.asProps;
    const element = this.popperRef.current;

    if (place === 'popper' && visible && e.key === 'Tab' && hasFocusableIn(element)) {
      this.handlers.highlightedIndex(null);

      return;
    }

    if (!KEYS.includes(e.key)) return;

    e.preventDefault();

    const isVisible = this.asProps.visible;

    this.handlers.visible(true);

    switch (e.key) {
      case 'ArrowDown': {
        isVisible && this.moveHighlightedIndex(amount, e);
        (targetTagName === 'BUTTON' || targetTagName === 'A') && element?.focus();
        break;
      }
      case 'ArrowUp': {
        isVisible && this.moveHighlightedIndex(-amount, e);
        (targetTagName === 'BUTTON' || targetTagName === 'A') && element?.focus();
        break;
      }
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
      'aria-activedescendant':
        visible && highlightedIndex !== null ? `igc-${uid}-option-${highlightedIndex}` : undefined,
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
    const { uid, disablePortal, ignorePortalsStacking, interaction, highlightedIndex } =
      this.asProps;

    return {
      ref: this.popperRef,
      tabIndex: 0,
      onKeyDown: this.bindHandlerKeyDown('popper'),
      id: `igc-${uid}-popper`,
      disablePortal,
      ignorePortalsStacking,
      focusMaster: interaction === 'click',
      hideFocus: highlightedIndex !== null,
    };
  }

  getItemProps(props, index) {
    const { size, highlightedIndex, uid } = this.asProps;
    const highlighted = index === highlightedIndex;
    const extraProps = {};
    this.itemProps[index] = props;
    if (highlighted) {
      extraProps.ref = this.scrollToNode;
    }

    return {
      id: `igc-${uid}-option-${index}`,
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
    setTimeout(() => {
      if (node?.scrollIntoView) {
        if (this.asProps.highlightedIndex !== this.prevHighlightedIndex) {
          this.prevHighlightedIndex = this.asProps.highlightedIndex;
          node.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
        }
      }
    }, 0);
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

    if (this.itemProps[newIndex]?.disabled) {
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
    const { Children, interaction, 'data-ui-name': dataUiName } = this.asProps;
    const props = {};

    logger.warn(
      interaction !== 'click' && interaction !== 'focus',
      "You shouldn't use prop `interaction` except with `click` or `focus` value.",
      dataUiName || DropdownMenuRoot.displayName,
    );

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
      tabIndex={null}
      role='menu'
      aria-labelledby={`igc-${uid}-trigger`}
      shadow={true}
      styles={scrollStyles}
    />,
  );
}

function Menu(props) {
  const {
    visible,
    disablePortal,
    ignorePortalsStacking,
    disableEnforceFocus,
    interaction,
    autoFocus,
    animationsDisabled,
    focusableTriggerReturnFocusToRef,
  } = props;
  const popperProps = {
    visible,
    disablePortal,
    ignorePortalsStacking,
    disableEnforceFocus,
    interaction,
    autoFocus,
    animationsDisabled,
    focusableTriggerReturnFocusToRef,
  };
  return (
    <DropdownMenu.Popper {...popperProps}>
      <Root render={DropdownMenu.List} />
    </DropdownMenu.Popper>
  );
}

function Item(props) {
  const [SDropdownMenuItem, { className, ...other }] = useFlex(props, props.forwardRef);
  const styles = sstyled(props.styles);
  return (
    <SDropdownMenuItem
      role='menuitem'
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
  return sstyled(props.styles)(<SDropdownMenuItem render={Flex} variant='hint' />);
}

function Title(props) {
  const SDropdownMenuItem = Root;
  return sstyled(props.styles)(<SDropdownMenuItem render={Flex} variant='title' />);
}

function Trigger() {
  return <Root render={Dropdown.Trigger} aria-haspopup='true' />;
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
