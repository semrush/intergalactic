import React from 'react';
import cn from 'classnames';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Flex, useBox, Box } from '@semcore/flex-box';
import ScrollAreaComponent, { hideScrollBarsFromScreenReadersContext } from '@semcore/scroll-area';
import uniqueIDEnhancement, { useUID } from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { useFocusLock } from '@semcore/utils/lib/use/useFocusLock';
import { hasParent } from '@semcore/utils/lib/hasParent';

import style from './style/dropdown-menu.shadow.css';
import { setFocus } from '@semcore/utils/lib/focus-lock/setFocus';
import { isFocusInside } from '@semcore/utils/lib/focus-lock/isFocusInside';
import { getFocusableIn } from '@semcore/utils/lib/focus-lock/getFocusableIn';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import Button from '@semcore/button';
import TrashM from '@semcore/icon/Trash/m';

const ListBoxContextProvider = ({ children }) => (
  <hideScrollBarsFromScreenReadersContext.Provider value={true}>
    {children}
  </hideScrollBarsFromScreenReadersContext.Provider>
);

const tooltipIndexContext = React.createContext(0);

class DropdownMenuRoot extends Component {
  static displayName = 'DropdownMenu';
  static style = style;
  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)];

  static defaultProps = {
    size: 'm',
    defaultVisible: false,
    defaultHighlightedIndex: 0,
    defaultTooltipIndex: 0,
    i18n: localizedMessages,
    locale: 'en',
    interaction: 'click',
  };

  state = {
    focusLockItemIndex: null,
    keyboardFocused: false,
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
      tooltipIndex: null,
      highlightedIndex: [
        null,
        (index) => {
          this.handlers.tooltipIndex(index);
        },
      ],
      visible: null,
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

    if (e.key === ' ' && ['INPUT', 'TEXTAREA'].includes(targetTagName)) return;
    if (e.key === 'Enter' && targetTagName === 'TEXTAREA') return;
    if (
      place === 'popper' &&
      (e.key === ' ' || e.key === 'Enter') &&
      (targetTagName === 'BUTTON' || targetTagName === 'A')
    )
      return;

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
    if (e.key.startsWith('Arrow') && !this.state.keyboardFocused) {
      this.setState({ keyboardFocused: true });
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
        if (this.highlightedItemRef.current && highlightedIndex !== null) {
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
  handleTriggerKeyboardFocusedStateChange = (keyboardFocused) => {
    this.setState({ keyboardFocused });
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
      onKeyboardFocusedStateChange: this.handleTriggerKeyboardFocusedStateChange,
    };
  }

  getListProps() {
    const { size } = this.asProps;
    const triggerId = this.triggerRef.current?.id;

    return {
      size,
      index: this.asProps.highlightedIndex,
      'aria-labelledby': triggerId,
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
      'use:role': null,
      'use:autoFocus': false,
    };
  }

  getGroupProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  getItemProps(props, index) {
    const { size, highlightedIndex, uid } = this.asProps;
    const highlighted = index === highlightedIndex;
    let ref = (node) => {
      this.itemRefs[index] = node;
    };
    this.itemProps[index] = props;
    if (highlighted) {
      ref = (node) => {
        this.itemRefs[index] = node;
        this.scrollToNode(node);
      };
    } else {
      ref = (node) => {
        node?.blur();
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
      handleFocusOut: this.handleItemFocusOut,
      triggerKeyboardFocused: this.state.keyboardFocused,
      onMouseEnter: () => this.handlers.tooltipIndex(index),
    };
  }

  handleItemFocusOut = (event) => {
    if (event.relatedTarget === this.popperRef.current) return;
    const focused = event.relatedTarget;

    if (hasParent(focused, this.popperRef.current)) {
      this.handlers.highlightedIndex(null);
      this.setState({ focusLockItemIndex: null });
      focused.focus();
    }
  };

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
  getNestingItemProps = () => {
    return this.getNestingTriggerProps();
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
    } else if (!this.itemProps[newIndex]) {
      this.handlers.highlightedIndex(0, e);
    } else {
      this.handlers.highlightedIndex(newIndex, e);
    }
  }

  componentDidUpdate(prevProps) {
    const visibilityChanged = this.asProps.visible !== prevProps.visible;
    if (visibilityChanged && prevProps.visible !== undefined) {
      if (!this.asProps.visible) {
        this.handlers.highlightedIndex(null);
        this.highlightedItemRef.current = null;
        this.ignoreTriggerKeyboardFocusUntil = Date.now() + 100;
        if (document.activeElement === document.body || isFocusInside(this.popperRef.current)) {
          setFocus(this.triggerRef.current);
        }
      }
    }
    if (visibilityChanged && this.asProps.visible) {
      setTimeout(() => {
        const selectedItemIndex = this.itemProps.findIndex((item) => item.selected);
        if (selectedItemIndex === -1 || this.asProps.highlightedIndex !== null) return;
        this.handlers.highlightedIndex(selectedItemIndex);
      }, 0);
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
    const { Children, tooltipIndex } = this.asProps;

    this.itemProps = [];

    return (
      <tooltipIndexContext.Provider value={tooltipIndex}>
        <Root render={Dropdown}>
          <Children />
        </Root>
      </tooltipIndexContext.Provider>
    );
  }
}

function List(props) {
  const SDropdownMenuList = Root;

  return sstyled(props.styles)(
    <ListBoxContextProvider>
      <SDropdownMenuList render={ScrollAreaComponent} tabIndex={null} role='menu' shadow={true} />
    </ListBoxContextProvider>,
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
    <ListBoxContextProvider>
      <DropdownMenu.Popper {...popperProps}>
        <Root render={DropdownMenu.List} />
      </DropdownMenu.Popper>
    </ListBoxContextProvider>
  );
}

function Item({
  styles,
  label,
  triggerRef,
  focusLock,
  disabled,
  highlighted,
  handleFocusOut,
  triggerKeyboardFocused,
  subTitle,
  size,
  selected,
  variant,
}) {
  const SDropdownMenuItemContainer = Box;
  const SDropdownMenuItem = Root;
  const SItemHint = Flex;
  const uidSubTitle = useUID('sub_title_mi');
  const ref = React.useRef();

  useFocusLock(ref, false, triggerRef, !focusLock || disabled, true, handleFocusOut);

  return sstyled(styles)(
    <SDropdownMenuItemContainer
      size={size}
      use:highlighted={!disabled && highlighted && triggerKeyboardFocused}
      disabled={disabled}
      selected={selected}
      variant={variant}
    >
      <SDropdownMenuItem
        ref={ref}
        render={Flex}
        role='menuitem'
        tabIndex={-1}
        id={label}
        aria-describedby={subTitle ? uidSubTitle : undefined}
      />
      {subTitle && (
        <SItemHint aria-hidden={'true'} tabindex={-1} id={uidSubTitle}>
          {subTitle}
        </SItemHint>
      )}
    </SDropdownMenuItemContainer>,
  );
}

const NestingContext = React.createContext(null);

function Nesting({ styles, disabled }) {
  const SDropdownMenuNesting = Root;
  const contextValue = React.useMemo(() => ({ disabled }), [disabled]);

  return (
    <NestingContext.Provider value={contextValue}>
      {sstyled(styles)(<SDropdownMenuNesting aria-haspopup='true' render={DropdownMenu.Item} />)}
    </NestingContext.Provider>
  );
}

function NestingTrigger(props) {
  const { styles, visible, onNestedVisibleChange } = props;
  const SDropdownMenuItemContainer = Root;
  const nestingContext = React.useContext(NestingContext);
  const disabled = props.disabled || nestingContext?.disabled;

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
    document.addEventListener('keydown', handleKeyboardEvent, {
      capture: true,
    });
    return () => {
      document.removeEventListener('mouseover', handleMouseEvent, {
        capture: true,
      });
      document.removeEventListener('keydown', handleKeyboardEvent, {
        capture: true,
      });
    };
  }, []);

  return (
    <NestingContext.Provider value={null}>
      {sstyled(styles)(
        <SDropdownMenuItemContainer
          nesting-trigger
          use:tabIndex={!disabled ? 0 : undefined}
          render={Flex}
        />,
      )}
    </NestingContext.Provider>
  );
}

function NestingItem(props) {
  const { styles } = props;
  const SDropdownNestingItem = Root;

  return sstyled(styles)(<SDropdownNestingItem render={NestingTrigger} use:tabIndex={-1} />);
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

/**
 * @deprecated Use Item hint
 */
function Hint(props) {
  const SDropdownMenuItemContainer = Root;
  return sstyled(props.styles)(<SDropdownMenuItemContainer render={Flex} variant='hint' />);
}
/**
 * @deprecated Use Group with title prop
 */
function Title(props) {
  const SDropdownMenuItemContainer = Root;
  return sstyled(props.styles)(<SDropdownMenuItemContainer render={Flex} variant='title' />);
}

function Trigger({ keyboardFocused, onKeyboardFocusedStateChange }) {
  React.useEffect(() => {
    onKeyboardFocusedStateChange(keyboardFocused);
  }, [keyboardFocused, onKeyboardFocusedStateChange]);

  return <Root render={Dropdown.Trigger} aria-haspopup='true' />;
}
Trigger.enhance = [keyboardFocusEnhance(false)];

function Group({ styles, title, Children, subTitle, size }) {
  const SGroup = Root;
  const SDropdownMenuItemContainer = Box;
  const SGroupTitle = Flex;
  const SGroupHint = Flex;
  const uidTitle = useUID('title_mi_group');
  const uidSubTitle = useUID('sub_title_mi_group');
  const groupAriaProps = {
    'aria-labelledby': uidTitle,
    'aria-describedby': subTitle ? uidSubTitle : undefined,
  };
  return sstyled(styles)(
    <>
      <SDropdownMenuItemContainer notInteractive aria-hidden={'true'} tabindex={-1} size={size}>
        <SGroupTitle id={uidTitle}>{title}</SGroupTitle>
        {subTitle && <SGroupHint id={uidSubTitle}>{subTitle}</SGroupHint>}
      </SDropdownMenuItemContainer>
      <SGroup render={Box} role={'group'} {...groupAriaProps}>
        <Children />
      </SGroup>
    </>,
  );
}

// class DropdownMenuItemRoot extends Component {
//   static displayName = 'DropdownMenuItem';
//   static style = style;
//   static enhance = [uniqueIDEnhancement()];
//
//   getContentProps() {
//     const { size, uid } = this.asProps;
//     return {
//       size,
//       'aria-describedby': `igc-${uid}-option-hint`,
//     };
//   }
//
//   getHintProps() {
//     const { size, uid } = this.asProps;
//     return {
//       size,
//       id: `igc-${uid}-option-hint`,
//     };
//   }
//
//   render() {
//     const { styles, label, disabled, highlighted, triggerKeyboardFocused, Children } = this.asProps;
//     const SDropdownMenuItem = Root;
//
//     const advancedMode = isAdvanceMode(Children, [DropdownMenuItem.Content.displayName], true);
//
//     return sstyled(styles)(
//       <SDropdownMenuItem
//         ref={this.ref}
//         render={Box}
//         role={advancedMode ? undefined : 'menuitem'}
//         tabIndex={-1}
//         id={label}
//         use:highlighted={!disabled && highlighted && triggerKeyboardFocused}
//       >
//         <Children />
//       </SDropdownMenuItem>,
//     );
//   }
// }

// function ItemContent({ styles }) {
//   const SItemContent = Root;
//   return sstyled(styles)(<SItemContent render={Flex} role='menuitem' />);
// }
//
// function ItemHint({ styles }) {
//   const SItemHint = Root;
//   return sstyled(styles)(<SItemHint render={Flex} aria-hidden={'true'} tabindex={-1} />);
// }
//
// function DeleteButton({ styles }) {
//   const SDeleteButton = Root;
//   return sstyled(styles)(
//     <SDeleteButton render={Button} addonLeft={TrashM} aria-label={'Delete'} />,
//   );
// }

// const DropdownMenuItem = createComponent(DropdownMenuItemRoot, {
//   Addon,
//   Content: ItemContent,
//   Hint: ItemHint,
//   DeleteButton,
// });

const DropdownMenu = createComponent(
  DropdownMenuRoot,
  {
    Trigger,
    Popper: Dropdown.Popper,
    List,
    Menu,
    Item: [Item, { Addon }],
    Nesting: [Nesting, { Trigger: NestingTrigger, Addon, Item: NestingItem }],
    ItemTitle: Title,
    ItemHint: Hint,
    Group,
  },
  {
    parent: [Dropdown],
  },
);

DropdownMenu.tooltipIndexContext = tooltipIndexContext;

export default DropdownMenu;
