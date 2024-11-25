import React from 'react';
import { Component } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { isFocusInside, setFocus } from '@semcore/utils/lib/use/useFocusLock';
import focusSourceEnhance from '@semcore/utils/lib/enhances/focusSourceEnhance';
import { DropdownProps } from './index';
import { getAccessibleName } from '@semcore/utils/lib/getAccessibleName';

type AbstractDDProps = {
  visible: boolean;
  highlightedIndex: number | null;
  selectedIndex: number | null;
  placement: DropdownProps['placement'];
  inlineActions: boolean;
  disablePortal: boolean;
  ignorePortalsStacking: boolean;
  interaction: DropdownProps['interaction'];
  timeout?: number | [number, number];
};

export const enhance = [
  uniqueIDEnhancement(),
  i18nEnhance(localizedMessages),
  focusSourceEnhance(),
] as const;

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

    return 'menuitem';
  }

  handleClickTrigger = (e: React.SyntheticEvent) => {
    const { interaction } = this.asProps;

    if (interaction === 'none') return false;

    e.preventDefault();
    e.stopPropagation();
    this.handlers.visible(true);

    if (this.role === 'menu') {
      setTimeout(() => {
        const { highlightedIndex } = this.asProps;
        const element = this.itemRefs[highlightedIndex ?? 0];
        element?.focus();
      }, 0);
    }
  };

  getTriggerProps() {
    const { size, uid, disablePortal, visible, getI18nText } = this.asProps;

    return {
      size,
      id: `igc-${uid}-trigger`,
      focusHint: visible && !disablePortal ? getI18nText('triggerHint') : undefined,
      'aria-haspopup': 'true',
      'aria-expanded': visible ? 'true' : 'false',
      onClick: this.handleClickTrigger,
      ref: this.triggerRef,
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
      ref: this.popperRef,
      tabIndex: -1,
      id: `igc-${uid}-popper`,
      disablePortal,
      ignorePortalsStacking,
      focusMaster: interaction === 'click',
      hideFocus: highlightedIndex !== null,
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

    return {
      id: `igc-${uid}-option-${index}`,
      size,
      index,
      onMouseEnter: () => {
        this.handlers.selectedIndex(index);
      },
      role: this.childRole,
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

  scrollToNode(node: Element | null) {
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
          });
        }
      }
    }, 0);
  }

  getHighlightedIndex(amount: number): number {
    const { highlightedIndex } = this.asProps;
    const itemsLastIndex = this.itemProps.length - 1;
    const selectedIndex = this.itemProps.findIndex((item) => item.selected);

    if (itemsLastIndex < 0) return 0;

    let innerHighlightedIndex: number;

    if (highlightedIndex == null) {
      if (selectedIndex !== -1) {
        innerHighlightedIndex = selectedIndex;
      } else if (this.highlightedItemRef.current && this.prevHighlightedIndex !== null) {
        innerHighlightedIndex = this.prevHighlightedIndex;
      } else {
        innerHighlightedIndex = amount < 0 ? 0 : itemsLastIndex;
      }
    } else {
      innerHighlightedIndex = highlightedIndex;
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
      return 0;
    } else {
      return newIndex;
    }
  }

  componentDidUpdate(prevProps: AbstractDDProps) {
    const { visible, focusSourceRef } = this.asProps;
    const visibilityChanged = visible !== prevProps.visible;

    if (visibilityChanged && prevProps.visible !== undefined) {
      if (!visible) {
        this.handlers.highlightedIndex(null);
        // @ts-ignore
        this.highlightedItemRef.current = null;
        if (
          this.popperRef.current &&
          this.triggerRef.current &&
          (document.activeElement === document.body || isFocusInside(this.popperRef.current)) &&
          focusSourceRef.current === 'keyboard'
        ) {
          setFocus(this.triggerRef.current);
        }
      }
    }
  }

  protected itemRef(props: any, index: number, node: HTMLElement | null) {
    if (node?.getAttribute('role') === this.childRole) {
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
      this.asProps.visible !== true &&
      ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key) &&
      e.currentTarget.getAttribute('role') !== this.childRole
    ) {
      this.handleClickTrigger(e);
    }
  }

  protected handleArrowKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    const amountCount = e.shiftKey ? 5 : 1;
    const { highlightedIndex, inlineActions } = this.asProps;

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
        if (this.highlightedItemRef.current && highlightedIndex !== null) {
          e.stopPropagation();
          e.preventDefault();
          this.highlightedItemRef.current.click();
        }

        break;
    }

    if (amount !== null) {
      const newHighlightedIndex = this.getHighlightedIndex(amount);
      if (newHighlightedIndex !== undefined && this.role === 'menu') {
        this.itemRefs[newHighlightedIndex]?.focus();
      }
      if (
        this.role === 'listbox' &&
        this.triggerRef.current &&
        !isFocusInside(this.triggerRef.current)
      ) {
        this.focusTrigger();
      }
      this.handlers.highlightedIndex(newHighlightedIndex, e);

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
      index: this.asProps.highlightedIndex,
      tabIndex: -1,
      ref: this.menuRef,
      id: `igc-${uid}-list`,
      role: this.role,
      'aria-label': getAccessibleName(triggerElement),
    };
  }
}
