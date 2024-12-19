import { Intergalactic } from '@semcore/core';
import { FlexProps } from '@semcore/flex-box';
import Select from '@semcore/select';
import Input from '@semcore/input';
import DropdownMenu from '@semcore/dropdown-menu';
import Dropdown from '@semcore/dropdown';
import { FilterTrigger } from '@semcore/base-trigger';
import Button, { ButtonLink } from '@semcore/button';

export type AddFilterItemProps = {
  name: string;
  displayName?: string;
};

declare const AddFilterSelectType: Intergalactic.Component<typeof Select, AddFilterItemProps> & {
  Trigger: typeof FilterTrigger;
  Popper: typeof Select.Popper;
  Option: typeof Select.Option;
  Menu: typeof Select.Menu;
  List: typeof Select.List;
};

declare const AddFilterInputType: Intergalactic.Component<typeof Input, AddFilterItemProps> & {
  Addon: typeof Input.Addon;
  Value: typeof Input.Value;
  Clear: typeof ButtonLink;
};

declare const AddFilterDropdownType: Intergalactic.Component<
  typeof Dropdown,
  AddFilterItemProps
> & {
  Trigger: typeof Dropdown.Trigger;
  Popper: typeof Dropdown.Popper;
};

export type FilterData = Record<string, any>;
export type AddFilterProps = FlexProps & {
  onClearAll: () => void;
  filterData: FilterData;
};

declare const AddFilterType: Intergalactic.Component<'div', AddFilterProps> & {
  Dropdown: typeof AddFilterDropdownType;
  Input: typeof AddFilterInputType;
  Select: typeof AddFilterSelectType;
};

export { AddFilterInputType, AddFilterSelectType, AddFilterDropdownType };
export default AddFilterType;
