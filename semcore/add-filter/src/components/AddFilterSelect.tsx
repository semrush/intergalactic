import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Select, { SelectProps } from '@semcore/select';
import { AddFilterItemProps, AddFilterSelectType } from '../AddFilter.types';
import { FilterTrigger } from '@semcore/base-trigger';

type AsPropsWithOnClear<T> = T & { onClear: () => void };
class AddFilterSelectRoot extends Component<SelectProps & AddFilterItemProps> {
  static displayName = 'AddFilterSelect';
  menuRef = React.createRef<HTMLDivElement>();

  static defaultProps = () => {
    return {
      defaultVisible: true,
    };
  };

  isValueEmpty() {
    const { value, multiselect } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;
    return multiselect && Array.isArray(value) ? !value?.length : !value;
  }

  onBlur = (e: React.FocusEvent<HTMLImageElement>) => {
    const { onClear } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;
    const closestPopper =
      this.menuRef.current?.closest('[data-ui-name="DropdownMenu.Popper"]') ??
      this.menuRef.current?.closest('[data-ui-name="AddFilterSelect.Popper"]');

    if (this.isValueEmpty() && !closestPopper?.contains(e.relatedTarget)) {
      setTimeout(onClear, 200);
    }
  };

  getTriggerProps() {
    const { onClear } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

    return {
      tag: FilterTrigger,
      onBlur: this.onBlur,
      onKeyDown: (e: React.KeyboardEvent<HTMLImageElement>) => {
        if (this.isValueEmpty() && e.key === 'Escape') {
          onClear();
        }
      },
      empty: this.isValueEmpty(),
      onClear,
      autoFocus: true,
    };
  }

  getMenuProps() {
    return {
      ref: this.menuRef,
    };
  }

  getListProps() {
    return {
      ref: this.menuRef,
    };
  }

  getOptionCheckboxProps() {
    return {
      onBlur: this.onBlur,
    };
  }

  render() {
    return <Root render={Select} />;
  }
}

const AddFilterSelect: typeof AddFilterSelectType = createComponent(AddFilterSelectRoot, {
  Trigger: Select.Trigger,
  Menu: Select.Menu,
  Option: [
    Select.Option,
    {
      Checkbox: Select.Option.Checkbox,
    },
  ],
  List: Select.List,
  Popper: Select.Popper,
  InputSearch: Select.InputSearch,
});

export default AddFilterSelect;
