import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import Select, { SelectProps } from '@semcore/select';
import { AddFilterItemProps, AddFilterSelectType } from '../AddFilter.types';
import { FilterTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';

type AsPropsWithOnClear<T> = T & { onClear: () => void };
class AddFilterSelectRoot extends Component<SelectProps & AddFilterItemProps> {
  static displayName = 'AddFilterSelect';

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

  isValueEmpty() {
    const { value, multiselect } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;
    return multiselect && Array.isArray(value) ? !value?.length : !value;
  }

  getTriggerProps() {
    const { onClear } = this.asProps as AsPropsWithOnClear<typeof this.asProps>;

    return {
      tag: FilterTrigger,
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

  getApplyButtonProps() {
    return {
      onClick: () => {
        this.handlers.visible(false);
      },
    };
  }

  render() {
    return <Root render={Select} />;
  }
}

function ApplyButton() {
  return (
    <Root render={Button} use='primary' theme='info' w='100%'>
      Apply
    </Root>
  );
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
  ApplyButton,
});

export default AddFilterSelect;
