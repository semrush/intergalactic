import { Intergalactic } from '@semcore/core';
import { FlexProps } from '@semcore/flex-box';
import Select, { SelectProps } from '@semcore/select';
import Input from '@semcore/input';
import DropdownMenu from '@semcore/dropdown-menu';
import Dropdown, { DropdownPopperProps, DropdownProps } from '@semcore/dropdown';
import { FilterTrigger } from '@semcore/base-trigger';
import React from 'react';
import { Hint } from '@semcore/tooltip';

export type AddFilterPatternItemProps = {
  alwaysVisible?: boolean;
  name: string;
  displayName?: string;
};

export type AddFilterPatternSelectProps = AddFilterPatternItemProps & SelectProps;

declare const AddFilterPatternSelectType: Intergalactic.Component<
  typeof Select,
  AddFilterPatternSelectProps
> & {
  Trigger: typeof FilterTrigger;
  Popper: typeof Select.Popper;
  Option: typeof Select.Option;
  Menu: typeof Select.Menu;
};

declare const AddFilterPatternSearchType: Intergalactic.Component<
  typeof Input,
  AddFilterPatternItemProps,
  {
    value: string;
    onClear: () => void;
    onChange: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
  }
> & {
  Input: typeof Input & {
    CloseHint: typeof Hint;
  };
};

export type AddFilterPatternDropdownProps = AddFilterPatternItemProps & DropdownProps;
declare const AddFilterPatternDropdownType: Intergalactic.Component<
  typeof Dropdown,
  AddFilterPatternDropdownProps
> & {
  Trigger: typeof Dropdown.Trigger;
  Popper: Intergalactic.Component<
    typeof Dropdown.Popper,
    DropdownPopperProps,
    { onChange: (v: any) => void }
  >;
};

export type AddFilterPatternProps = FlexProps & {
  onClearAll: () => void;
};

declare const AddFilterPatternType: Intergalactic.Component<'div', AddFilterPatternProps> & {
  Dropdown: typeof AddFilterPatternDropdownType;
  Search: typeof AddFilterPatternSearchType;
  Select: typeof AddFilterPatternSelectType;
  DropdownMenu: typeof DropdownMenu;
  Clear: Intergalactic.Component<'button'>;
};

export { AddFilterPatternSearchType, AddFilterPatternSelectType, AddFilterPatternDropdownType };
export default AddFilterPatternType;
