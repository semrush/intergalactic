import { type ButtonTriggerProps, FilterTrigger } from '@semcore/base-trigger';
import { createComponent, AbstractComponent, Root } from '@semcore/core';
import type { DropdownPopperAriaProps } from '@semcore/dropdown';
import type {
  DropdownMenuListProps,
  DropdownMenuMenuProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
} from '@semcore/dropdown-menu';
import Select, {
  type SelectOptionProps,
  type SelectOptionCheckboxProps,
  type SelectInputSearch,
  type SelectProps,
} from '@semcore/select';
import React from 'react';

import type { AddFilterItemProps } from '../AddFilter.types';

type AsPropsWithOnClear<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};
class AddFilterSelectRoot extends AbstractComponent<SelectProps & AddFilterItemProps, [], { visible: null }> {
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
      visible: null,
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
    const SSelectRoot = Root();
    return <SSelectRoot render={Select} />;
  }
}

function Trigger(props: DropdownMenuTriggerProps & ButtonTriggerProps) {
  const SSelectTrigger = Root();
  // @ts-ignore
  return <SSelectTrigger render={Select.Trigger} />;
}
function Menu(props: DropdownMenuMenuProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.Menu} />;
}
function Option(props: SelectOptionProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.Option} />;
}
function Checkbox(props: SelectOptionCheckboxProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.Option.Checkbox} />;
}
function List(props: DropdownMenuListProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.List} />;
}
function Popper(props: DropdownMenuProps & DropdownPopperAriaProps) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.Popper} />;
}
function InputSearch(props: SelectInputSearch) {
  const SSelectTrigger = Root();
  return <SSelectTrigger render={Select.InputSearch} />;
}

const AddFilterSelect = createComponent(AddFilterSelectRoot, {
  Trigger,
  Menu,
  Option: [Option, { Checkbox }],
  List,
  Popper,
  InputSearch,
});

export default AddFilterSelect;
