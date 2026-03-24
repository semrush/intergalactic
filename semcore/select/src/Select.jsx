import { hideScrollBarsFromScreenReadersContext, useBox, isInputTriggerTag } from '@semcore/base-components';
import { ButtonTrigger } from '@semcore/base-trigger';
import { createComponent, Root, sstyled, lastInteraction } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import findComponent, { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import logger from '@semcore/core/lib/utils/logger';
import Divider from '@semcore/divider';
import Dropdown, { AbstractDropdown, enhance, selectedIndexContext } from '@semcore/dropdown';
import DropdownMenu from '@semcore/dropdown-menu';
import { Text } from '@semcore/typography';
import cn from 'classnames';
import React from 'react';

import { selectContext } from './context';
import InputSearch from './InputSearch';
import style from './style/select.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

function isSelectedOption(value, valueOption) {
  return Array.isArray(value) ? value.includes(valueOption) : valueOption === value;
}

function isEmptyValue(value) {
  return Array.isArray(value) ? value.length === 0 : value === null;
}

function getEmptyValue(multiselect) {
  return multiselect ? [] : null;
}

const ListBoxContextProvider = ({ children }) => (
  <hideScrollBarsFromScreenReadersContext.Provider value={true}>
    {children}
  </hideScrollBarsFromScreenReadersContext.Provider>
);

class RootSelect extends AbstractDropdown {
  static displayName = 'Select';

  static style = style;
  static enhance = Object.values(enhance).concat([resolveColorEnhance()]);

  static defaultProps = (props) => {
    const hasInputSearch =
      props.children && isAdvanceMode(props.children, [
        Select.InputSearch.displayName,
        InputSearch.displayName,
      ], true);
    const defaultIndex = hasInputSearch ? null : 0;

    return {
      placeholder: props.multiselect ? 'Select options' : 'Select option',
      size: 'm',
      defaultValue: getEmptyValue(props.multiselect),
      defaultVisible: false,
      defaultHighlightedIndex: props.highlightedIndex ?? defaultIndex,
      defaultSelectedIndex: props.selectedIndex ?? defaultIndex,
      scrollToSelected: true,
      i18n: localizedMessages,
      locale: 'en',
      interaction: props.interaction ?? 'click',
      inlineActions: false,
      timeout: props.timeout ?? 0,
    };
  };

  role = 'listbox';

  itemRef(props, index, node) {
    super.itemRef(props, index, node);

    const { highlightedIndex } = this.asProps;
    const isHighlighted = index === highlightedIndex;

    if (isHighlighted) {
      this.scrollToNode(node);
    }
  }

  uncontrolledProps() {
    return {
      ...super.uncontrolledProps(),
      visible: [
        null,
        (visible) => {
          if (visible === true) {
            const hasInputSearch = isAdvanceMode(
              this.asProps.Children,
              [
                Select.InputSearch.displayName,
                InputSearch.displayName,
              ],
              true,
            );

            const defaultIndex = hasInputSearch || lastInteraction.isMouse()
              ? null
              : this.props.defaultHighlightedIndex;

            this.handlers.highlightedIndex(defaultIndex);

            setTimeout(() => {
              const options = this.menuRef.current?.querySelectorAll('[role="option"]');
              const selected = this.menuRef.current?.querySelector('[aria-selected="true"]');

              if (selected && options) {
                this.scrollToNode(selected);

                for (let i = 0; i < options.length; i++) {
                  if (options[i] === selected) {
                    this.handlers.highlightedIndex(i);
                    break;
                  }
                }
              }
              // for some reason, Google Chrome optimizes this timeout with 0 value with previous render (when we set aria-selected)
              // and that's why its skip scrollToNodes. We selected the appropriate timeout manually.
            }, 30);
          }
        },
      ],
      value: null,
    };
  }

  getTriggerProps() {
    const {
      disabled,
      visible,
      state,
      placeholder,
      value,
      options,
      forwardRef,
      name,
      multiselect,
      getI18nText,
      highlightedIndex,
      uid,
      Children,
      children: hasChildren,
    } = this.asProps;

    const isMenu = isAdvanceMode(Children, [Select.Menu.displayName], true) || !hasChildren;
    const ariaControls = isMenu ? `igc-${uid}-list` : `igc-${uid}-popper`;

    return {
      ...super.getTriggerProps(),
      'onKeyDown': callAllEventHandlers(
        this.handlePreventCommonKeyDown.bind(this),
        this.handleOpenKeyDown.bind(this),
        this.handleArrowKeyDown.bind(this),
      ),
      'aria-controls': visible ? ariaControls : undefined,
      'aria-haspopup': isMenu ? 'listbox' : 'dialog',
      'aria-disabled': disabled ? 'true' : 'false',
      'aria-activedescendant':
        visible && highlightedIndex !== null && this.itemRefs[highlightedIndex]
          ? `igc-${uid}-option-${highlightedIndex}`
          : undefined,
      'empty': isEmptyValue(value),
      value,
      name,
      '$hiddenRef': forwardRef,
      multiselect,
      state,
      placeholder,
      disabled,
      'active': visible,
      'onClear': this.handlerClear,
      'children': this.renderChildrenTrigger(value, options),
      getI18nText,

      'onBlur': () => {
        // if popper is opened and we moved from the trigger in select - it means we moved on some controls in popper and should hide highlighted for the option
        if (this.asProps.visible) {
          this.prevHighlightedIndex = this.asProps.highlightedIndex;
          this.handlers.highlightedIndex(null);
        }
      },
      'onFocus': () => {
        // if popper is opened and we moved to the trigger in select - it means we moved from some controls in popper and should highlight the last highlighted option
        if (this.asProps.visible) {
          const index = this.prevHighlightedIndex;
          this.handlers.highlightedIndex(index);
        }
      },
    };
  }

  getListProps() {
    const { multiselect } = this.asProps;

    return {
      ...super.getListProps(),
      'aria-multiselectable': multiselect ? 'true' : undefined,
    };
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      onKeyDown: callAllEventHandlers(
        this.handlePreventCommonKeyDown.bind(this),
        this.handlePreventPopperKeyDown.bind(this),
        this.handleArrowKeyDown.bind(this),
      ),
    };
  }

  getOptionProps(props, index) {
    const { value, highlightedIndex, size = 'm' } = this.asProps;
    const highlighted =
      index === highlightedIndex && lastInteraction.isKeyboard() && !props.disabled;
    const selected = props.selected ?? isSelectedOption(value, props.value);

    return {
      ...super.getItemProps(props, index),
      highlighted,
      selected,
      'aria-selected': selected ? 'true' : 'false',
      'aria-disabled': props.disabled ? 'true' : 'false',
      'role': 'option',
      'onClick': this.bindHandlerOptionClick(props.value, index),
      'ref': (node) => this.itemRef(props, index, node),
      size,
    };
  }

  getOptionCheckboxProps() {
    const { size, resolveColor } = this.asProps;

    return {
      size,
      resolveColor,
    };
  }

  getDividerProps() {
    return { 'my': 1, 'aria-disabled': 'true' };
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

  bindHandlerOptionClick = (optionValue, index) => (e) => {
    let newValue = optionValue;
    const { value, multiselect } = this.asProps;
    if (Array.isArray(value)) {
      if (value.includes(optionValue)) {
        newValue = value.filter((v) => v !== optionValue);
      } else {
        newValue = value.concat(optionValue);
      }
    }
    this.handlers.highlightedIndex(index);
    this.handlers.value(newValue, e);
    if (!multiselect) {
      this.handlers.visible(false);
      e.preventDefault();
    }
  };

  handlerClear = (e) => {
    const { value } = this.asProps;
    const emptyValue = getEmptyValue(Array.isArray(value));
    this.handlers.value(emptyValue, e);
    this.handlers.visible(false);
  };

  render() {
    const { Children, options, multiselect, value: _value, uid, forcedAdvancedMode, ...other } =
      this.asProps;
    const advancedMode =
      forcedAdvancedMode ||
      findComponent(Children, [Select.Trigger.displayName, Select.Popper.displayName]);

    logger.warn(
      options && advancedMode,
      'Don\'t use at the same time \'options\' property and \'<Select.Trigger/>/<Select.Popper/>\'',
      other['data-ui-name'] || Select.displayName,
    );

    this.itemProps = [];

    if (options) {
      return (
        <Root render={DropdownMenu}>
          <Select.Trigger {...other} />
          <Select.Menu>
            {options.map((option, index) => {
              return (
                <Select.Option key={option.value} id={`igc-${uid}-option-${index}`} {...option}>
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

function Trigger({
  Children,
  name,
  value,
  styles,
  $hiddenRef,
  tag: Tag = ButtonTrigger,
  getI18nText,
}) {
  const hasInputTrigger = isInputTriggerTag(Tag);
  const SSelectTrigger = Root;

  return sstyled(styles)(
    <SSelectTrigger
      render={Dropdown.Trigger}
      tag={Tag}
      placeholder={getI18nText('selectPlaceholder')}
      role='combobox'
      aria-autocomplete={(hasInputTrigger && 'list') || undefined}
    >
      {addonTextChildren(
        Children,
        Tag.Text || Tag.Value || ButtonTrigger.Text,
        Tag.Addon || ButtonTrigger.Addon,
        true,
      )}
      {name && <input type='hidden' defaultValue={value} name={name} ref={$hiddenRef} />}
    </SSelectTrigger>,
  );
}

function Menu(props) {
  const {
    visible,
    disablePortal,
    ignorePortalsStacking,
    disableEnforceFocus,
    interaction,
    autoFocus,
    animationsDisabled,
  } = props;
  const popperProps = {
    visible,
    disablePortal,
    ignorePortalsStacking,
    disableEnforceFocus,
    interaction,
    autoFocus,
    animationsDisabled,
  };
  return (
    <ListBoxContextProvider>
      <Select.Popper {...popperProps} role={null}>
        <Root render={Select.List} />
      </Select.Popper>
    </ListBoxContextProvider>
  );
}

const optionPropsContext = React.createContext({});
function Option(props) {
  const SSelectOption = Root;
  const { styles, Children, highlighted } = props;
  const itemRef = React.useRef(null);

  const hasCheckbox = isAdvanceMode(Children, [Select.Option.Checkbox.displayName]);
  const hasContent = isAdvanceMode(Children, [Select.Option.Content.displayName]);

  const optionPropsContextValue = {
    ...props,
    itemRef,
    highlighted,
  };

  return sstyled(styles)(
    <SSelectOption render={Dropdown.Item} ref={itemRef}>
      <optionPropsContext.Provider value={optionPropsContextValue}>
        {hasCheckbox && !hasContent
          ? (
              <Select.Option.Content>
                <Children />
              </Select.Option.Content>
            )
          : (
              <Children />
            )}
      </optionPropsContext.Provider>
    </SSelectOption>,
  );
}

function Checkbox(providedProps) {
  const optionProps = React.useContext(optionPropsContext);
  const props = React.useMemo(
    () => ({
      selected: optionProps?.selected,
      disabled: optionProps?.disabled,
      size: optionProps?.size,
      ...(providedProps || {}),
    }),
    [providedProps, optionProps],
  );
  const [SOptionCheckbox, componentProps] = useBox(props, props.forwardRef);
  const { size, theme, selected, resolveColor, indeterminate } = props;
  const styles = sstyled(props.styles);

  const { className, style } = styles.cn('SOptionCheckbox', {
    size,
    'use:theme': resolveColor(theme),
    indeterminate,
    selected,
  });

  return (
    <SOptionCheckbox
      {...componentProps}
      className={cn(className, componentProps.className) || undefined}
      style={{ ...style, ...componentProps.style }}
      tabIndex={-1}
    />
  );
}

function OptionText(providedProps) {
  const optionProps = React.useContext(optionPropsContext);
  const selectedIndex = React.useContext(selectedIndexContext);
  const props = React.useMemo(
    () => ({
      key: optionProps?.id,
      selected: optionProps?.selected,
      disabled: optionProps?.disabled,
      size: optionProps?.size,
      ...(providedProps || {}),
    }),
    [providedProps, optionProps],
  );

  return sstyled(props.styles)(
    <Text
      {...props}
      hint:triggerRef={optionProps.itemRef}
      hint:visible={selectedIndex === optionProps.index}
      hint:placement='right'
    />,
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
    Popper: Dropdown.Popper,
    List: DropdownMenu.List,
    Menu: Menu,
    Option: [
      Option,
      {
        Addon: DropdownMenu.Item.Addon,
        Content: DropdownMenu.Item.Content,
        Text: OptionText,
        Hint: DropdownMenu.Item.Hint,
        Checkbox,
      },
    ],
    Group: Dropdown.Group,
    Divider,
    InputSearch: [InputSearchWrapper, InputSearch._______childrenComponents],
    Input: [InputSearchWrapper, InputSearch._______childrenComponents],
  },
  { parent: DropdownMenu, context: selectContext },
);

export const wrapSelect = (wrapper) => wrapper;
Select.selectedIndexContext = selectedIndexContext;

export default Select;
