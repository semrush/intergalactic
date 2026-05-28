import { FilterTrigger } from '@semcore/base-trigger';
import { createComponent, Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import React from 'react';

import type { AddFilterDropdownType, AddFilterItemProps } from '../AddFilter.types';

type AsPropsTypeWithHandlers<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};

type DefaultProps = {
  defaultVisible: true;
};
class AddFilterDropdownRoot extends Component<
  AddFilterItemProps,
  [],
  { visible: null },
  {},
  {},
  DefaultProps
> {
  static displayName = 'AddFilterDropdown';

  static defaultProps = {
    defaultVisible: true,
  } as const;

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

const AddFilterDropdown = createComponent<
  typeof AddFilterDropdownType,
  typeof AddFilterDropdownRoot
>(AddFilterDropdownRoot, {
  Trigger: Dropdown.Trigger,
  Popper: Dropdown.Popper,
});

export default AddFilterDropdown;
