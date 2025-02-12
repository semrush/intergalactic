import React from 'react';
import { createComponent, Component, Root } from '@semcore/core';
import Select, { SelectProps } from '@semcore/select';
import { AddFilterItemProps, AddFilterSelectType } from '../AddFilter.types';
import { FilterTrigger } from '@semcore/base-trigger';

type AsPropsWithOnClear<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};
class AddFilterSelectRoot extends Component<SelectProps & AddFilterItemProps> {
  static displayName = 'AddFilterSelect';

  static defaultProps = () => {
    return {
      defaultVisible: true,
    };
  };

  componentWillUnmount() {
    this.asProps.onUnmount?.();
  }

  uncontrolledProps() {
    return {
      visible: [null],
    };
  }

  isValueEmpty() {
    const { value, multiselect } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;
    return multiselect && Array.isArray(value) ? !value?.length : !value;
  }

  getTriggerProps() {
    const { onClear, setFocusRef } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

    return {
      tag: FilterTrigger,
      triggerRef: setFocusRef,
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

  getPopperProps() {
    return {
      onApply: () => {
        this.handlers.visible(false);
      },
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
