import type { NSFlex } from '@semcore/base-components';
import type { FilterTrigger } from '@semcore/base-trigger';
import type { ButtonLink } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import type Dropdown from '@semcore/dropdown';
import type { DropdownTriggerProps } from '@semcore/dropdown';
import type Input from '@semcore/input';
import type Select from '@semcore/select';
import type { SelectProps } from '@semcore/select';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSAddFilter {
  type Key = string;
  type Data = Record<string, any>;
  type Props = NSFlex.Props & {
  /**
   * Action to perform on `Clear filters` button click.
   */
    onClearAll: () => void;
    /**
   * `FilterData` object.
   */
    filterData: NSAddFilter.Data;
    /**
   * List of visible filters keys. Relative to the `name` in AddFilterItemProps.
   */
    visibleFilters?: NSAddFilter.Key[];
    /**
   * Callback for handle changes in visible filters.
   */
    onVisibleFiltersChange?: (visibleFilters: NSAddFilter.Key[]) => void;
  };
  type DefaultProps = {
    i18n: LocalizedMessages;
    locale: 'en';
    defaultVisibleFilters: Props['visibleFilters'];
  };
  type State = {
    clearFiltersMessage: string;
  };
  type Handlers = {
    visibleFilters: null;
  };
  type ItemProps = {
    /**
     * Non-persistent filter item unique `name`. Should be the same as related `key` in `FilterData` item related to Filter Control.
     */
    name: NSAddFilter.Key;
    /**
     * Optional `displayName` to be displayed inside `Add filter` dropdown menu. If not specified, `name` will be used instead.
     */
    displayName?: string;
    /**
     * Action to perform on filter item unmount.
     */
    onUnmount?: () => void;

    /**
     * @inner
     */
    visible?: boolean;
  };

  namespace Select {
    type Props = SelectProps & ItemProps;

    type DefaultProps = {
      defaultVisible: false;
    };
    type Handlers = {
      visible: null;
    };

    namespace Trigger {
      type Component = typeof FilterTrigger;
    }

    namespace Popper {
      type Component = Intergalactic.Component<typeof Select.Popper, {}, { onApply: () => void }>;
    }

    namespace Option {
      type Component = typeof Select.Option;
    }

    namespace Menu {
      type Component = typeof Select.Menu;
    }

    namespace List {
      type Component = typeof Select.List;
    }

    namespace InputSearch {
      type Component = typeof Select.InputSearch;
    }

    type Component = Intergalactic.Component<typeof Select, Props> & {
      Trigger: Trigger.Component;
      Popper: Popper.Component;
      Option: Option.Component;
      Menu: Menu.Component;
      List: List.Component;
      InputSearch: InputSearch.Component;
    };
  }

  namespace Input {
    namespace Addon {
      type Component = typeof Input.Addon;
    }

    namespace Value {
      type Component = typeof Input.Value;
    }

    namespace Clear {
      type Component = typeof ButtonLink;
    }

    type Component = Intergalactic.Component<typeof Input, NSAddFilter.ItemProps> & {
      Addon: Addon.Component;
      Value: Value.Component;
      Clear: Clear.Component;
    };
  }

  namespace Dropdown {
    type DefaultProps = {
      defaultVisible: false;
    };
    type Handlers = {
      visible: null;
    };
    namespace Trigger {
      type Component = Intergalactic.Component<typeof Dropdown.Trigger, DropdownTriggerProps & { onClear: () => void }>;
    }

    namespace Popper {
      type Component = Intergalactic.Component<typeof Dropdown.Popper, {}, { onApply: () => void }>;
    }

    type Component = Intergalactic.Component<typeof Dropdown, NSAddFilter.ItemProps> & {
      Trigger: Trigger.Component;
      Popper: Popper.Component;
    };
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Dropdown: Dropdown.Component;
    Input: Input.Component;
    Select: Select.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type AddFilterKey = NSAddFilter.Key;
/** @deprecated It will be removed in v18. */
export type AddFilterItemProps = NSAddFilter.ItemProps;
/** @deprecated It will be removed in v18. */
declare const AddFilterSelectType: NSAddFilter.Select.Component;
/** @deprecated It will be removed in v18. */
declare const AddFilterInputType: NSAddFilter.Input.Component;
/** @deprecated It will be removed in v18. */
declare const AddFilterDropdownType: NSAddFilter.Dropdown.Component;
/** @deprecated It will be removed in v18. */
export type FilterData = NSAddFilter.Data;
/** @deprecated It will be removed in v18. */
export type AddFilterProps = NSAddFilter.Props;
/** @deprecated It will be removed in v18. */
export type AddFilterDefaultProps = NSAddFilter.DefaultProps;
/** @deprecated It will be removed in v18. */
export type AddFilterType = NSAddFilter.Component;

export { AddFilterInputType, AddFilterSelectType, AddFilterDropdownType };
export type { NSAddFilter };
