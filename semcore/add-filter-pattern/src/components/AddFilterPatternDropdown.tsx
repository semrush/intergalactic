import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { AddFilterPatternSelectProps } from '../AddFilterPattern.types';
import { FilterTrigger } from '@semcore/ui/base-trigger';

class AddFilterPatternDropdownRoot extends Component<AddFilterPatternSelectProps> {
  static displayName = 'AddFilterPatternDropdown';
  popperRef = React.createRef<HTMLDivElement>();

  static defaultProps = (props: AddFilterPatternSelectProps) => {
    return {
      visible: !props.alwaysVisible,
    };
  };

  uncontrolledProps = (props: AddFilterPatternSelectProps) => {
    return {
      visible: [null, (v) => v],
    };
  };

  getTriggerProps() {
    const { value, onClear, alwaysVisible } = this.asProps;
    return {
      tag: FilterTrigger,
      empty: !value,
      onClear,
      autoFocus: !alwaysVisible,
    };
  }

  getPopperProps() {
    const { value, onClear } = this.asProps;
    return {
      ref: this.popperRef,
      onBlur: (e) => {
        if (!value && !this.popperRef.current?.contains(e.relatedTarget)) {
          setTimeout(onClear);
        }
      },
      onKeyDown: (e) => {
        if (e.key === 'Escape') {
          onClear();
        }
      },
    };
  }

  render() {
    return <Root render={Dropdown} onVisibleChange={this.handlers.visible} />;
  }
}

const AddFilterPatternSelectItem = createComponent(AddFilterPatternDropdownRoot, {
  Dropdown,
  Trigger: Dropdown.Trigger,
  Popper: Dropdown.Popper,
});

export default AddFilterPatternSelectItem;
