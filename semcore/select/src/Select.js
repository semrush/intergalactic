import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';
import Divider from '@semcore/divider';
import findComponent from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';
import resolveColor from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

import InputSearch from './InputSearch';

import style from './style/select.shadow.css';
import cn from 'classnames';

function isSelectedOption(value, valueOption) {
  return Array.isArray(value) ? value.includes(valueOption) : valueOption === value;
}

function isEmptyValue(value) {
  return Array.isArray(value) ? value.length === 0 : value === null;
}

function getEmptyValue(multiselect) {
  return multiselect ? [] : null;
}

class RootSelect extends Component {
  static displayName = 'Select';

  static style = style;

  static defaultProps = (props) => ({
    placeholder: props.multiselect ? 'Select options' : 'Select option',
    size: 'm',
    defaultValue: getEmptyValue(props.multiselect),
    defaultSelectedOptions: [],
    defaultVisible: false,
  });

  firstSelectedOptionRef = React.createRef();

  isScrolledToFirstOption = false;

  uncontrolledProps() {
    return {
      visible: null,
      value: null,
      selectedOptions: null,
    };
  }

  isFallback() {
    const { selectedOptions, defaultSelectedOptions } = this.props;
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
    const other = {};

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
    const { Children, options, multiselect, ...other } = this.asProps;
    const advanceMode = findComponent(Children, [
      Select.Trigger.displayName,
      Select.Popper.displayName,
    ]);

    logger.warn(
      // @ts-ignore
      this.isFallback(),
      '\'selectedOptions\'/\'defaultSelectedOptions\' changed to \'value/defaultValue\' and take only values, not objects.',
      other['data-ui-name'] || Select.displayName,
    );

    logger.warn(
      options && advanceMode,
      'Don\'t use at the same time \'options\' property and \'<Select.Trigger/>/<Select.Popper/>\'',
      other['data-ui-name'] || Select.displayName,
    );

    if (options) {
      const Component = multiselect ? Select.OptionCheckbox : Select.Option;
      return (
        <Root render={DropdownMenu}>
          <Select.Trigger {...other} />
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

function Trigger({ Children, name, value, $hiddenRef, tag: Tag = ButtonTrigger }) {
  return (
    <Root render={DropdownMenu.Trigger} tag={Tag} placeholder='Select option'>
      {addonTextChildren(
        Children,
        Tag.Text || ButtonTrigger.Text,
        Tag.Addon || ButtonTrigger.Addon,
      )}
      {name && <input type='hidden' defaultValue={value} name={name} ref={$hiddenRef} />}
    </Root>
  );
}

function OptionCheckbox(props) {
  const { selected, ...other } = props;
  const { size, theme, children } = other;
  const SOptionCheckbox = 'div';
  const styles = sstyled(props.styles);
  return (
    <DropdownMenu.Item {...other}>
      <SOptionCheckbox
        className={styles.cn('SOptionCheckbox', {
          size,
          'use:theme': resolveColor(theme),
          checked: selected,
        }).className || undefined}
      />
      {children}
    </DropdownMenu.Item>
  );
}

function SelectDivider() {
  return <Root render={Divider} my={1} />;
}

const InputSearchWrapper = function(props) {
  logger.warn(
    true,
    `\'<${
      props['data-ui-name']
    }/>\' is deprecated, use the named import \'import { InputSearch }\'`,
    props['data-ui-name'] || Select.InputSearch.displayName,
  );
  return <Root render={InputSearch} />;
};

const Select = createComponent(
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
