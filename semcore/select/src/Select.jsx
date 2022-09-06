import React from 'react';
import cn from 'classnames';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';
import Divider from '@semcore/divider';
import findComponent from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';
import resolveColor from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import InputSearch from './InputSearch';
import { useBox } from '@semcore/flex-box';
import { selectContext } from './context';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/select.shadow.css';

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
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = (props) => ({
    placeholder: props.multiselect ? 'Select options' : 'Select option',
    size: 'm',
    defaultValue: getEmptyValue(props.multiselect),
    defaultVisible: false,
  });

  firstSelectedOptionRef = React.createRef();

  isScrolledToFirstOption = false;

  uncontrolledProps() {
    return {
      visible: null,
      value: null,
    };
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
      uid,
      disablePortal,
    } = this.asProps;

    return {
      id: `igc-select-${uid}-trigger`,
      'aria-controls': visible ? `igc-select-${uid}-list` : undefined,
      'aria-flowto': visible && !disablePortal ? `igc-select-${uid}-list` : undefined,
      'aria-label': visible && !disablePortal ? `Press Tab to go to popover` : undefined,
      'aria-haspopup': 'listbox',
      empty: isEmptyValue(value),
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
      children: this.renderChildrenTrigger(value, options),
    };
  }

  getListProps() {
    const { multiselect } = this.asProps;
    return {
      'aria-multiselectable': multiselect ? 'true' : undefined,
    };
  }

  getMenuProps() {
    const { uid } = this.asProps;

    return {
      id: `igc-select-${uid}-list`,
      role: 'listbox',
      'aria-flowto': `igc-select-${uid}-trigger`,
    };
  }

  getOptionProps(props) {
    const { value, uid } = this.asProps;
    const selected = isSelectedOption(value, props.value);
    const other = {};
    this._optionSelected = selected;

    if (selected && !this.isScrolledToFirstOption) {
      other.ref = this.firstSelectedOptionRef;
      this.isScrolledToFirstOption = true;
    }

    return {
      selected,
      'aria-selected': selected ? 'true' : 'false',
      id: `igc-select-${uid}-option-${value}`,
      role: 'option',
      onClick: this.bindHandlerOptionClick(props.value),
      ...other,
    };
  }

  getOptionCheckboxProps(props) {
    const { size } = this.asProps;
    const hasOption = props.value === undefined;
    const optionProps = hasOption ? {} : this.getOptionProps(props);
    const selected = this._optionSelected;
    this._optionSelected = null;
    return {
      ...optionProps,
      size,
      selected,
    };
  }

  getDividerProps() {
    return { my: 1 };
  }

  renderChildrenTrigger(value, options) {
    if (options) {
      return [].concat(value).reduce((acc, value) => {
        const selectedOption = options.find((o) => isSelectedOption(value, o.value));
        if (!selectedOption) return acc;
        if (acc.length) acc.push(', ');
        acc.push(selectedOption.label || selectedOption.value);
        return acc;
      }, []);
    }
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

  handlerClear = (e) => {
    const { value } = this.asProps;
    const emptyValue = getEmptyValue(Array.isArray(value));
    this.handlers.value(emptyValue, e);
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
    if (visible) {
      this.isScrolledToFirstOption = false;

      if (prevProps.visible === undefined) {
        if (prevState.visible !== visible) this.scrollToSelectedOption();
      } else {
        if (prevProps.visible !== visible) this.scrollToSelectedOption();
      }
    }
  }

  render() {
    const { Children, options, multiselect, value, ...other } = this.asProps;
    const advanceMode = findComponent(Children, [
      Select.Trigger.displayName,
      Select.Popper.displayName,
    ]);

    logger.warn(
      options && advanceMode,
      "Don't use at the same time 'options' property and '<Select.Trigger/>/<Select.Popper/>'",
      other['data-ui-name'] || Select.displayName,
    );

    if (options) {
      return (
        <Root render={DropdownMenu}>
          <Select.Trigger {...other} tanIndex={-1} role="button" />
          <Select.Menu>
            {options.map((option, i) => {
              return (
                <Select.Option key={i} id={option.value} aria-selected={value === i} {...option}>
                  {multiselect && <Select.Option.Checkbox />}
                  {option.children}
                </Select.Option>
              );
            })}
          </Select.Menu>
        </Root>
      );
    }

    return (
      <Root render={DropdownMenu}>
        <Children />
      </Root>
    );
  }
}

const isInputTriggerTag = (tag) => {
  if (typeof tag === 'string') return tag.toLowerCase().includes('input');
  if (typeof tag === 'object' && tag !== null && typeof tag.displayName)
    return tag.displayName.toLowerCase().includes('input');
  if (typeof tag === 'object' && tag !== null && typeof tag.render?.displayName)
    return tag.render.displayName.toLowerCase().includes('input');
  return false;
};

function Trigger({ Children, name, uid, value, $hiddenRef, tag: Tag = ButtonTrigger }) {
  const hasInputTrigger = isInputTriggerTag(Tag);

  return (
    <Root
      render={DropdownMenu.Trigger}
      tag={Tag}
      placeholder="Select option"
      aria-autocomplete={hasInputTrigger && 'list'}
      role={hasInputTrigger && 'combobox'}
      aria-activedescendant={hasInputTrigger && value && `igc-select-${uid}-option-${value}`}
    >
      {addonTextChildren(
        Children,
        Tag.Text || ButtonTrigger.Text,
        Tag.Addon || ButtonTrigger.Addon,
      )}
      {name && <input type="hidden" defaultValue={value} name={name} ref={$hiddenRef} />}
    </Root>
  );
}

function Checkbox(props) {
  const [SOptionCheckbox, componentProps] = useBox(props, props.forwardRef);
  const { size, theme, selected } = props;
  const styles = sstyled(props.styles);

  const { className, style } = styles.cn('SOptionCheckbox', {
    size,
    'use:theme': resolveColor(theme),
    checked: selected,
  });

  return (
    <SOptionCheckbox
      {...componentProps}
      className={cn(className, componentProps.className) || undefined}
      style={{ ...style, ...componentProps.style }}
      role="checkbox"
      tabIndex={0}
      aria-checked={selected}
    />
  );
}

const InputSearchWrapper = function () {
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
    Option: [
      DropdownMenu.Item,
      {
        Addon: DropdownMenu.Item.Addon,
        Checkbox,
      },
    ],
    OptionTitle: DropdownMenu.ItemTitle,
    OptionHint: DropdownMenu.ItemHint,
    Divider,
    InputSearch: InputSearchWrapper,
    Input: InputSearchWrapper,
  },
  { parent: DropdownMenu, context: selectContext },
);

export default Select;
