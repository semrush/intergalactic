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
import ButtonComponent from '@semcore/button';

const ListBoxContextProvider = ({ children }) => (
  <hideScrollBarsFromScreenReadersContext.Provider value={true}>
    {children}
  </hideScrollBarsFromScreenReadersContext.Provider>
);

const selectedIndexContext = React.createContext(0);
const menuItemContext = React.createContext({});

class DropdownMenuRoot extends Component {
  static displayName = 'DropdownMenu';
  static style = style;
  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)];

  static defaultProps = {
    size: 'm',
    defaultVisible: false,
    defaultHighlightedIndex: 0,
    defaultSelectedIndex: 0,
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
  menuRef = React.createRef();

  itemProps = [];
  itemRefs = [];

  highlightedItemRef = React.createRef();

  ignoreTriggerKeyboardFocusUntil = 0;
  prevHighlightedIndex = null;

  uncontrolledProps() {
    return {
      selectedIndex: null,
      highlightedIndex: [
        null,
        (index) => {
          this.handlers.selectedIndex(index);
        },
      ],
      visible: null,
    };
  }

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
            // this.menuRef.current?.focus();
            item.focus();
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
          setTimeout(() => {
            this.itemRefs[this.asProps.highlightedIndex]?.focus();
          });
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      }
      case 'ArrowUp': {
        if (visible) {
          this.moveHighlightedIndex(-amount, e);
          setTimeout(() => {
            this.itemRefs[this.asProps.highlightedIndex]?.focus();
          });
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

  getTriggerProps() {
    const { size, uid, disablePortal, visible, getI18nText, highlightedIndex } = this.asProps;

    return {
      size,
      id: `igc-${uid}-trigger`,
      'aria-controls': visible ? `igc-${uid}-list` : undefined,
      focusHint: visible && !disablePortal ? getI18nText('triggerHint') : undefined,
      'aria-expanded': visible ? 'true' : 'false',
      onKeyDown: this.bindHandlerKeyDown('trigger'),
      ref: this.triggerRef,
    };
  }

  getListProps() {
    const { size, highlightedIndex, visible, uid } = this.asProps;
    const triggerId = this.triggerRef.current?.id;

    return {
      size,
      index: this.asProps.highlightedIndex,
      ref: this.menuRef,
      id: `igc-${uid}-list`,
      role: 'menu',
      'aria-labelledby': triggerId,
    };
  }

  getPopperProps() {
    const { uid, disablePortal, ignorePortalsStacking, interaction, highlightedIndex } =
      this.asProps;

    return {
      ref: this.popperRef,
      tabIndex: -1,
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
    }

    return {
      id: `igc-${uid}-option-${index}`,
      size,
      focusLock: highlighted,
      tabIndex: highlighted ? 1 : -1,
      ref,
      index,
      handleFocusOut: this.handleItemFocusOut,
      onMouseEnter: () => this.handlers.selectedIndex(index),
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
    const { Children, selectedIndex } = this.asProps;

    this.itemProps = [];

    return (
      <selectedIndexContext.Provider value={selectedIndex}>
        <Root render={Dropdown}>
          <Children />
        </Root>
      </selectedIndexContext.Provider>
    );
  }
}

function List(props) {
  const SDropdownMenuList = Root;

  return sstyled(props.styles)(
    <ListBoxContextProvider>
      <ScrollAreaComponent shadow={true}>
        <SDropdownMenuList render={ScrollAreaComponent.Container} />
      </ScrollAreaComponent>
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
  focusLock,
  disabled,
  handleFocusOut,
  Children,
  'aria-describedby': ariaDescribedby,
}) {
  const SDropdownMenuItemContainer = Root;
  const ref = React.useRef();

  useFocusLock(ref, false, 'auto', !focusLock || disabled, true, handleFocusOut);

  const menuItemContextValue = {};
  const ariaDescribes = [];

  const advancedMode = isAdvanceMode(Children, [DropdownMenu.Item.Content.displayName], true);
  const hasHint = isAdvanceMode(Children, [DropdownMenu.Item.Hint.displayName], true);

  if (hasHint) {
    const hintId = `igc-${useUID()}-option-hint`;

    menuItemContextValue.hintId = hintId;
    ariaDescribes.push(hintId);
  }

  ariaDescribes.push(ariaDescribedby);

  return sstyled(styles)(
    <menuItemContext.Provider value={menuItemContextValue}>
      <SDropdownMenuItemContainer
        ref={ref}
        render={Box}
        use:highlighted={!disabled && document.activeElement === ref.current}
        use:role={'menuitem'}
        use:aria-describedby={ariaDescribes.join(' ')}
        focusWithin
      >
        <Children />
      </SDropdownMenuItemContainer>
    </menuItemContext.Provider>,
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

function Trigger() {
  return <Root render={Dropdown.Trigger} aria-haspopup='true' />;
}

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
      <SGroup render={Box} role={'group'} {...groupAriaProps} __excludeProps={['title']}>
        <Children />
      </SGroup>
    </>,
  );
}

function ItemContent({ styles }) {
  const SItemContent = Root;

  return sstyled(styles)(<SItemContent render={Flex} />);
}

function ItemHint({ styles }) {
  const SItemHint = Root;
  const { hintId } = React.useContext(menuItemContext);

  return sstyled(styles)(<SItemHint render={Flex} id={hintId} aria-hidden={'true'} />);
}

function Button({ styles }) {
  const SDeleteButton = Root;
  return sstyled(styles)(
    <SDeleteButton render={ButtonComponent} use={'tertiary'} theme={'muted'} size={'s'} />,
  );
}

const DropdownMenu = createComponent(
  DropdownMenuRoot,
  {
    Trigger,
    Popper: Dropdown.Popper,
    List,
    Menu,
    Item: [Item, { Addon, Content: ItemContent, Hint: ItemHint, Button }],
    Nesting: [Nesting, { Trigger: NestingTrigger, Addon, Item: NestingItem }],
    ItemTitle: Title,
    ItemHint: Hint,
    Group,
  },
  {
    parent: [Dropdown],
  },
);

DropdownMenu.selectedIndexContext = selectedIndexContext;

export default DropdownMenu;
