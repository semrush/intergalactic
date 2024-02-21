import React from 'react';
import cn from 'classnames';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Flex, useBox, useFlex } from '@semcore/flex-box';
import ScrollAreaComponent from '@semcore/scroll-area';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { useFocusLock } from '@semcore/utils/lib/use/useFocusLock';

import scrollStyles from './styleScrollArea';
import style from './style/dropdown-menu.shadow.css';
import { setFocus } from '@semcore/utils/src/focus-lock/setFocus';
import { isFocusInside } from '@semcore/utils/src/focus-lock/isFocusInside';
import { getFocusableIn } from '@semcore/utils/src/focus-lock/getFocusableIn';

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

  state = {
    focusLockItemIndex: null,
  };

  popperRef = React.createRef();
  triggerRef = React.createRef();

  itemProps = [];
  itemRefs = [];

  highlightedItemRef = React.createRef();

  ignoreTriggerKeyboardFocusUntil = 0;
  prevHighlightedIndex = null;

  uncontrolledProps() {
    return {
      highlightedIndex: null,
      visible: [
        null,
        (visible) => {
          if (!visible) {
            this.ignoreTriggerKeyboardFocusUntil = Date.now() + 100;
          }
        },
      ],
    };
  }

  focusTrigger = () => {
    const trigger = this.triggerRef.current;
    if (!trigger) return;
    if (isFocusInside(trigger)) return;
    setFocus(trigger);
  };

  bindHandlerKeyDown = (place) => (e) => {
    const amount = e.shiftKey ? 5 : 1;
    const targetTagName = e.target.tagName;

    const { visible, highlightedIndex, placement } = this.asProps;

    if (e.key === ' ' && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(targetTagName)) return;
    if (e.key === 'Enter') {
      if (targetTagName === 'TEXTAREA') return;
      if (place === 'popper' && (targetTagName === 'BUTTON' || targetTagName === 'A')) return;
    }

    if (visible && e.key === 'Tab') {
      const item = highlightedIndex !== null && this.itemRefs[highlightedIndex];
      if (item && getFocusableIn(item).length !== 0) {
        this.setState({ focusLockItemIndex: highlightedIndex });
      } else {
        this.handlers.highlightedIndex(null);
      }
      return;
    }

    if (e.key === 'Escape' && this.state.focusLockItemIndex !== null) {
      this.setState({ focusLockItemIndex: null });
      return false;
    }

    const verticalPlacement =
      !placement || placement.startsWith('top') || placement.startsWith('bottom');

    if (['ArrowDown', 'ArrowUp'].includes(e.key) && verticalPlacement) {
      e.preventDefault();
      this.handlers.visible(true);
    }
    if (['ArrowLeft', 'ArrowRight'].includes(e.key) && !verticalPlacement) {
      const show =
        (e.key === 'ArrowRight' && placement.startsWith('right')) ||
        (e.key === 'ArrowLeft' && placement.startsWith('left'));
      const hide =
        (e.key === 'ArrowLeft' && placement.startsWith('right')) ||
        (e.key === 'ArrowRight' && placement.startsWith('left'));
      const visibleChanged = (visible && hide) || (!visible && show);
      if (show) {
        this.handlers.visible(true);
      } else if (hide) {
        this.handlers.visible(false);
      }
      if (visibleChanged) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const item = highlightedIndex !== null && this.itemRefs[highlightedIndex];
      const focusable = getFocusableIn(item);
      if (focusable.length > 0 && item) {
        const focusedIndex = focusable.indexOf(document.activeElement);
        if (e.key === 'ArrowRight') {
          if (focusedIndex === -1) {
            this.setState({ focusLockItemIndex: highlightedIndex });
          }
          const nextFocused = focusable[focusedIndex + 1];
          if (nextFocused) {
            e.preventDefault();
            e.stopPropagation();
            nextFocused.focus();
          }
        } else if (e.key === 'ArrowLeft') {
          if (focusedIndex === 0) {
            this.setState({ focusLockItemIndex: null });
          }
          const prevFocused = focusable[focusedIndex - 1];
          if (prevFocused) {
            e.preventDefault();
            e.stopPropagation();
            prevFocused.focus();
          }
        }
      }
    }

    switch (e.key) {
      case 'ArrowDown': {
        if (visible) {
          this.moveHighlightedIndex(amount, e);
          if (isFocusInside(this.popperRef.current)) {
            this.focusTrigger();
          }
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      }
      case 'ArrowUp': {
        if (visible) {
          this.moveHighlightedIndex(-amount, e);
          if (isFocusInside(this.popperRef.current)) {
            this.focusTrigger();
          }
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      }
      case ' ':
      case 'Enter':
        if (this.highlightedItemRef.current) {
          e.stopPropagation();
          e.preventDefault();
          this.highlightedItemRef.current.click();
        } else {
          if (place === 'trigger') {
            this.handlers.visible(false);

            e.preventDefault();
          }
        }
        break;
    }
  };

  handleTriggerKeyboardFocus = () => {
    if (this.ignoreTriggerKeyboardFocusUntil > Date.now()) return false;
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
      ref: this.triggerRef,
      onKeyboardFocus: this.handleTriggerKeyboardFocus,
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
    let ref = this.itemRefs[index];
    this.itemProps[index] = props;
    if (highlighted) {
      ref = (node) => {
        this.itemRefs[index] = node;
        this.scrollToNode(node);
      };
    }

    return {
      id: `igc-${uid}-option-${index}`,
      size,
      highlighted,
      focusLock: this.state.focusLockItemIndex === index,
      triggerRef: this.triggerRef,
      ref,
      index,
    };
  }

  handleNestingClick = (event) => {
    const itemIndex = this.itemRefs.indexOf(event.currentTarget);
    if (itemIndex === -1) return;
    const focusable = getFocusableIn(event.currentTarget);
    focusable[0]?.focus();
    if (focusable[0] && this.state.focusLockItemIndex === null) {
      this.setState({ focusLockItemIndex: null });
      event.preventDefault();
      event.stopPropagation();
    }
  };
  handleNestingKeyDown = (event) => {
    if (event.key === ' ') {
      this.handleNestingClick(event);
    }
  };
  getNestingProps = () => {
    const { size } = this.asProps;
    return {
      size,
      onClick: this.handleNestingClick,
      onKeyDown: this.handleNestingKeyDown,
    };
  };
  handleNestedVisibleChange = (lastUserInteraction) => {
    if (
      this.asProps.visible &&
      this.asProps.highlightedIndex === null &&
      lastUserInteraction === 'keyboard'
    ) {
      this.handlers.highlightedIndex(0);
    }
  };
  getNestingTriggerProps = () => {
    const { size, visible } = this.asProps;
    return {
      size,
      visible,
      onNestedVisibleChange: this.handleNestedVisibleChange,
    };
  };

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
    if (node) {
      this.highlightedItemRef.current = node;
    }
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
      } else if (this.highlightedItemRef.current) {
        highlightedIndex = this.prevHighlightedIndex;
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
    if (!this.asProps.visible) {
      this.handlers.highlightedIndex(null);
    }
    if (
      (this.state.focusLockItemIndex !== this.asProps.highlightedIndex || !this.asProps.visible) &&
      this.state.focusLockItemIndex !== null
    ) {
      setTimeout(() => {
        this.setState({ focusLockItemIndex: null });
      }, 0);
    }
  }

  render() {
    const { Children } = this.asProps;

    this.itemProps = [];

    return (
      <Root render={Dropdown}>
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
  } = props;
  const popperProps = {
    visible,
    disablePortal,
    ignorePortalsStacking,
    disableEnforceFocus,
    interaction,
    autoFocus,
    animationsDisabled,
  };
  return (
    <DropdownMenu.Popper {...popperProps}>
      <Root render={DropdownMenu.List} />
    </DropdownMenu.Popper>
  );
}

function Item({ styles, label, triggerRef, focusLock, disabled, highlighted }) {
  const SDropdownMenuItem = Root;
  const ref = React.useRef();

  useFocusLock(ref, false, triggerRef, !focusLock || disabled, true);

  return sstyled(styles)(
    <SDropdownMenuItem
      ref={ref}
      render={Flex}
      role='menuitem'
      tabIndex={-1}
      id={label}
      use:highlighted={!disabled && highlighted}
    />,
  );
}

function Nesting({ styles }) {
  const SDropdownMenuNesting = Root;

  return sstyled(styles)(<SDropdownMenuNesting aria-haspopup='true' render={DropdownMenu.Item} />);
}

function NestingTrigger({ styles, visible, onNestedVisibleChange }) {
  const SDropdownMenuItem = Root;

  const lastUserInteractionRef = React.useRef(undefined);
  React.useEffect(() => {
    onNestedVisibleChange(lastUserInteractionRef.current);
  }, [visible]);

  const handleMouseEvent = React.useCallback(() => {
    lastUserInteractionRef.current = 'mouse';
  }, []);
  const handleKeyboardEvent = React.useCallback(() => {
    lastUserInteractionRef.current = 'keyboard';
  }, []);

  React.useEffect(() => {
    document.addEventListener('mouseover', handleMouseEvent, { capture: true });
    document.addEventListener('keydown', handleKeyboardEvent, { capture: true });
    return () => {
      document.removeEventListener('mouseover', handleMouseEvent, { capture: true });
      document.removeEventListener('keydown', handleKeyboardEvent, { capture: true });
    };
  }, []);

  return sstyled(styles)(<SDropdownMenuItem nesting-trigger tabIndex={0} render={Flex} />);
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
    Nesting: [Nesting, { Trigger: NestingTrigger, Addon }],
    ItemTitle: Title,
    ItemHint: Hint,
  },
  {
    parent: [Dropdown],
  },
);

export default DropdownMenu;
