import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import DropdownMenu, {
  DropdownMenuContext,
  DropdownMenuItemProps,
  DropdownMenuProps,
  DropdownMenuHandlers,
  DropdownMenuTriggerProps,
} from '@semcore/dropdown-menu';
import { ButtonTrigger, BaseTriggerProps, ButtonTriggerProps } from '@semcore/base-trigger';
import Divider from '@semcore/divider';
import { InputValueProps } from '@semcore/input';
import { BoxProps } from '@semcore/flex-box';

/** @deprecated */
export interface ISelectInputSearch extends SelectInputSearch, UnknownProperties {}
export type SelectInputSearch = InputValueProps & {};

export type OptionValue = string | number;
export type SelectValue = string | number | Array<string | number> | null;

export type SelectOption = {
  value: OptionValue;
  children?: React.ReactNode;
  label?: React.ReactNode;
};

/** @deprecated */
export interface ISelectProps<T extends SelectValue = SelectValue> extends SelectProps<T> {}
export type SelectProps<T extends SelectValue = SelectValue> = DropdownMenuProps &
  BaseTriggerProps & {
    /**
     * Multiple select
     */
    multiselect?: boolean;
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
     * Input name
     */
    name?: string;
    locale?: string;
    /**
     * If enabled, after opening select popper view will be scrolled to selected option or, if there are multiple selected options, to the first selected option.
     * @default true
     */
    scrollToSelected?: boolean;
  };

/** @deprecated */
export interface ISelectOption extends SelectOption, UnknownProperties {}

/** @deprecated */
export interface ISelectOptionProps extends SelectOptionProps, UnknownProperties {}
export type SelectOptionProps = DropdownMenuItemProps & {
  /** Value of the option */
  value: string | number;
};

/** @deprecated */
export interface ISelectOptionCheckboxProps extends SelectOptionCheckboxProps, UnknownProperties {}
export type SelectOptionCheckboxProps = SelectOptionProps & {
  /** Checkbox theme */
  theme?: string;
};

declare const InputSearch: Intergalactic.Component<'div', SelectInputSearch>;

/** @deprecated */
export interface ISelectContext extends SelectContext, UnknownProperties {}
export type SelectContext = DropdownMenuContext & {
  getOptionProps: PropGetterFn;
  getOptionCheckboxProps: PropGetterFn;
  getDividerProps: PropGetterFn;
};

/** @deprecated */
export interface ISelectHandlers extends SelectHandlers, UnknownProperties {}
export type SelectHandlers = DropdownMenuHandlers & {
  value: (index: SelectValue) => void;
};

type IntergalacticSelectComponent = (<
  Value extends SelectValue,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    'div',
    SelectProps<Value>,
    SelectContext,
    [handlers: SelectHandlers]
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div'>;

declare const Select: IntergalacticSelectComponent & {
  Trigger: Intergalactic.Component<
    'div',
    DropdownMenuTriggerProps & ButtonTriggerProps,
    {},
    [handlers: SelectHandlers]
  > & {
    Addon: typeof ButtonTrigger.Addon;
    Text: typeof ButtonTrigger.Text;
  };
  Popper: typeof DropdownMenu.Popper;
  List: typeof DropdownMenu.List;
  Menu: typeof DropdownMenu.Menu;
  Option: Intergalactic.Component<
    'option',
    SelectOptionProps,
    SelectContext,
    [handlers: SelectHandlers]
  > & {
    Addon: typeof DropdownMenu.Item.Addon;
    Checkbox: Intergalactic.Component<'div', BoxProps & { theme?: string; selected?: boolean }>;
  };
  OptionTitle: typeof DropdownMenu.ItemTitle;
  OptionHint: typeof DropdownMenu.ItemHint;
  Divider: typeof Divider;
  InputSearch: typeof InputSearch;
  Input: typeof InputSearch;
};

export { InputSearch };
export default Select;
