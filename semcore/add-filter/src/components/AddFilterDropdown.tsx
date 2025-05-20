import React from 'react';
import { createComponent, Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { AddFilterItemProps } from '../AddFilter.types';
import { FilterTrigger } from '@semcore/base-trigger';

type AsPropsTypeWithHandlers<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};

class AddFilterDropdownRoot extends Component<AddFilterItemProps> {
  static displayName = 'AddFilterDropdown';

  static defaultProps = () => {
    return {
      defaultVisible: true,
    };
  };

  uncontrolledProps() {
    return {
      visible: [null],
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
