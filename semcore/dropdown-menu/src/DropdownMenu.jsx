import { Flex, ScrollArea as ScrollAreaComponent, Box } from '@semcore/base-components';
import ButtonComponent from '@semcore/button';
import { createComponent, sstyled, Root, lastInteraction } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';
import { setFocus } from '@semcore/core/lib/utils/focus-lock/setFocus';
import { forkRef } from '@semcore/core/lib/utils/ref';
import { useUID } from '@semcore/core/lib/utils/uniqueID';
import Dropdown, { AbstractDropdown, selectedIndexContext, enhance } from '@semcore/dropdown';
import { Text } from '@semcore/typography';
import React from 'react';

import { ListBoxContextProvider } from './components/Context';
import { VirtualList } from './components/VirtualList';
import style from './style/dropdown-menu.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

const menuItemContext = React.createContext({});

class DropdownMenuRoot extends AbstractDropdown {
  static displayName = 'DropdownMenu';
  static style = style;
  static enhance = Object.values(enhance);

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

  static nestedMenuInteraction = {
    trigger: [
      ['onClick', 'onMouseEnter'],
      ['onClick', 'onMouseLeave'],
    ],
    popper: [['onMouseEnter'], ['onMouseLeave']],
  };

  actionsRef = React.createRef();
  role = 'menu';

  /**
   * TODO: It needs to be reconsidered in a future implementation so that component accepts items as a prop instead of JSX.
   * Tab index recalculation flag.
   *
   * When an item becomes disabled while highlighted, we need to transfer focus
   * to the next available focusable item. This flag ensures the focus lock
   * remains within proper boundaries during the initial render cycle.
  */
  shouldRecalculateItemTabIndex = false;

  uncontrolledProps() {
    return {
      ...super.uncontrolledProps(),
      visible: [
        null,
        (visible) => {
          if (visible === true) {
            setTimeout(() => {
              this.focusAndScrollToSelected();
              // for some reason, Google Chrome optimizes this timeout with 0 value with previous render (when we set aria-selected)
              // and that's why its skip scrollToNodes. We selected the appropriate timeout manually.
            }, 50);
          }
        },
      ],
    };
  }

  get menuElements() {
    const menuElement = this.menuRef.current;

    if (!menuElement) {
      return { selected: null, options: null };
    }

    const options = menuElement.querySelectorAll(
      '[role="menuitemcheckbox"], [role="menuitemradio"]',
    );
    const selected = menuElement.querySelector('[aria-checked="true"]:not([disabled])');

    return { selected, options };
  }

  focusAndScrollToSelected() {
    let { selected, options } = this.menuElements;

    const isFocusAlreadyInPopper = isFocusInside(this.popperRef.current);

    if (!selected || !options || this.menuRef.current?.dataset.isVirtual || isFocusAlreadyInPopper) return;

    this.scrollToNodeAsync(selected, true).then(() => {
      if (this.asProps.visible) {
        selected.focus({ preventScroll: true });
      }
    });

    const selectedIndex = Array.from(options).indexOf(selected);

    if (selectedIndex !== -1) {
      this.handlers.highlightedIndex(selectedIndex);
    }
  }

  afterOpenPopper() {
    const { selected, options } = this.menuElements;

    if (selected && options && !this.menuRef.current?.dataset.isVirtual) return;

    super.afterOpenPopper();
  }

  itemRef(props, index, node) {
    super.itemRef(props, index, node);

    if (node === document.activeElement) {
      super.scrollToNode(node);
    }
  }

  getTriggerProps() {
    const { Children, uid, visible } = this.asProps;
    const hasMenu = isAdvanceMode(Children, [DropdownMenu.Menu.displayName]);
    const ariaControls = hasMenu ? `igc-${uid}-list` : `igc-${uid}-popper`;

    return {
      ...super.getTriggerProps(),
      'onKeyDown': callAllEventHandlers(
        this.handlePreventCommonKeyDown.bind(this),
        this.handleOpenKeyDown.bind(this),
        this.handleKeyDownForMenu('trigger'),
      ),
      'aria-controls': visible ? ariaControls : undefined,
      'aria-haspopup': hasMenu ? 'true' : 'dialog',
    };
  }

  getListProps() {
    return {
      ...super.getListProps(),
      onKeyDown: callAllEventHandlers(
        this.handlePreventCommonKeyDown.bind(this),
        this.handleKeyDownForMenu('list'),
        this.handleArrowKeyDown.bind(this),
      ),
    };
  }

  getVirtualListProps() {
    return {
      ...super.getListProps(),
      onKeyDown: callAllEventHandlers(
        this.handlePreventCommonKeyDown.bind(this),
        this.handleKeyDownForMenu('list'),
        this.handleArrowKeyDown.bind(this),
      ),
    };
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      onKeyDown: callAllEventHandlers(
        this.handlePreventCommonKeyDown.bind(this),
        this.handlePreventPopperKeyDown.bind(this),
      ),
    };
  }

  getActionsProps() {
    return {
      ...this.getListProps(),
      ref: this.actionsRef,
      onKeyDown: callAllEventHandlers(
        this.handlePreventTabOnActions.bind(this),
        this.handlePreventCommonKeyDown.bind(this),
        this.handleKeyDownForMenu('list'),
        this.handleArrowKeyDown.bind(this),
      ),
    };
  }

  getItemTabIndex(props, itemIndex) {
    const { disabled, index } = props;
    const { highlightedIndex, visible } = this.asProps;

    if (!visible) return -1;

    const isHighlighted = (index ?? itemIndex) === highlightedIndex;
    if (isHighlighted && !disabled) {
      return 0;
    }

    if (disabled && isHighlighted) {
      this.shouldRecalculateItemTabIndex = true;
    }

    if (!isHighlighted && !disabled && this.shouldRecalculateItemTabIndex) {
      this.shouldRecalculateItemTabIndex = false;
      return 0;
    }

    return -1;
  }

  getItemProps(props, index) {
    const realIndex = props.index ?? index;
    const itemProps = {
      ...super.getItemProps(props, realIndex),
      tabIndex: this.getItemTabIndex(props, index),
      ref: (node) => this.itemRef(props, realIndex, node),
      actionsRef: this.actionsRef,
    };

    if (props.tag === ButtonComponent) {
      itemProps.use = props.use ?? 'tertiary';
      itemProps.theme = props.theme ?? 'muted';
      itemProps.size = props.size ?? 's';
      itemProps.innerOutline = false;
    }

    if (props.selected) {
      itemProps['aria-checked'] = true;
    }

    if (super.childRole === 'menuitemradio') {
      itemProps.onClick = () => {
        this.handlers.visible(false);
      };
    }

    return itemProps;
  }

  handleKeyDownForMenu(place) {
    return (e) => {
      const { visible, placement, inlineActions } = this.asProps;

      // stop propagation keyboard events if it calls not on DropdownMenu.Items
      if (place === 'list' && !this.menuRef.current?.contains(e.target) && !inlineActions) {
        e.stopPropagation();
        return false;
      }

      const show =
        (e.key === 'ArrowRight' && placement?.startsWith('right')) ||
        (e.key === 'ArrowLeft' && placement?.startsWith('left')) ||
        ((e.key === 'Enter' || e.key === ' ') && !inlineActions);
      const hide =
        (e.key === 'ArrowLeft' && placement?.startsWith('right')) ||
        (e.key === 'ArrowRight' && placement?.startsWith('left')) ||
        e.key === 'Escape';
      const isMenuItem = e.target.getAttribute('role')?.startsWith(super.childRole);

      if (place === 'trigger' && show && isMenuItem) {
        this.handlers.visible(true);
        this.handlers.highlightedIndex(0);
        setTimeout(() => {
          let { highlightedIndex } = this.asProps;
          const highlightedIndexProps = this.itemProps[highlightedIndex];

          if (highlightedIndexProps?.disabled) {
            highlightedIndex = this.itemProps.findIndex((p) => !p.disabled);
          }

          if (highlightedIndex === -1) return;

          this.itemRefs[highlightedIndex]?.focus();
        }, 0);

        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (place === 'list' && visible && hide && isMenuItem) {
        if (
          !inlineActions ||
          (inlineActions && (e.key === 'Escape' || this.asProps.highlightedIndex === 0))
        ) {
          this.handlers.visible(false);
          if (this.triggerRef.current) {
            setFocus(this.triggerRef.current);
          }

          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };
  }

  handlePreventTabOnActions(e) {
    if (e.key === 'Tab') {
      e.stopPropagation();
      e.preventDefault();
      return false;
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
  const SBar = ScrollAreaComponent.Bar;
  const SScrollContainer = ScrollAreaComponent.Container;

  return sstyled(styles)(
    <ListBoxContextProvider>
      <SDropdownMenuList render={ScrollAreaComponent} shadow={true} shadowSize={16} shadowTheme='light'>
        <SScrollContainer tabIndex={undefined}>
          <Children />
        </SScrollContainer>
        <SBar orientation='horizontal' />
        <SBar orientation='vertical' />
      </SDropdownMenuList>
    </ListBoxContextProvider>,
  );
}
function Actions({ styles }) {
  const SDropdownMenuActions = Root;

  return sstyled(styles)(<SDropdownMenuActions render={Flex} />);
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
      <DropdownMenu.Popper {...popperProps} role={null}>
        <Root render={DropdownMenu.List} />
      </DropdownMenu.Popper>
    </ListBoxContextProvider>
  );
}

function Item({
  id,
  styles,
  disabled,
  Children,
  forwardRef,
  role,
  tabIndex,
  actionsRef,
  'aria-checked': ariaChecked,
}) {
  const SDropdownMenuItemContainer = Root;
  const itemRef = React.useRef();

  const [highlighted, setHighlighted] = React.useState(false);

  const menuItemContextValue = {
    contentId: id,
    ref: itemRef,
    forwardRef,
    role,
    tabIndex,
    ariaChecked,
    disabled,
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

        if (actionsRef.current) {
          itemRef.current.tabIndex = -1;
        }
      }
    };

    document.addEventListener('focus', onFocus, { capture: true });
    document.addEventListener('blur', onBlur, { capture: true });

    return () => {
      document.removeEventListener('focus', onFocus, { capture: true });
      document.removeEventListener('blur', onBlur, { capture: true });
    };
  });

  return sstyled(styles)(
    <menuItemContext.Provider value={menuItemContextValue}>
      <SDropdownMenuItemContainer
        render={Dropdown.Item}
        ref={advancedMode ? undefined : forkRef(itemRef, forwardRef)}
        use:highlighted={!disabled && highlighted && lastInteraction.isKeyboard()}
        use:role={advancedMode ? undefined : role}
        use:id={advancedMode ? undefined : id}
        use:tabIndex={advancedMode ? undefined : tabIndex}
        use:aria-checked={advancedMode ? undefined : ariaChecked}
      >
        <Children />
      </SDropdownMenuItemContainer>
    </menuItemContext.Provider>,
  );
}

function Addon(props) {
  const SDropdownMenuItemAddon = Root;
  return sstyled(props.styles)(<SDropdownMenuItemAddon render={Box} />);
}

function Trigger() {
  return <Root render={Dropdown.Trigger} />;
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
      role={menuItemCtxValue.role}
      id={menuItemCtxValue.contentId}
      tabIndex={menuItemCtxValue.tabIndex}
      ref={forkRef(menuItemCtxValue.ref, menuItemCtxValue.forwardRef, ref)}
      use:aria-describedby={[...describedby].join(' ')}
      aria-haspopup={menuItemCtxValue.hasSubMenu ? 'true' : undefined}
      aria-expanded={subMenu}
      aria-checked={menuItemCtxValue.ariaChecked}
      alignItems='center'
      justifyContent={menuItemCtxValue.hasSubMenu ? 'space-between' : undefined}
      disabled={menuItemCtxValue.disabled}
    />,
  );
}

function ItemContentText({ styles, ellipsis = false }) {
  const SItemContentText = Root;
  const menuItemCtxValue = React.useContext(menuItemContext);

  return sstyled(styles)(
    <>
      <SItemContentText
        render={Text}
        ellipsis={ellipsis}
        hint:triggerRef={menuItemCtxValue.ref}
      />
    </>,
  );
}

function ItemHint({ styles }) {
  const SItemHint = Root;
  const { hintId } = React.useContext(menuItemContext);

  return sstyled(styles)(<SItemHint render={Flex} id={hintId} aria-hidden='true' />);
}

const DropdownMenu = createComponent(
  DropdownMenuRoot,
  {
    Trigger,
    Popper: Dropdown.Popper,
    List,
    VirtualList,
    Actions,
    Menu,
    Item: [Item, { Addon, Content: ItemContent, Text: ItemContentText, Hint: ItemHint }],
    Group: Dropdown.Group,
  },
  {
    parent: [Dropdown],
  },
);

DropdownMenu.selectedIndexContext = selectedIndexContext;

export default DropdownMenu;
