import { Intergalactic } from '@semcore/core';
import { FlexProps } from '@semcore/flex-box';
import Select, { SelectProps } from '@semcore/select';
import Input from '@semcore/input';
import DropdownMenu from '@semcore/dropdown-menu';
import Dropdown from '@semcore/dropdown';
import { FilterTrigger } from '@semcore/base-trigger';
import Button, { ButtonLink } from '@semcore/ui/button';

export type AddFilterPatternItemProps = {
  name: string;
  displayName?: string;
};

declare const AddFilterPatternSelectType: Intergalactic.Component<
  typeof Select,
  AddFilterPatternItemProps
> & {
  Trigger: typeof FilterTrigger;
  Popper: typeof Select.Popper;
  Option: typeof Select.Option;
  Menu: typeof Select.Menu;
  List: typeof Select.List;
};

declare const AddFilterPatternInputType: Intergalactic.Component<
  typeof Input,
  AddFilterPatternItemProps
> & {
  Addon: typeof Input.Addon;
  Value: typeof Input.Value;
  Clear: typeof ButtonLink;
};

declare const AddFilterPatternDropdownType: Intergalactic.Component<
  typeof Dropdown,
  AddFilterPatternItemProps
> & {
  Trigger: typeof Dropdown.Trigger;
  Popper: typeof Dropdown.Popper;
};

export type FilterData = Record<string, any>;
export type AddFilterPatternProps = FlexProps & {
  onClearAll: () => void;
  filterData: FilterData;
};

declare const AddFilterPatternType: Intergalactic.Component<'div', AddFilterPatternProps> & {
  Dropdown: typeof AddFilterPatternDropdownType;
  Input: typeof AddFilterPatternInputType;
  Select: typeof AddFilterPatternSelectType;
  DropdownMenu: typeof DropdownMenu;
  ClearAllFilters: typeof Button;
};

export { AddFilterPatternInputType, AddFilterPatternSelectType, AddFilterPatternDropdownType };
export default AddFilterPatternType;
