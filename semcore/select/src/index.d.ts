import { ComponentProps } from 'react';
import { CProps, Merge, MergeGetters, PropGetter, ReturnEl } from '@semcore/core';
import DropdownMenu, { IDropdownMenuContext, IDropdownMenuProps } from '@semcore/dropdown-menu';
import { ButtonTrigger, IBaseTriggerProps } from '@semcore/base-trigger';
import Divider from '@semcore/divider';
import { IInputValueProps } from '@semcore/input';

export interface ISelectInputSearch extends IInputValueProps {}

export type SelectValue = string | number;

export type SelectOption = {
  value: SelectValue;
  children?: React.ReactNode;
  label?: React.ReactNode;
};

export interface ISelectProps<T extends SelectValue | SelectValue[] = SelectValue | SelectValue[]>
  extends IDropdownMenuProps,
    IBaseTriggerProps {
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
   */
  defaultValue?: T;
  /**
   * The selected value or values array when using multiselect
   */
  value?: T;
  /**
   * Callback on value change
   */
  onChange?: (value: T, e: React.SyntheticEvent) => boolean | void;
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

  /**
   * The list of options selected by default
   * @deprecated v2.0.0 {@link ISelectProps.defaultValue}
   */
  defaultSelectedOptions?: ISelectOption[];
  /**
   * List of the selected options
   * @deprecated v2.0.0 {@link ISelectProps.value}
   */
  selectedOptions?: ISelectOption[];
}

export interface ISelectContext extends ISelectProps {
  getTriggerProps: MergeGetters<
    PropGetter<RootSelect['getTriggerProps']>,
    IDropdownMenuContext['getTriggerProps']
  >;
}

export interface ISelectOption {
  value?: any;

  [key: string]: any;
}

export interface ISelectOptionProps {
  /** Value of the option */
  value: string | number;
}

export interface ISelectOptionCheckboxProps extends ISelectOptionProps {
  /** Checkbox theme */
  theme?: string;
}

declare const InputSearch: <T>(props: ISelectInputSearch & T) => ReturnEl;

declare const Select: ((props: CProps<ISelectProps, ISelectContext>) => ReturnEl) & {
  Trigger: [
    <T>(
      props: Merge<
        ComponentProps<typeof DropdownMenu.Trigger>,
        ComponentProps<typeof ButtonTrigger>
      > &
        T,
    ) => ReturnEl,
    {
      Addon: <T>(props: ComponentProps<typeof ButtonTrigger.Addon> & T) => ReturnEl;
      Text: <T>(props: ComponentProps<typeof ButtonTrigger.Text> & T) => ReturnEl;
    },
  ];
  Popper: <T>(props: ComponentProps<typeof DropdownMenu.Popper> & T) => ReturnEl;
  List: <T>(props: ComponentProps<typeof DropdownMenu.List> & T) => ReturnEl;
  Menu: <T>(props: ComponentProps<typeof DropdownMenu.Menu> & T) => ReturnEl;
  Option: [
    <T>(props: ISelectOptionProps & ComponentProps<typeof DropdownMenu.Item> & T) => ReturnEl,
    {
      Addon: ComponentProps<typeof DropdownMenu.Item.Addon>;
    },
  ];
  OptionTitle: <T>(props: ComponentProps<typeof DropdownMenu.ItemTitle> & T) => ReturnEl;
  OptionHint: <T>(props: ComponentProps<typeof DropdownMenu.ItemHint> & T) => ReturnEl;
  OptionCheckbox: [
    <T>(
      props: ISelectOptionCheckboxProps & ComponentProps<typeof DropdownMenu.Item> & T,
    ) => ReturnEl,
    {
      Addon: <T>(props: ComponentProps<typeof DropdownMenu.Item.Addon> & T) => ReturnEl;
    },
  ];
  Divider: <T>(props: ComponentProps<typeof Divider> & T) => ReturnEl;
  InputSearch: <T>(props: ComponentProps<InputSearch> & T) => ReturnEl;
  Input: <T>(props: ComponentProps<InputSearch> & T) => ReturnEl;
};

export { InputSearch };
export default Select;
