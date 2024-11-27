import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { AddFilterPatternSelectProps } from '../AddFilterPattern.types';
import { FilterTrigger } from '@semcore/base-trigger';

type AsPropsTypeWithHandlers<T> = T & {
  onChange: (v: any) => void;
  onClear: () => void;
};

class AddFilterPatternDropdownRoot extends Component<AddFilterPatternSelectProps> {
  static displayName = 'AddFilterPatternDropdown';
  popperRef = React.createRef<HTMLDivElement>();

  static defaultProps = (props: AddFilterPatternSelectProps) => {
    return {
      defaultVisible: !props.alwaysVisible,
    };
  };

  getTriggerProps() {
    const { value, onClear, alwaysVisible } = this.asProps as AsPropsTypeWithHandlers<
      typeof this.asProps
    >;

    return {
      tag: FilterTrigger,
      empty: !value,
      onClear,
      autoFocus: !alwaysVisible,
    };
  }

  getPopperProps() {
    const { value, onClear } = this.asProps as AsPropsTypeWithHandlers<typeof this.asProps>;

    return {
      ref: this.popperRef,
      onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
        if (!value && !this.popperRef.current?.contains(e.relatedTarget)) {
          setTimeout(onClear, 50);
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
    return <Root render={Dropdown} __excludeProps={['onChange']} />;
  }
}

const AddFilterPatternSelectItem = createComponent(AddFilterPatternDropdownRoot, {
  Dropdown,
  Trigger: Dropdown.Trigger,
  Popper: Dropdown.Popper,
});

export default AddFilterPatternSelectItem;
