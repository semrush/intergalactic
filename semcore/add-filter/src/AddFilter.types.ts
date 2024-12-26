import { Intergalactic } from '@semcore/utils/lib/core';
import { FlexProps } from '@semcore/flex-box';
import Select from '@semcore/select';
import Input from '@semcore/input';
import Dropdown, { DropdownTriggerProps } from '@semcore/dropdown';
import { FilterTrigger } from '@semcore/base-trigger';
import { ButtonLink } from '@semcore/button';

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
  InputSearch: typeof Select.InputSearch;
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
  Trigger: Intergalactic.Component<
    typeof Dropdown.Trigger,
    DropdownTriggerProps & { onClear: () => void }
  >;
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
