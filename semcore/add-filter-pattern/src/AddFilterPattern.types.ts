import { Intergalactic } from '@semcore/core';
import { FlexProps } from '@semcore/flex-box';
import Select, { SelectProps } from '@semcore/select';
import Input from '@semcore/ui/input';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Dropdown, { DropdownProps } from '@semcore/ui/dropdown';

type FilterData = Record<string, any>;

export type AddFilterPatternItemProps = {
  alwaysVisible?: boolean;
  name: string;
  displayName?: string;
  onClear: () => void;
  value: any;
  onChange: (v: any) => void;
  empty?: boolean;
};

export type AddFilterPatternSelectProps = AddFilterPatternItemProps & SelectProps;

declare const AddFilterPatternSelectType: Intergalactic.Component<
  typeof Select,
  AddFilterPatternSelectProps
> & {
  Trigger: typeof Select.Trigger;
  Popper: typeof Select.Popper;
  Option: typeof Select.Option;
};

export type AddFilterPatternSearchProps = {
  onClear: () => void;
  valueProps: {
    value: any;
    onChange: (v: any) => void;
  };
};

declare const AddFilterPatternSearchType: Intergalactic.Component<
  typeof Input,
  AddFilterPatternItemProps
> & {
  Input: typeof Input;
};

export type AddFilterPatternDropdownProps = AddFilterPatternItemProps & DropdownProps;

declare const AddFilterPatternDropdownType: Intergalactic.Component<
  typeof Dropdown,
  AddFilterPatternDropdownProps
> & {
  Trigger: typeof Dropdown.Trigger;
  Popper: typeof Dropdown.Popper;
};

export type AddFilterPatternDropdownOptions = Array<{ label: string; value: string }>;
export type AddFilterDropdownMenuProps = {
  options: AddFilterPatternDropdownOptions;
  toggleFieldVisibility: (name: string, status?: boolean) => void;
  visibleFilters: Set<string>;
};

export type ClearButtonProps = {
  filterData: FilterData;
  clearAll: () => void;
};

export type AddFilterPatternProps = FlexProps & {};

export type AddFilterPatternState = {
  visibleFilters: Set<string>;
  addDropdownItems: AddFilterPatternDropdownOptions;
  filterData: FilterData;
};

declare const AddFilterPatternType: Intergalactic.Component<'div', AddFilterPatternProps> & {
  Dropdown: typeof AddFilterPatternDropdownType;
  Search: typeof AddFilterPatternSearchType;
  Select: typeof AddFilterPatternSelectType;
  // do we need to publish this???
  DropdownMenu: Intergalactic.Component<typeof DropdownMenu>;
  Clear: Intergalactic.Component<'button'>;
};

export { AddFilterPatternSearchType, AddFilterPatternSelectType, AddFilterPatternDropdownType };
export default AddFilterPatternType;
