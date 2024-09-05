import React, { Children } from 'react';
import cn from 'classnames';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Flex, useBox, Box } from '@semcore/flex-box';
import ScrollAreaComponent, { hideScrollBarsFromScreenReadersContext } from '@semcore/scroll-area';
import uniqueIDEnhancement, { useUID } from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import style from './style/dropdown-menu.shadow.css';
import { setFocus } from '@semcore/utils/lib/focus-lock/setFocus';
import { isFocusInside } from '@semcore/utils/lib/focus-lock/isFocusInside';
import { useFocusSource } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import ButtonComponent from '@semcore/button';
import { forkRef } from '@semcore/utils/lib/ref';

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
    inlineActions: false,
    placement: 'bottom-start',
    timeout: 0,
  };

  popperRef = React.createRef();
  triggerRef = React.createRef();
  menuRef = React.createRef();

  itemProps = [];
  itemRefs = [];

  highlightedItemRef = React.createRef();

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

  handleClickTrigger = (e) => {
    e.preventDefault();
    this.handlers.visible(true);

    setTimeout(() => {
      const element = this.itemRefs[this.asProps.highlightedIndex];

      element?.focus();
    }, 0);
  };

  bindHandlerKeyDown = (place) => (e) => {
    const amount = e.shiftKey ? 5 : 1;
    const targetTagName = e.target.tagName;

    const { visible, highlightedIndex, placement, inlineActions } = this.asProps;

    if (e.key === ' ' && ['INPUT', 'TEXTAREA'].includes(targetTagName)) return;
    if (e.key === 'Enter' && targetTagName === 'TEXTAREA') return;
    if (
      place === 'popper' &&
      (e.key === ' ' || e.key === 'Enter') &&
      (targetTagName === 'BUTTON' || targetTagName === 'A')
    )
      return;

    if (
      place === 'trigger' &&
      ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key) &&
      e.target.getAttribute('role') !== 'menuitem'
    ) {
      this.handleClickTrigger(e);
    }

    const show =
      (e.key === 'ArrowRight' && placement.startsWith('right')) ||
      (e.key === 'ArrowLeft' && placement.startsWith('left'));
    const hide =
      (e.key === 'ArrowLeft' && placement.startsWith('right')) ||
      (e.key === 'ArrowRight' && placement.startsWith('left')) ||
      e.key === 'Escape';
    const isMenuItem = e.target.getAttribute('role') === 'menuitem';

    if (place === 'trigger' && (!visible || inlineActions) && show && isMenuItem) {
      this.handlers.visible(true);
      this.handlers.highlightedIndex(0);
      setTimeout(() => {
        this.itemRefs[this.asProps.highlightedIndex]?.focus();
      }, 0);

      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (place === 'list' && visible && hide && isMenuItem) {
      if (
        !inlineActions ||
        (inlineActions && (e.key === 'Escape' || this.asProps.highlightedIndex === 0))
      ) {
        this.handlers.visible(false);
        this.triggerRef.current?.focus();

        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }

    if (place === 'list') {
      switch (e.key) {
        case 'ArrowDown': {
          if (visible && !inlineActions) {
            const newHighlightedIndex = this.getHighlightedIndex(amount);
            this.itemRefs[newHighlightedIndex]?.focus();
            this.handlers.highlightedIndex(newHighlightedIndex, e);

            e.preventDefault();
            e.stopPropagation();
          }
          break;
        }
        case 'ArrowRight': {
          if (visible && inlineActions) {
            const newHighlightedIndex = this.getHighlightedIndex(amount);
            this.itemRefs[newHighlightedIndex]?.focus();
            this.handlers.highlightedIndex(newHighlightedIndex, e);

            e.preventDefault();
            e.stopPropagation();
          }
          break;
        }
        case 'ArrowUp': {
          if (visible && !inlineActions) {
            const newHighlightedIndex = this.getHighlightedIndex(-amount);
            this.itemRefs[newHighlightedIndex]?.focus();
            this.handlers.highlightedIndex(newHighlightedIndex, e);

            e.preventDefault();
            e.stopPropagation();
          }
          break;
        }
        case 'ArrowLeft': {
          if (visible && inlineActions) {
            const newHighlightedIndex = this.getHighlightedIndex(-amount);
            this.itemRefs[newHighlightedIndex]?.focus();
            this.handlers.highlightedIndex(newHighlightedIndex, e);

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
          }

          break;
      }
    }
  };

  getTriggerProps() {
    const { size, uid, disablePortal, visible, getI18nText } = this.asProps;

    return {
      size,
      id: `igc-${uid}-trigger`,
      'aria-controls': visible ? `igc-${uid}-list` : undefined,
      focusHint: visible && !disablePortal ? getI18nText('triggerHint') : undefined,
      'aria-expanded': visible ? 'true' : 'false',
      onKeyDown: this.bindHandlerKeyDown('trigger'),
      onClick: this.handleClickTrigger,
      ref: this.triggerRef,
    };
  }

  getListProps() {
    const { size, uid } = this.asProps;
    const triggerId = this.triggerRef.current?.id;

    return {
      size,
      index: this.asProps.highlightedIndex,
      tabIndex: -1,
      onKeyDown: this.bindHandlerKeyDown('list'),
      ref: this.menuRef,
      id: `igc-${uid}-list`,
      role: 'menu',
      'aria-labelledby': triggerId,
    };
  }

  getActionsProps() {
    return this.getListProps();
  }

  getPopperProps() {
    const { uid, disablePortal, ignorePortalsStacking, interaction, highlightedIndex } =
      this.asProps;

    return {
      ref: this.popperRef,
      tabIndex: -1,
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
    const { size, uid } = this.asProps;

    const ref = (node) => {
      if (node?.getAttribute('role') === 'menuitem') {
        this.itemRefs[index] = node;
      }

      if (node === document.activeElement) {
        this.scrollToNode(node);
      }
    };
    this.itemProps[index] = props;

    const itemProps = {
      id: `igc-${uid}-option-${index}`,
      size,
      ref,
      index,
      onMouseEnter: () => this.handlers.selectedIndex(index),
    };

    if (props.tag === ButtonComponent) {
      itemProps.use = props.use ?? 'tertiary';
      itemProps.theme = props.theme ?? 'muted';
      itemProps.size = props.size ?? 's';
    }

    return itemProps;
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

  getHighlightedIndex = (amount) => {
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
      this.getHighlightedIndex(amount < 0 ? amount - 1 : amount + 1);
    } else if (!this.itemProps[newIndex]) {
      return 0;
    } else {
      return newIndex;
    }
  };

  componentDidUpdate(prevProps) {
    const visibilityChanged = this.asProps.visible !== prevProps.visible;
    if (visibilityChanged && prevProps.visible !== undefined) {
      if (!this.asProps.visible) {
        this.handlers.highlightedIndex(null);
        this.highlightedItemRef.current = null;
        if (document.activeElement === document.body || isFocusInside(this.popperRef.current)) {
          setFocus(this.triggerRef.current);
        }
      }
    }
  }

  render() {
    const { Children, selectedIndex, interaction, timeout } = this.asProps;

    this.itemProps = [];

    return (
      <selectedIndexContext.Provider value={selectedIndex}>
        <Root
          render={Dropdown}
          timeout={timeout || (interaction === 'hover' ? [0, 100] : undefined)}
        >
          <Children />
        </Root>
      </selectedIndexContext.Provider>
    );
  }
}

function List({ styles, Children }) {
  const SDropdownMenuList = Root;

  return sstyled(styles)(
    <ListBoxContextProvider>
      <SDropdownMenuList render={ScrollAreaComponent} shadow={true}>
        <ScrollAreaComponent.Container tabIndex={undefined}>
          <Children />
        </ScrollAreaComponent.Container>
        <ScrollAreaComponent.Bar orientation='horizontal' />
        <ScrollAreaComponent.Bar orientation='vertical' />
      </SDropdownMenuList>
    </ListBoxContextProvider>,
  );
}
function Actions({ styles }) {
  const SDropdownMenuActions = Root;

  return sstyled(styles)(
    <SDropdownMenuActions render={Flex}/>,
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

function Item({ id, styles, disabled, Children, forwardRef }) {
  const SDropdownMenuItemContainer = Root;
  const itemRef = React.useRef();

  const [highlighted, setHighlighted] = React.useState(false);

  const menuItemContextValue = {
    contentId: id,
    ref: forkRef(forwardRef, itemRef),
  };
  const ariaDescribes = [];

  const hasSubMenu = isAdvanceMode(Children, [DropdownMenu.displayName], true);
  const hasHint = isAdvanceMode(Children, [DropdownMenu.Item.Hint.displayName], true);
  const advancedMode =
    isAdvanceMode(Children, [DropdownMenu.Item.Content.displayName], true) || hasSubMenu || hasHint;

  if (hasHint) {
    const hintId = `igc-${useUID()}-option-hint`;

    menuItemContextValue.hintId = hintId;
    ariaDescribes.push(hintId);
  }

  if (hasSubMenu) {
    menuItemContextValue.hasSubMenu = true;
  }

  menuItemContextValue.ariaDescribes = ariaDescribes;

  React.useEffect(() => {
    const onFocus = (e) => {
      if (e.target === itemRef.current) {
        setHighlighted(true);

        if (hasSubMenu) {
          e.stopPropagation();
        }
      }
    };
    const onBlur = (e) => {
      if (e.target === itemRef.current) {
        setHighlighted(false);
      }
    };

    document.addEventListener('focus', onFocus, { capture: true });
    document.addEventListener('blur', onBlur, { capture: true });

    return () => {
      document.removeEventListener('focus', onFocus, { capture: true });
      document.removeEventListener('blur', onBlur, { capture: true });
    };
  }, [itemRef.current]);

  const focusSourceRef = useFocusSource();

  return sstyled(styles)(
    <menuItemContext.Provider value={menuItemContextValue}>
      <SDropdownMenuItemContainer
        render={Box}
        ref={advancedMode ? undefined : menuItemContextValue.ref}
        use:highlighted={!disabled && highlighted && focusSourceRef.current === 'keyboard'}
        role={advancedMode ? undefined : 'menuitem'}
        use:id={advancedMode ? undefined : id}
        tabIndex={advancedMode ? undefined : -1}
      >
        <Children />
      </SDropdownMenuItemContainer>
    </menuItemContext.Provider>,
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
  const ref = React.useRef();
  const menuItemCtxValue = React.useContext(menuItemContext);

  let subMenu = undefined;

  if (menuItemCtxValue.hasSubMenu) {
    subMenu = 'true';
  }

  const [describedby, setDescribedby] = React.useState(new Set(menuItemCtxValue.ariaDescribes));

  React.useEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;

    if (
      parent.getAttribute('aria-haspopup') === 'true' &&
      parent.getAttribute('aria-describedby')
    ) {
      setDescribedby((prev) => {
        prev.add(parent.getAttribute('aria-describedby'));

        return new Set(prev);
      });
    }
  }, [menuItemCtxValue.ariaDescribes]);

  return sstyled(styles)(
    <SItemContent
      render={Flex}
      role={'menuitem'}
      id={menuItemCtxValue.contentId}
      tabIndex={-1}
      ref={forkRef(menuItemCtxValue.ref, ref)}
      use:aria-describedby={[...describedby].join(' ')}
      aria-haspopup={menuItemCtxValue.hasSubMenu ? 'true' : undefined}
      aria-expanded={subMenu}
      alignItems={menuItemCtxValue.hasSubMenu ? 'center' : undefined}
      justifyContent={menuItemCtxValue.hasSubMenu ? 'space-between' : undefined}
    />,
  );
}

function ItemHint({ styles }) {
  const SItemHint = Root;
  const { hintId } = React.useContext(menuItemContext);

  return sstyled(styles)(<SItemHint render={Flex} id={hintId} aria-hidden={'true'} />);
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

/**
 * @deprecated
 */
function Nesting({ forwardRef }) {
  return <Root render={DropdownMenu.Item} ref={forwardRef} />;
}

/**
 * @deprecated
 */
function NestingTrigger({ forwardRef }) {
  return (
    <Root
      render={DropdownMenu.Item.Content}
      tag={DropdownMenu.Trigger}
      ref={forwardRef}
      use:role={'menuitem'}
    />
  );
}

const DropdownMenu = createComponent(
  DropdownMenuRoot,
  {
    Trigger,
    Popper: Dropdown.Popper,
    List,
    Actions,
    Menu,
    Item: [Item, { Addon, Content: ItemContent, Hint: ItemHint }],
    /**
     * @deprecated. Use just Item. See examples on
     */
    Nesting: [Nesting, { Trigger: NestingTrigger, Addon }],
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
