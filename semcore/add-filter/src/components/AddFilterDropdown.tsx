import { FilterTrigger } from '@semcore/base-trigger';
import { createComponent, Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import React from 'react';

import type { AddFilterItemProps } from '../AddFilter.types';

type AsPropsTypeWithHandlers<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};

class AddFilterDropdownRoot extends Component<AddFilterItemProps, [], { visible: null }> {
  static displayName = 'AddFilterDropdown';

  static defaultProps = () => {
    return {
      defaultVisible: false,
    };
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.handlers.visible(true);
    }, 0);
  }

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
    return <Root render={Dropdown} />;
  }
}

const AddFilterDropdown = createComponent(AddFilterDropdownRoot, {
  Trigger: Dropdown.Trigger,
  Popper: Dropdown.Popper,
});

export default AddFilterDropdown;
