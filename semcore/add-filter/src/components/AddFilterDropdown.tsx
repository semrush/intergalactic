import { FilterTrigger } from '@semcore/base-trigger';
import type { IntergalacticComponent } from '@semcore/core';
import { createComponent, AbstractComponent, Root } from '@semcore/core';
import type { DropdownPopperProps, DropdownTriggerProps } from '@semcore/dropdown';
import Dropdown from '@semcore/dropdown';
import React from 'react';

import type { AddFilterItemProps } from '../AddFilter.types';

type AsPropsTypeWithHandlers<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};

class AddFilterDropdownRoot extends AbstractComponent<AddFilterItemProps, [], { visible: null }> {
  static displayName = 'AddFilterDropdown';

  static defaultProps = () => {
    return {
      defaultVisible: true,
    };
  };

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  componentWillUnmount() {
    this.asProps.onUnmount?.();
  }

  getTriggerProps() {
    const { value, onClear, setFocusRef } = this.asProps as AsPropsTypeWithHandlers<
      typeof this.asProps
    >;

    return {
      tag: FilterTrigger,
      triggerRef: setFocusRef,
      empty: value == null,
      onClear,
      autoFocus: true,
    };
  }

  getPopperProps() {
    const { value, onClear } = this.asProps as AsPropsTypeWithHandlers<typeof this.asProps>;

    return {
      onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!value && e.key === 'Escape') {
          onClear();
        }
      },
      onApply: () => {
        this.handlers.visible(false);
      },
    };
  }

  render() {
    const SDropdownRoot = Root();
    return <SDropdownRoot render={Dropdown} />;
  }
}

function Trigger(props: DropdownTriggerProps) {
  const SDropdownTrigger = Root();
  return <SDropdownTrigger render={Dropdown.Trigger} />;
}

function Popper(props: DropdownPopperProps) {
  const SDropdownPopper = Root();
  return <SDropdownPopper render={Dropdown.Popper} />;
}

const AddFilterDropdown = createComponent(AddFilterDropdownRoot, {
  Trigger,
  Popper,
});

export default AddFilterDropdown;
