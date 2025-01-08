import React from 'react';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import createComponent, { Component, Root } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import MathPlusM from '@semcore/icon/MathPlus/m';
import CloseM from '@semcore/icon/Close/m';
import AddFilterType, { AddFilterProps, AddFilterItemProps } from './AddFilter.types';
import AddFilterSelect from './components/AddFilterSelect';
import AddFilterInput from './components/AddFilterInput';
import AddFilterDropdown from './components/AddFilterDropdown';
import { findAllComponents } from '@semcore/utils/lib/findComponent';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { SelectProps } from '@semcore/select';

type SelectItemProps = SelectProps & AddFilterItemProps;

type AddFilterDropdownOption = { label: string; value: string };
type AddFilterDropdownMenuProps = {
  options: AddFilterDropdownOption[];
  toggleFieldVisibility: (name: string, status: boolean) => void;
  visibleFilters: Set<string>;
  getI18nText: (key: string) => string;
};

type ClearAllFiltersButtonProps = {
  hasFilterData: boolean;
  clearAll: () => void;
  getI18nText: (key: string) => string;
};

type AddFilterState = {
  visibleFilters: Set<string>;
  addDropdownItems: AddFilterDropdownOption[];
};

class RootAddFilter extends Component<
  AddFilterProps,
  {},
  AddFilterState,
  typeof RootAddFilter.enhance
> {
  AddFilterTrigger = React.createRef<HTMLButtonElement>();
  static displayName = 'AddFilter';
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  };

  static componentsNames = ['AddFilter.Input', 'AddFilter.Select', 'AddFilter.Dropdown'];
  static getFilterPatternItems = (children: React.ReactNode) => {
    return findAllComponents(children, RootAddFilter.componentsNames);
  };

  static getDefaultAddDropdownOptions = (children: React.ReactNode) => {
    const filters = RootAddFilter.getFilterPatternItems(children);

    return filters.map(({ props }: { props: AddFilterItemProps }) => {
      const { name, displayName } = props;
      return { label: displayName ?? name, value: name };
    });
  };

  constructor(props: AddFilterProps) {
    super(props);

    this.state = {
      visibleFilters: new Set(),
      addDropdownItems: RootAddFilter.getDefaultAddDropdownOptions(props.children),
    };
  }

  focusAddFilterTrigger() {
    // waiting for focus ref to appear in dom
    setTimeout(() => {
      this.AddFilterTrigger.current?.focus();
    }, 20);
  }

  getVisibleFilters(allFilters: React.ReactElement<AddFilterItemProps>[]) {
    return Array.from(this.state.visibleFilters).map((name) => {
      return allFilters.find(({ props }) => props.name === name);
    });
  }

  getItemCommonProps(props: AddFilterItemProps) {
    const { name } = props;
    const { filterData } = this.asProps;

    return {
      value: filterData[name],
      onClear: () => {
        this.hideFilter(name);
        this.focusAddFilterTrigger();
      },
    };
  }

  getInputProps(props: AddFilterItemProps) {
    return this.getItemCommonProps(props);
  }

  getDropdownAndSelectProps(props: AddFilterItemProps, isEmpty: () => boolean) {
    const { value, onClear } = this.getItemCommonProps(props);
    return {
      value,
      onClear,
      onVisibleChange: (visible: boolean) => {
        // waiting for filterData update
        setTimeout(() => {
          const { onClear } = this.getItemCommonProps(props);

          if (!visible && isEmpty()) {
            onClear();
          }
        }, 0);
      },
    };
  }

  getSelectProps(props: SelectItemProps) {
    const isEmpty = () => {
      const { multiselect } = props;
      const { value } = this.getItemCommonProps(props);
      return multiselect && Array.isArray(value) ? !value?.length : !value;
    };

    return this.getDropdownAndSelectProps(props, isEmpty);
  }

  getDropdownProps(props: AddFilterItemProps) {
    const isEmpty = () => {
      const { value } = this.getItemCommonProps(props);
      return value == null;
    };
    return this.getDropdownAndSelectProps(props, isEmpty);
  }

  clearAll() {
    this.setState({
      visibleFilters: new Set(),
    });
    this.props.onClearAll();
  }

  toggleFieldVisibility(name: string, status: boolean) {
    const visibleFilters = new Set(Array.from(this.state.visibleFilters));
    if (status) {
      visibleFilters.add(name);
    } else {
      visibleFilters.delete(name);
    }

    this.setState({ visibleFilters });
  }

  hideFilter(name: string) {
    this.toggleFieldVisibility(name, false);
  }

  getDropdownMenuProps() {
    const { getI18nText } = this.asProps;

    return {
      ref: this.AddFilterTrigger,
      options: this.state.addDropdownItems,
      toggleFieldVisibility: (name: string, status: boolean) =>
        this.toggleFieldVisibility(name, status),
      visibleFilters: this.state.visibleFilters,
      getI18nText,
    };
  }

  getClearAllFiltersProps() {
    const { getI18nText, filterData } = this.asProps;

    return {
      hasFilterData:
        Object.values(filterData).filter((value) => (Array.isArray(value) ? value?.length : value))
          .length > 0,
      clearAll: () => {
        this.clearAll();
        this.focusAddFilterTrigger();
      },
      getI18nText,
    };
  }

  render() {
    const { Children } = this.asProps;
    const allFilters = RootAddFilter.getFilterPatternItems(Children);
    const VisibleFilteredChildren = this.getVisibleFilters(allFilters);

    const dropdownProps = this.getDropdownMenuProps();
    const clearAllFiltersProps = this.getClearAllFiltersProps();
    return (
      <Root render={Flex}>
        {VisibleFilteredChildren}
        <AddFilterDropdownMenu {...dropdownProps} />
        <ClearAllFilters {...clearAllFiltersProps} />
      </Root>
    );
  }
}

const AddFilterDropdownMenu = React.forwardRef<HTMLButtonElement, AddFilterDropdownMenuProps>(
  function (props, ref) {
    const { options, toggleFieldVisibility, visibleFilters, getI18nText } = props;
    const [visible, setVisible] = React.useState(false);

    const optionsWithoutVisible = React.useMemo(() => {
      return options.filter((filter) => {
        return !Array.from(visibleFilters).includes(filter.value);
      });
    }, [options, visibleFilters]);

    if (!optionsWithoutVisible.length) {
      return null;
    }

    return (
      <DropdownMenu visible={visible} onVisibleChange={setVisible}>
        <DropdownMenu.Trigger ref={ref} tag={Button} use='tertiary' addonLeft={MathPlusM}>
          {getI18nText('AddFilter.DropdownTrigger.Text')}
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          {optionsWithoutVisible.map(({ label, value }) => (
            <DropdownMenu.Item
              key={value}
              onClick={() => {
                toggleFieldVisibility(value, true);
                setVisible(false);
              }}
            >
              {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Menu>
      </DropdownMenu>
    );
  },
);

function ClearAllFilters({ hasFilterData, clearAll, getI18nText }: ClearAllFiltersButtonProps) {
  return hasFilterData ? (
    <Button use='tertiary' theme='muted' addonLeft={CloseM} ml='auto' onClick={clearAll}>
      {getI18nText('AddFilter.Button.Text')}
    </Button>
  ) : null;
}

const AddFilter: typeof AddFilterType = createComponent(RootAddFilter, {
  Select: AddFilterSelect,
  Input: AddFilterInput,
  Dropdown: AddFilterDropdown,
});

export default AddFilter;
