import type { BoxProps, Flex } from '@semcore/base-components';
import type { ButtonTrigger, BaseTriggerProps, ButtonTriggerProps, LinkTriggerProps } from '@semcore/base-trigger';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type Divider from '@semcore/divider';
import type Dropdown from '@semcore/dropdown';
import type {
  DropdownMenuContext,
  DropdownMenuItemProps,
  DropdownMenuProps,
  DropdownMenuHandlers,
  DropdownMenuTriggerProps,
} from '@semcore/dropdown-menu';
import type DropdownMenu from '@semcore/dropdown-menu';
import type { InputValueProps } from '@semcore/input';
import type Input from '@semcore/input';
import type { Text } from '@semcore/typography';
import type React from 'react';

export type SelectInputSearch = InputValueProps & {};

export type OptionValue = string | number;
export type SelectValue = string | number | Array<string | number> | null;

export type SelectOption = {
  value: OptionValue;
  children?: React.ReactNode;
  label?: React.ReactNode;
};

export type SelectProps<T extends SelectValue = SelectValue> = Intergalactic.InternalTypings.EfficientOmit<DropdownMenuProps, 'size'> &
  Intergalactic.InternalTypings.EfficientOmit<BaseTriggerProps, 'size'> & {
    /**
     * Options array
     */
    options?: SelectOption[];
    /**
     * The value or values array selected by default when using multiselect
     * @type SelectValue
     */
    defaultValue?: T;
    /**
     * The selected value or values array when using multiselect
     * @type SelectValue
     */
    value?: T;
    /**
     * Callback on value change
     * @type (value: SelectValue, e: React.SyntheticEvent) => boolean | void
     */
    onChange?:
      | ((value: T, e: React.SyntheticEvent) => boolean | void)
      | React.Dispatch<React.SetStateAction<T>>;
    /**
     * Trigger placeholder at not selected value
     */
    placeholder?: React.ReactNode;
    /**
     * Trigger state
     */
    state?: 'normal' | 'valid' | 'invalid';
    /**
     * Disables select
     */
    disabled?: boolean;
    /**
     * If provided, adds a hidden <input /> tag with the given name for enhancing accessibility.
     */
    name?: string;
    /** Specifies the locale for i18n support */
    locale?: string;
    /**
     * If enabled, after opening select popper view will be scrolled to selected option or, if there are multiple selected options, to the first selected option.
     * @default true
     */
    scrollToSelected?: boolean;
  } & ({
    tag?: never;
    /**
     * Default type for size from BaseTriggerProps if there is no customization via `tag`.
     */
    size?: BaseTriggerProps['size'];
  } | {});

export type SelectOptionProps = DropdownMenuItemProps & {
  /**
   * Enables selected state
   */
  selected?: boolean;
  /** Value of the option */
  value: string | number;
};

export type SelectOptionCheckboxProps = BoxProps & {
  /** Checkbox theme */
  theme?: string;
  /** Visual indeterminate state */
  indeterminate?: boolean;
  /** Controls the selected state */
  selected?: boolean;
};

declare const InputSearch: Intergalactic.Component<'div', SelectInputSearch> & {
  SearchIcon: typeof Input.Addon;
  Value: typeof Input.Value;
  Clear: typeof Input.Addon;
};

export type SelectContext = DropdownMenuContext & {
  getOptionProps: PropGetterFn;
  getOptionCheckboxProps: PropGetterFn;
  getDividerProps: PropGetterFn;
};

export type SelectHandlers = DropdownMenuHandlers & {
  value: (index: SelectValue) => void;
};

type IntergalacticSelectComponent<PropsExtending = {}> = (<
  Value extends SelectValue,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    'div',
    SelectProps<Value>,
    SelectContext,
    [handlers: SelectHandlers]
  > &
  PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', SelectProps>;

declare const Select: IntergalacticSelectComponent & {
  Trigger: Intergalactic.Component<
    typeof Dropdown.Trigger,
    DropdownMenuTriggerProps & (ButtonTriggerProps | LinkTriggerProps),
    {},
    [handlers: SelectHandlers]
  > & {
    Addon: typeof ButtonTrigger.Addon;
    Text: typeof ButtonTrigger.Text;
  };
  Popper: typeof DropdownMenu.Popper;
  List: typeof DropdownMenu.List;
  Menu: typeof DropdownMenu.Menu;
  Group: typeof Dropdown.Group;
  Option: Intergalactic.Component<
    'option',
    SelectOptionProps,
    SelectContext,
    [handlers: SelectHandlers]
  > & {
    Addon: typeof DropdownMenu.Item.Addon;
    Checkbox: Intergalactic.Component<'div', SelectOptionCheckboxProps>;
    Content: typeof Flex;
    Text: typeof Text;
    Hint: typeof Flex;
  };
  Divider: typeof Divider;
  InputSearch: typeof InputSearch;
  Input: typeof InputSearch;
};

declare const wrapSelect: <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticSelectComponent>
    > &
    PropsExtending,
  ) => React.ReactNode,
) => IntergalacticSelectComponent<PropsExtending>;

export { InputSearch, wrapSelect };
export default Select;
