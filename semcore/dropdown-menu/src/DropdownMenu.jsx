import React from 'react';
import cn from 'classnames';
import { createComponent, sstyled, Root, lastInteraction } from '@semcore/core';
import Dropdown, { AbstractDropdown, selectedIndexContext, enhance } from '@semcore/dropdown';
import { Flex, useBox } from '@semcore/flex-box';
import ScrollAreaComponent, { hideScrollBarsFromScreenReadersContext } from '@semcore/scroll-area';
import { useUID } from '@semcore/core/lib/utils/uniqueID';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import style from './style/dropdown-menu.shadow.css';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import { forkRef } from '@semcore/core/lib/utils/ref';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import ButtonComponent from '@semcore/button';
import { Text } from '@semcore/typography';

const ListBoxContextProvider = ({ children }) => (
  <hideScrollBarsFromScreenReadersContext.Provider value={true}>
    {children}
  </hideScrollBarsFromScreenReadersContext.Provider>
);

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

  uncontrolledProps() {
    return {
      ...super.uncontrolledProps(),
      visible: [
        null,
        (visible) => {
          if (visible === true) {
            setTimeout(() => {
              const options = this.menuRef.current?.querySelectorAll(
                '[role="menuitemcheckbox"], [role="menuitemradio"]',
              );
              const selected = this.menuRef.current?.querySelector('[aria-checked="true"]');

              if (selected && options && this.asProps.itemsCount === undefined) {
                this.scrollToNode(selected, true);

                for (let i = 0; i < options.length; i++) {
                  if (options[i] === selected) {
                    this.handlers.highlightedIndex(i);
                    break;
                  }
                }
              }
              // for some reason, Google Chrome optimizes this timeout with 0 value with previous render (when we set aria-selected)
              // and that's why its skip scrollToNodes. We selected the appropriate timeout manually.
            }, 30);
          }
        },
      ],
    };
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
      onKeyDown: callAllEventHandlers(
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

  getItemProps(props, index) {
    const { highlightedIndex, visible } = this.asProps;
    const realIndex = props.index ?? index;
    const isHighlighted = realIndex === highlightedIndex;
    const itemProps = {
      ...super.getItemProps(props, realIndex),
      tabIndex: isHighlighted && visible ? 0 : -1,
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
        (e.key === 'ArrowLeft' && placement?.startsWith('left'));
      const hide =
        (e.key === 'ArrowLeft' && placement?.startsWith('right')) ||
        (e.key === 'ArrowRight' && placement?.startsWith('left')) ||
        e.key === 'Escape';
      const isMenuItem = e.target.getAttribute('role')?.startsWith(super.childRole);

      if (place === 'trigger' && (!visible || inlineActions) && show && isMenuItem) {
        this.handlers.visible(true);
        this.handlers.highlightedIndex(0);
        setTimeout(() => {
          const { highlightedIndex } = this.asProps;
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
          this.triggerRef.current?.focus();

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
    ref: forkRef(forwardRef, itemRef),
    role,
    tabIndex,
    ariaChecked,
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
  }, [itemRef.current]);

  return sstyled(styles)(
    <menuItemContext.Provider value={menuItemContextValue}>
      <SDropdownMenuItemContainer
        render={Dropdown.Item}
        ref={advancedMode ? undefined : menuItemContextValue.ref}
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
      ref={forkRef(menuItemCtxValue.ref, ref)}
      use:aria-describedby={[...describedby].join(' ')}
      aria-haspopup={menuItemCtxValue.hasSubMenu ? 'true' : undefined}
      aria-expanded={subMenu}
      aria-checked={menuItemCtxValue.ariaChecked}
      alignItems='center'
      justifyContent={menuItemCtxValue.hasSubMenu ? 'space-between' : undefined}
    />,
  );
}

function ItemContentText({ styles }) {
  const SItemContentText = Root;
  return sstyled(styles)(<SItemContentText render={Text} />);
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
  return sstyled(props.styles)(
    <SDropdownMenuItemContainer render={Dropdown.Item} variant='hint' />,
  );
}
/**
 * @deprecated Use Group with title prop
 */
function Title(props) {
  const SDropdownMenuItemContainer = Root;
  return sstyled(props.styles)(
    <SDropdownMenuItemContainer render={Dropdown.Item} variant='title' />,
  );
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
    Item: [Item, { Addon, Content: ItemContent, Text: ItemContentText, Hint: ItemHint }],
    /**
     * @deprecated. Use just Item. See examples on
     */
    Nesting: [Nesting, { Trigger: NestingTrigger, Addon }],
    ItemTitle: Title,
    ItemHint: Hint,
    Group: Dropdown.Group,
  },
  {
    parent: [Dropdown],
  },
);

DropdownMenu.selectedIndexContext = selectedIndexContext;

export default DropdownMenu;
