import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { AddFilterItemProps } from '../AddFilter.types';
import { FilterTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';

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

  uncontrolledProps() {
    return {
      visible: [null],
    };
  }

  componentWillUnmount() {
    this.asProps.onUnmount?.();
  }

  getTriggerProps() {
    const { value, onClear } = this.asProps as AsPropsTypeWithHandlers<typeof this.asProps>;

    return {
      tag: FilterTrigger,
      empty: value == null,
      onClear,
      autoFocus: true,
    };
  }

  getPopperProps() {
    const { value, onClear } = this.asProps as AsPropsTypeWithHandlers<typeof this.asProps>;

    return {
      ref: this.popperRef,
      onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!value && e.key === 'Escape') {
          onClear();
        }
      },
    };
  }

  getApplyButtonProps() {
    return {
      onClick: () => {
        this.handlers.visible(false);
      },
    };
  }

  render() {
    return <Root render={Dropdown} />;
  }
}

function ApplyButton() {
  return (
    <Root render={Button} use='primary' theme='info'>
      Apply
    </Root>
  );
}

const AddFilterDropdown = createComponent(AddFilterDropdownRoot, {
  Trigger: Dropdown.Trigger,
  Popper: Dropdown.Popper,
  ApplyButton,
});

export default AddFilterDropdown;
