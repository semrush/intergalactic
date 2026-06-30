import { FilterTrigger } from '@semcore/base-trigger';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import React from 'react';

import type { RootAddFilterType } from '../AddFilter';
import type { NSAddFilter } from '../AddFilter.types';

class AddFilterDropdownRoot extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAddFilter.Dropdown.Component, RootAddFilterType, 'Dropdown'>,
  [],
  NSAddFilter.Dropdown.Handlers,
  {},
  {},
  NSAddFilter.Dropdown.DefaultProps
> {
  static displayName = 'AddFilterDropdown';

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

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  componentWillUnmount() {
    this.asProps.onUnmount?.();
  }

  getTriggerProps() {
    const { value, onClear, setFocusRef } = this.asProps;

    return {
      tag: FilterTrigger,
      triggerRef: setFocusRef,
      empty: value == null,
      onClear,
      autoFocus: true,
    };
  }

  getPopperProps() {
    const { value, onClear } = this.asProps;

    return {
      onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!value && e.key === 'Escape') {
          onClear();
        }
      },
      onApply: () => {
        this.handlers.visible(false);
      },
    };
  }

  render() {
    return <Root render={Dropdown} />;
  }
}

const AddFilterDropdown = createComponent<
  NSAddFilter.Dropdown.Component,
  typeof AddFilterDropdownRoot
>(AddFilterDropdownRoot, {
  Trigger: Dropdown.Trigger,
  Popper: Dropdown.Popper,
});

export default AddFilterDropdown;
