import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { AddFilterItemProps } from '../AddFilter.types';
import { FilterTrigger } from '@semcore/base-trigger';

type AsPropsTypeWithHandlers<T> = T & {
  onChange: (v: any) => void;
  onClear: () => void;
};

class AddFilterDropdownRoot extends Component<AddFilterItemProps> {
  static displayName = 'AddFilterDropdown';
  popperRef = React.createRef<HTMLDivElement>();

  static defaultProps = () => {
    return {
      defaultVisible: true,
    };
  };

  getTriggerProps() {
    const { value, onClear } = this.asProps as AsPropsTypeWithHandlers<typeof this.asProps>;

    return {
      tag: FilterTrigger,
      empty: !value,
      onClear,
      autoFocus: true,
    };
  }

  getPopperProps() {
    const { value, onClear } = this.asProps as AsPropsTypeWithHandlers<typeof this.asProps>;

    return {
      ref: this.popperRef,
      onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
        if (!value && !this.popperRef.current?.contains(e.relatedTarget)) {
          setTimeout(onClear, 200);
        }
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!value && e.key === 'Escape') {
          onClear();
        }
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
