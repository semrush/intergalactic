import { FilterTrigger } from '@semcore/base-trigger';
import { createComponent, Component, Root } from '@semcore/core';
import Select, { type SelectProps } from '@semcore/select';
import React from 'react';

import type { AddFilterItemProps, AddFilterSelectType } from '../AddFilter.types';

type AsPropsWithOnClear<T> = T & {
  onClear: () => void;
  unsetFocusRef: () => void;
  setFocusRef: (el: HTMLElement) => {};
};

type DefaultProps = {
  defaultVisible: false;
};

class AddFilterSelectRoot extends Component<
  SelectProps & AddFilterItemProps,
  [],
  { visible: null },
  {},
  {},
  DefaultProps
> {
  static displayName = 'AddFilterSelect';

  static defaultProps = {
    defaultVisible: false,
  } as const;

  componentDidMount(): void {
    if (this.props.visible === undefined) {
      setTimeout(() => {
        this.handlers.visible(true);
      }, 0);
    }
  }

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
    return <Root render={Select} />;
  }
}

const AddFilterSelect: typeof AddFilterSelectType = createComponent<
  typeof AddFilterSelectType,
  typeof AddFilterSelectRoot
>(AddFilterSelectRoot, {
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
