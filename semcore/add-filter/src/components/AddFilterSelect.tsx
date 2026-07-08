import { FilterTrigger } from '@semcore/base-trigger';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import Select from '@semcore/select';
import React from 'react';

import type { RootAddFilterType } from '../AddFilter';
import type { NSAddFilter } from '../AddFilter.types';

class AddFilterSelectRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAddFilter.Select.Component, RootAddFilterType, 'Select'>,
  [],
  NSAddFilter.Select.Handlers,
  WithI18nEnhanceProps,
  {},
  NSAddFilter.Select.DefaultProps
> {
  static displayName = 'AddFilterSelect';

  static defaultProps = {
    defaultVisible: false,
  } as const;

  componentDidMount() {
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
    const { value, multiselect } = this.asProps;
    return multiselect && Array.isArray(value) ? !value?.length : !value;
  }

  getTriggerProps() {
    const { onClear, setFocusRef } = this.asProps;

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

const AddFilterSelect = createComponent<
  NSAddFilter.Select.Component,
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
