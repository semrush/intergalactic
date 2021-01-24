import React, { ComponentProps } from 'react';
import createComponent, {
  Component,
  Merge,
  MergeGetters,
  PropGetter,
  PropsAndRef,
  styled,
} from '@semcore/core';
import DropdownMenu, { IDropdownMenuContext, IDropdownMenuProps } from '@semcore/dropdown-menu';
import { ButtonTrigger, IBaseTriggerProps } from '@semcore/base-trigger';
import Divider from '@semcore/divider';
import findComponent from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';
import resolveColor from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

import InputSearch from './InputSearch';

import style from './style/select.shadow.css';

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

function isSelectedOption(value, valueOption) {
  return Array.isArray(value) ? value.includes(valueOption) : valueOption === value;
}

function isEmptyValue(value) {
  return Array.isArray(value) ? value.length === 0 : value === null;
}

function getEmptyValue(multiselect) {
  return multiselect ? [] : null;
}

class RootSelect extends Component<ISelectProps> {
  isScrolledToFirstOption: boolean;

  constructor(props) {
    super(props);
    this.isScrolledToFirstOption = false;
  }

  static displayName = 'Select';

  static style = style;

  static defaultProps = (props) => ({
    placeholder: props.multiselect ? 'Select options' : 'Select option',
    size: 'm',
    defaultValue: getEmptyValue(props.multiselect),
    defaultSelectedOptions: [],
    defaultVisible: false,
  });

  firstSelectedOptionRef = React.createRef<HTMLElement>();

  uncontrolledProps() {
    return {
      visible: null,
      value: null,
      selectedOptions: null,
    };
  }

  isFallback() {
    const { selectedOptions, defaultSelectedOptions } = this.props;
    // @ts-ignore
    return selectedOptions !== undefined || defaultSelectedOptions.length !== 0;
  }

  fallbackDeprecatedValue(value) {
    return this.isFallback() ? this.asProps.selectedOptions.map((o) => o.value) : value;
  }

  fallbackDeprecatedLabel(value) {
    return this.isFallback() ? this.asProps.selectedOptions.map((o) => o.label || o.value) : value;
  }

  getTriggerProps() {
    const {
      size,
      disabled,
      visible,
      state,
      placeholder,
      value,
      options,
      forwardRef,
      name,
      multiselect,
    } = this.asProps;

    return {
      empty: isEmptyValue(this.fallbackDeprecatedValue(value)),
      size,
      value,
      name,
      $hiddenRef: forwardRef,
      multiselect,
      state,
      placeholder,
      disabled,
      active: visible,
      onClear: this.handlerClear,
      children: this.renderChildrenTrigger(this.fallbackDeprecatedValue(value), options),
    };
  }

  getOptionProps(props) {
    const { value } = this.asProps;
    const selected = isSelectedOption(this.fallbackDeprecatedValue(value), props.value);
    const other = {} as any;

    if (selected && !this.isScrolledToFirstOption) {
      other.ref = this.firstSelectedOptionRef;
      this.isScrolledToFirstOption = true;
    }

    return {
      selected,
      onClick: this.isFallback()
        ? this.bindHandlerOptionFallbackClick(props)
        : this.bindHandlerOptionClick(props.value),
      ...other,
    };
  }

  getOptionCheckboxProps(props) {
    const { size } = this.asProps;
    return {
      size,
      ...this.getOptionProps(props),
    };
  }

  renderChildrenTrigger(value, options) {
    if (options) {
      value = this.fallbackDeprecatedValue(value);
      return [].concat(value).reduce((acc, value) => {
        const selectedOption = options.find((o) => isSelectedOption(value, o.value));
        if (!selectedOption) return acc;
        if (acc.length) acc.push(', ');
        acc.push(selectedOption.label || selectedOption.value);
        return acc;
      }, []);
    }
    value = this.fallbackDeprecatedLabel(value);
    return Array.isArray(value)
      ? value.reduce((acc, value) => {
          if (acc.length) acc.push(', ');
          acc.push(value);
          return acc;
        }, [])
      : value;
  }

  bindHandlerOptionClick = (optionValue) => (e) => {
    let newValue = optionValue;
    const { value, multiselect } = this.asProps;
    if (Array.isArray(value)) {
      if (value.includes(optionValue)) {
        newValue = value.filter((v) => v !== optionValue);
      } else {
        newValue = value.concat(optionValue);
      }
    }
    this.handlers.value(newValue, e);
    if (!multiselect) this.handlers.visible(false);
  };

  bindHandlerOptionFallbackClick = (props) => (e) => {
    const { selectedOptions, multiselect } = this.asProps;
    let optionProps = [props];
    if (multiselect) {
      if (isSelectedOption(this.fallbackDeprecatedValue(selectedOptions), props.value)) {
        optionProps = selectedOptions.filter((o) => o.value !== props.value);
      } else {
        optionProps = selectedOptions.concat(props);
      }
    }
    this.handlers.value(optionProps, e);
    if (!multiselect) this.handlers.visible(false);
  };

  handlerClear = (e) => {
    const { value } = this.asProps;
    const emptyValue = getEmptyValue(Array.isArray(this.fallbackDeprecatedValue(value)));
    if (this.isFallback()) {
      this.handlers.value(Array.isArray(emptyValue) ? emptyValue : [], e);
    } else {
      this.handlers.value(emptyValue, e);
    }
    this.handlers.visible(false);
  };

  scrollToSelectedOption() {
    setTimeout(() => {
      this.firstSelectedOptionRef.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }, 0);
  }

  componentDidMount() {
    const { visible } = this.asProps;
    if (visible) {
      this.scrollToSelectedOption();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.asProps;
    //  TODO: вынести в хелпер
    // Если открыли
    if (visible) {
      this.isScrolledToFirstOption = false;

      // Если uncontroll
      if (prevProps.visible === undefined) {
        if (prevState.visible !== visible) this.scrollToSelectedOption();
      } else {
        if (prevProps.visible !== visible) this.scrollToSelectedOption();
      }
    }
  }

  render() {
    const Root = this.Root;
    const { Children, options, multiselect, ...other } = this.asProps;
    const advanceMode = findComponent(Children, [
      Select.Trigger.displayName,
      Select.Popper.displayName,
    ]);

    logger.warn(
      // @ts-ignore
      this.isFallback(),
      "'selectedOptions'/'defaultSelectedOptions' changed to 'value/defaultValue' and take only values, not objects.",
      other['data-ui-name'] || Select.displayName,
    );

    logger.warn(
      options && advanceMode,
      "Don't use at the same time 'options' property and '<Select.Trigger/>/<Select.Popper/>'",
      other['data-ui-name'] || Select.displayName,
    );

    if (options) {
      const Component = multiselect ? Select.OptionCheckbox : Select.Option;
      return (
        <Root render={DropdownMenu}>
          <Select.Trigger {...(other as any)} />
          <Select.Menu>
            {options.map((option, i) => {
              return <Component key={i} {...option} />;
            })}
          </Select.Menu>
        </Root>
      );
    }

    return <Root render={DropdownMenu} />;
  }
}

function Trigger({ Root, Children, name, value, $hiddenRef }) {
  return (
    <Root render={DropdownMenu.Trigger} tag={ButtonTrigger} placeholder="Select option">
      {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon)}
      {name && <input type="hidden" defaultValue={value} name={name} ref={$hiddenRef} />}
    </Root>
  );
}

function OptionCheckbox(props) {
  const { styles, selected, ...other } = props;
  const { size, theme, children } = other;
  const SOptionCheckbox = 'div';
  const color = resolveColor(theme);
  return styled(styles)`
    SOptionCheckbox[theme]:before {
      border-color: ${color};
    }

    SOptionCheckbox[theme][checked]:before {
      background-color: ${color};
      border-color: ${color};
    }
  `(
    <DropdownMenu.Item {...other}>
      <SOptionCheckbox
        // @ts-ignore
        size={size}
        theme={theme}
        checked={selected}
      />
      {children}
    </DropdownMenu.Item>,
  );
}

function SelectDivider(props) {
  return <Divider my={1} {...props} />;
}

const InputSearchWrapper = function (props) {
  const { Root } = props;
  logger.warn(
    true,
    `\'<${props['data-ui-name']}/>\' является устаревшим, используйте именованный импорт \'import { InputSearch }\'`,
    props['data-ui-name'] || Select.InputSearch.displayName,
  );
  return <Root render={InputSearch} />;
};

const Select = createComponent<
  RootSelect,
  {
    Trigger: [
      Merge<ComponentProps<typeof DropdownMenu.Trigger>, ComponentProps<typeof ButtonTrigger>>,
      {
        Addon: ComponentProps<typeof ButtonTrigger.Addon>;
        Text: ComponentProps<typeof ButtonTrigger.Text>;
      },
    ];
    Popper: ComponentProps<typeof DropdownMenu.Popper>;
    List: ComponentProps<typeof DropdownMenu.List>;
    Menu: ComponentProps<typeof DropdownMenu.Menu>;
    Option: [
      ISelectOptionProps & ComponentProps<typeof DropdownMenu.Item>,
      {
        Addon: ComponentProps<typeof DropdownMenu.Item.Addon>;
      },
    ];
    OptionTitle: ComponentProps<typeof DropdownMenu.ItemTitle>;
    OptionHint: ComponentProps<typeof DropdownMenu.ItemHint>;
    OptionCheckbox: [
      ISelectOptionCheckboxProps & ComponentProps<typeof DropdownMenu.Item>,
      {
        Addon: ComponentProps<typeof DropdownMenu.Item.Addon>;
      },
    ];
    Divider: ComponentProps<typeof Divider>;
    InputSearch: ComponentProps<typeof InputSearch>;
    Input: ComponentProps<typeof InputSearch>;
  },
  ISelectContext,
  <T extends SelectValue | SelectValue[] = SelectValue | SelectValue[]>(
    props: PropsAndRef<
      ISelectProps<T>,
      ISelectContext,
      ReturnType<RootSelect['uncontrolledProps']>
    >,
  ) => React.ReactElement
>(
  RootSelect,
  {
    Trigger: [
      Trigger,
      {
        Addon: ButtonTrigger.Addon,
        Text: ButtonTrigger.Text,
      },
    ],
    Popper: DropdownMenu.Popper,
    List: DropdownMenu.List,
    Menu: DropdownMenu.Menu,
    Option: DropdownMenu.Item,
    OptionTitle: DropdownMenu.ItemTitle,
    OptionHint: DropdownMenu.ItemHint,
    OptionCheckbox: [
      OptionCheckbox,
      {
        Addon: DropdownMenu.Item.Addon,
      },
    ],
    Divider: SelectDivider,
    InputSearch: InputSearchWrapper,
    Input: InputSearchWrapper,
  },
  { parent: DropdownMenu },
);

export default Select;
