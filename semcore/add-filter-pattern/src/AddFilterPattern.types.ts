import { Intergalactic } from '@semcore/core';
import { FlexProps } from '@semcore/flex-box';
import Select, { SelectProps } from '@semcore/select';
import Input from '@semcore/ui/input';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Dropdown, { DropdownProps } from '@semcore/ui/dropdown';

export type AddFilterPatternItemProps = {
  alwaysVisible?: boolean;
  name: string;
  displayName?: string;
};

export type AddFilterPatternSelectProps = AddFilterPatternItemProps &
  SelectProps & { onClear: () => void };

declare const AddFilterPatternSelectType: Intergalactic.Component<
  typeof Select,
  AddFilterPatternSelectProps
> & {
  Trigger: typeof Select.Trigger;
  Popper: typeof Select.Popper;
  Option: typeof Select.Option;
};

export type AddFilterPatternSearchValueProps = {
  value: any;
  onChange?: (v: any, e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
};
export type AddFilterPatternSearchProps = {
  onClear: () => void;
  valueProps: AddFilterPatternSearchValueProps;
};

declare const AddFilterPatternSearchType: Intergalactic.Component<
  typeof Input,
  AddFilterPatternItemProps
> & {
  Input: typeof Input;
};

export type AddFilterPatternDropdownProps = AddFilterPatternItemProps &
  DropdownProps & {
    value: any;
    onClear: () => void;
    onChange?: (v: any, e: React.ChangeEvent<HTMLInputElement>) => void;
  };

declare const AddFilterPatternDropdownType: Intergalactic.Component<
  typeof Dropdown,
  AddFilterPatternDropdownProps
> & {
  Trigger: typeof Dropdown.Trigger;
  Popper: typeof Dropdown.Popper;
};

export type AddFilterPatternProps = FlexProps & {};

declare const AddFilterPatternType: Intergalactic.Component<'div', AddFilterPatternProps> & {
  Dropdown: typeof AddFilterPatternDropdownType;
  Search: typeof AddFilterPatternSearchType;
  Select: typeof AddFilterPatternSelectType;
  DropdownMenu: Intergalactic.Component<typeof DropdownMenu>;
  Clear: Intergalactic.Component<'button'>;
};

export { AddFilterPatternSearchType, AddFilterPatternSelectType, AddFilterPatternDropdownType };
export default AddFilterPatternType;
