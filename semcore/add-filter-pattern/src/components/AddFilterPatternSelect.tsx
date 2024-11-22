import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Select from '@semcore/select';
import { AddFilterPatternSelectProps } from '../AddFilterPattern.types';
import { FilterTrigger } from '@semcore/ui/base-trigger';

class AddFilterPatternSelectRoot extends Component<AddFilterPatternSelectProps> {
  static displayName = 'AddFilterPatternSelect';
  menuRef = React.createRef<HTMLDivElement>();

  static defaultProps = (props: AddFilterPatternSelectProps) => {
    return {
      defaultVisible: !props.alwaysVisible,
    };
  };

  getTriggerProps() {
    const { value, onClear, alwaysVisible } = this.asProps;

    return {
      tag: FilterTrigger,
      onBlur: (e) => {
        if (
          !value &&
          !this.menuRef.current
            ?.closest('[data-ui-name="DropdownMenu.Popper"]')
            ?.contains(e.relatedTarget)
        ) {
          setTimeout(onClear);
        }
      },
      onKeyDown: (e) => {
        if (e.key === 'Escape') {
          onClear();
        }
      },
      empty: !value,
      onClear,
      autoFocus: !alwaysVisible,
    };
  }

  getMenuProps() {
    return {
      ref: this.menuRef,
    };
  }

  render() {
    return <Root render={Select} __excludeProps={['onChange']} />;
  }
}

const AddFilterPatternSelectItem = createComponent(AddFilterPatternSelectRoot, {
  Trigger: Select.Trigger,
  Menu: Select.Menu,
  Option: Select.Option,
});

export default AddFilterPatternSelectItem;
