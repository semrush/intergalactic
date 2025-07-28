import { Component, lastInteraction } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { getAccessibleName } from '@semcore/core/lib/utils/getAccessibleName';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { isFocusInside, setFocus } from '@semcore/core/lib/utils/use/useFocusLock';
import React from 'react';

import type { DropdownProps } from './index';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

type AbstractDDProps = {
  visible: boolean;
  defaultHighlightedIndex: 0 | null;
  highlightedIndex: number | null;
  selectedIndex: number | null;
  placement: DropdownProps['placement'];
  inlineActions: boolean;
  disablePortal: boolean;
  ignorePortalsStacking: boolean;
  interaction: DropdownProps['interaction'];
  timeout?: number | [number, number];
  selectable?: boolean;
  multiselect?: boolean;
  itemsCount?: number;
};

export const enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)] as const;

export const selectedIndexContext = React.createContext(0);

export abstract class AbstractDropdown extends Component<AbstractDDProps, {}, {}, typeof enhance> {
  protected abstract role: 'menu' | 'listbox';

  popperRef = React.createRef<HTMLElement>();
  triggerRef = React.createRef<HTMLElement>();
  menuRef = React.createRef<HTMLElement>();

  itemProps: any[] = [];
  itemRefs: HTMLElement[] = [];

  highlightedItemRef = React.createRef<HTMLElement>();

  prevHighlightedIndex: number | null = null;

  uncontrolledProps() {
    return {
      selectedIndex: null,
      highlightedIndex: [
        null,
        (index: number | null) => {
          this.handlers.selectedIndex(index);
        },
      ],
      visible: null,
    };
  }

  get childRole() {
    if (this.role === 'listbox') {
      return 'option';
    }

    const { selectable, multiselect } = this.asProps;

    if (multiselect) {
      return 'menuitemcheckbox';
    }

    if (selectable) {
      return 'menuitemradio';
    }

    return 'menuitem';
  }

  protected afterOpenPopper() {
    const highlightedIndex = this.asProps.highlightedIndex ?? 0;
    const element = this.itemRefs[highlightedIndex];
    element?.focus();
    if (this.role === 'menu') {
      this.handlers.highlightedIndex(highlightedIndex);
    }
  };

  getTriggerProps() {
    const { size, uid, disablePortal, visible, getI18nText } = this.asProps;

    return {
      size,
      'id': `igc-${uid}-trigger`,
      'focusHint': visible && !disablePortal ? getI18nText('triggerHint') : undefined,
      'aria-haspopup': 'true',
      'aria-expanded': visible ? 'true' : 'false',
      'ref': this.triggerRef,
    };
  }

  getListProps() {
    return this.getBasicListProps();
  }

  getMenuProps() {
    return this.getBasicListProps();
  }

  getPopperProps() {
    const { uid, disablePortal, ignorePortalsStacking, interaction, highlightedIndex } =
      this.asProps;

    return {
      'ref': this.popperRef,
      'tabIndex': -1,
      'id': `igc-${uid}-popper`,
      disablePortal,
      ignorePortalsStacking,
      'focusMaster': interaction === 'click',
      'hideFocus': highlightedIndex !== null,
      'use:autoFocus': false,
    };
  }

  getGroupProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  getItemProps(_: any, index: number) {
    const { size, uid } = this.asProps;
    const role = this.childRole;

    return {
      'id': `igc-${uid}-option-${index}`,
      size,
      index,
      'onMouseEnter': () => {
        this.handlers.selectedIndex(index);
      },
      role,
      'isMenuItemCheckbox': role === 'menuitemcheckbox',
      'aria-checked': role === 'menuitemcheckbox' || role === 'menuitemradio' ? false : undefined,
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

  getItemTextProps(_: any, index: number) {
    return {
      index,
    };
  }

  scrollToNode(node: Element | null, withAnimation = false) {
    if (node) {
      // @ts-ignore
      this.highlightedItemRef.current = node;
    }
    setTimeout(() => {
      if (node?.scrollIntoView) {
        if (this.asProps.highlightedIndex !== this.prevHighlightedIndex) {
          this.prevHighlightedIndex = this.asProps.highlightedIndex;
          node.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
            behavior: withAnimation ? 'smooth' : 'instant',
          });
        }
      }
    }, 0);
  }

  getHighlightedIndex(amount: number): number {
    const { highlightedIndex, itemsCount } = this.asProps;
    const itemsLastIndex = (itemsCount ?? this.itemProps.length) - 1;
    const selectedIndex = this.itemProps.findIndex((item) => item?.selected);

    if (itemsLastIndex < 0) return -1;

    let innerHighlightedIndex: number;

    if (highlightedIndex == null) {
      if (selectedIndex !== -1) {
        innerHighlightedIndex = selectedIndex;
      } else if (this.highlightedItemRef.current && this.prevHighlightedIndex !== null) {
        innerHighlightedIndex =
          this.prevHighlightedIndex > itemsLastIndex ? itemsLastIndex : this.prevHighlightedIndex;
      } else {
        innerHighlightedIndex = amount < 0 ? 0 : itemsLastIndex;
      }
    } else {
      innerHighlightedIndex = highlightedIndex > itemsLastIndex ? itemsLastIndex : highlightedIndex;
    }

    let newIndex = innerHighlightedIndex + amount;
    if (newIndex < 0) {
      newIndex = amount + itemsLastIndex + 1;
    } else if (newIndex > itemsLastIndex) {
      newIndex = newIndex - itemsLastIndex - 1;
    }

    if (this.itemProps[newIndex]?.disabled) {
      return this.getHighlightedIndex(amount < 0 ? amount - 1 : amount + 1);
    } else if (!this.itemProps[newIndex]) {
      return -1;
    } else {
      return newIndex;
    }
  }

  componentDidUpdate(prevProps: AbstractDDProps) {
    const { visible } = this.asProps;
    const visibilityChanged = visible !== prevProps.visible;

    if (visibilityChanged && !visible) {
      this.handlers.highlightedIndex(this.props.defaultHighlightedIndex);
      this.prevHighlightedIndex = null;
      // @ts-ignore
      this.highlightedItemRef.current = null;
      this.itemProps = [];
      this.itemRefs = [];
      if (
        this.popperRef.current &&
        this.triggerRef.current &&
        (document.activeElement === document.body || isFocusInside(this.popperRef.current)) &&
        lastInteraction.isKeyboard()
      ) {
        setFocus(this.triggerRef.current);
      }
    }
  }

  protected itemRef(props: any, index: number, node: HTMLElement | null) {
    if (node?.getAttribute('role')?.startsWith(this.childRole)) {
      this.itemRefs[index] = node;
      this.itemProps[index] = props;
    }
  }

  protected handlePreventCommonKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.target instanceof Element) {
      const targetTagName = e.target.tagName;

      if (e.key === ' ' && ['INPUT', 'TEXTAREA'].includes(targetTagName)) return false;
      if (e.key === 'Enter' && targetTagName === 'TEXTAREA') return false;
    }
  }

  protected handlePreventPopperKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.target instanceof Element) {
      const targetTagName = e.target.tagName;

      if (
        (e.key === ' ' || e.key === 'Enter') &&
        (targetTagName === 'BUTTON' || targetTagName === 'A')
      )
        return false;
    }
  }

  protected handleOpenKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (
      ['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key) &&
      !e.currentTarget.getAttribute('role')?.startsWith(this.childRole)
    ) {
      if (this.asProps.visible !== true) {
        if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
          this.handlers.visible(true);
        }

        setTimeout(() => {
          if (this.asProps.visible) {
            this.afterOpenPopper();
          }
        }, 200);
      } else {
        if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
          this.afterOpenPopper();
        }
      }
    }
  }

  protected handleArrowKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    const amountCount = e.shiftKey ? 5 : 1;
    const { highlightedIndex, inlineActions, visible } = this.asProps;

    let amount: number | null = null;

    switch (e.key) {
      case 'ArrowDown': {
        if (!inlineActions) {
          amount = amountCount;
        }
        break;
      }
      case 'ArrowUp': {
        if (!inlineActions) {
          amount = -amountCount;
        }
        break;
      }
      case 'ArrowRight': {
        if (inlineActions) {
          amount = amountCount;
        }
        break;
      }
      case 'ArrowLeft': {
        if (inlineActions) {
          amount = -amountCount;
        }
        break;
      }
      case ' ':
      case 'Enter':
        if (
          this.highlightedItemRef.current &&
          highlightedIndex !== null &&
          !this.itemProps[highlightedIndex].disabled
        ) {
          e.stopPropagation();
          e.preventDefault();
          this.highlightedItemRef.current.click();
        }

        break;
    }

    if (visible && amount !== null) {
      const newHighlightedIndex = this.getHighlightedIndex(amount);

      if (
        this.role === 'listbox' &&
        this.triggerRef.current &&
        !isFocusInside(this.triggerRef.current)
      ) {
        this.focusTrigger();
      }

      if (newHighlightedIndex !== -1) {
        this.handlers.highlightedIndex(newHighlightedIndex, e);
        if (this.role === 'menu') {
          this.itemRefs[newHighlightedIndex]?.focus();
        }
      }
    }

    if (amount !== null) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private focusTrigger() {
    const trigger = this.triggerRef.current;
    if (!trigger) return;
    if (isFocusInside(trigger)) return;
    setFocus(trigger);
  }

  private getBasicListProps() {
    const { size, uid } = this.asProps;
    const triggerId = this.triggerRef.current?.id;
    const triggerElement = triggerId ? document.getElementById(triggerId) : null;

    return {
      size,
      'index': this.asProps.highlightedIndex,
      'tabIndex': -1,
      'ref': this.menuRef,
      'id': `igc-${uid}-list`,
      'role': this.role,
      'aria-label': getAccessibleName(triggerElement),
    };
  }
}
