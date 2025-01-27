import type { Intergalactic } from '@semcore/utils/lib/core';
import type { FlexProps } from '@semcore/flex-box';
import type Select from '@semcore/select';
import type Input from '@semcore/input';
import type Dropdown from '@semcore/dropdown';
import type { DropdownTriggerProps } from '@semcore/dropdown';
import type { FilterTrigger } from '@semcore/base-trigger';
import type { ButtonLink } from '@semcore/button';

export type AddFilterItemProps = {
  /**
   * Non-persistent filter item unique `name`. Should be the same as related `key` in `FilterData` item related to Filter Control.
   */
  name: string;
  /**
   * Optional `displayName` to be displayed inside `Add filter` dropdown menu. If not specified, `name` will be used instead.
   */
  displayName?: string;
  /**
   * Action to perform on filter item unmount.
   */
  onUnmount?: () => void;
};

declare const AddFilterSelectType: Intergalactic.Component<typeof Select, AddFilterItemProps> & {
  Trigger: typeof FilterTrigger;
  Popper: Intergalactic.Component<typeof Select.Popper, {}, { onApply: () => void }>;
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
  Popper: Intergalactic.Component<typeof Dropdown.Popper, {}, { onApply: () => void }>;
};

export type FilterData = Record<string, any>;
export type AddFilterProps = FlexProps & {
  /**
   * Action to perform on `Clear filters` button click.
   */
  onClearAll: () => void;
  /**
   * `FilterData` object.
   */
  filterData: FilterData;
};

declare const AddFilterType: Intergalactic.Component<'div', AddFilterProps> & {
  Dropdown: typeof AddFilterDropdownType;
  Input: typeof AddFilterInputType;
  Select: typeof AddFilterSelectType;
};

export { AddFilterInputType, AddFilterSelectType, AddFilterDropdownType };
export default AddFilterType;
