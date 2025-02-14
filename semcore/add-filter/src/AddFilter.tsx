import React from 'react';
import { Flex, ScreenReaderOnly } from '@semcore/flex-box';
import Button from '@semcore/button';
import { createComponent, Component, Root, lastInteraction } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import MathPlusM from '@semcore/icon/MathPlus/m';
import CloseM from '@semcore/icon/Close/m';
import AddFilterType, { AddFilterProps, AddFilterItemProps } from './AddFilter.types';
import AddFilterSelect from './components/AddFilterSelect';
import AddFilterInput from './components/AddFilterInput';
import AddFilterDropdown from './components/AddFilterDropdown';
import { extractFrom } from '@semcore/core/lib/utils/findComponent';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
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
  clearFiltersMessage: string;
};

class RootAddFilter extends Component<
  AddFilterProps,
  {},
  AddFilterState,
  typeof RootAddFilter.enhance
> {
  addFilterTrigger = React.createRef<HTMLButtonElement>();
  filtersFocusMap: Map<string | undefined, HTMLElement> = new Map();
  clearMessageTimer: ReturnType<typeof setTimeout> | undefined;
  addDropdownItems: AddFilterDropdownOption[];

  static displayName = 'AddFilter';
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  };

  static componentsNames = ['AddFilter.Input', 'AddFilter.Select', 'AddFilter.Dropdown'];
  static getFilterPatternItems = (children: React.ReactNode) => {
    return extractFrom(children, RootAddFilter.componentsNames);
  };

  static getDefaultAddDropdownOptions = (children: React.ReactNode) => {
    const [filters] = RootAddFilter.getFilterPatternItems(children);

    return filters.map(({ props }: { props: AddFilterItemProps }) => {
      const { name, displayName } = props;
      return { label: displayName ?? name, value: name };
    });
  };

  constructor(props: AddFilterProps) {
    super(props);

    this.state = {
      visibleFilters: new Set(),
      clearFiltersMessage: '',
    };

    this.addDropdownItems = RootAddFilter.getDefaultAddDropdownOptions(props.children);
  }

  componentWillUnmount() {
    clearTimeout(this.clearMessageTimer);
  }

  focusFilterAfterItemCleared(name?: string) {
    if (!lastInteraction.isKeyboard()) {
      return;
    }

    const deletedIndex = Array.from(this.state.visibleFilters).findIndex((n) => n === name);
    setTimeout(() => {
      const currentVisibleFiltersList = Array.from(this.state.visibleFilters);
      const focusFilterName = currentVisibleFiltersList.at(deletedIndex);

      const itemToFocus =
        this.filtersFocusMap.get(focusFilterName) ?? this.addFilterTrigger.current;
      itemToFocus?.focus();
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
      name,
      value: filterData[name],
      setFocusRef: (ref: HTMLElement) => {
        this.filtersFocusMap.set(name, ref);
      },
      onClear: () => {
        this.hideFilter(name);
        this.focusFilterAfterItemCleared(name);
      },
    };
  }

  getInputProps(props: AddFilterItemProps) {
    return this.getItemCommonProps(props);
  }

  getDropdownAndSelectProps(props: AddFilterItemProps, isEmpty: () => boolean) {
    const { setFocusRef, value, onClear } = this.getItemCommonProps(props);
    return {
      value,
      onClear,
      setFocusRef,
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
    this.announceClearMessageToSR();

    // waiting for AddFilter button appear in the DOM
    setTimeout(() => {
      this.addFilterTrigger.current?.focus();
    }, 20);
  }

  announceClearMessageToSR() {
    const { getI18nText } = this.asProps;
    const clearFiltersMessage = getI18nText('AddFilter.ScreenReaderMessage.FiltersCleared');
    this.setState({ clearFiltersMessage });

    this.clearMessageTimer = setTimeout(() => {
      this.setState({ clearFiltersMessage: '' });
    }, 300);
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

  getFilterSelectionMenuProps() {
    const { getI18nText } = this.asProps;

    return {
      ref: this.addFilterTrigger,
      options: this.addDropdownItems,
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
      },
      getI18nText,
    };
  }

  render() {
    const { Children } = this.asProps;
    const [filters, persistentFilters] = RootAddFilter.getFilterPatternItems(Children);
    const VisibleFilteredChildren = this.getVisibleFilters(filters);

    const filtersSelectionDropdown = this.getFilterSelectionMenuProps();
    const clearAllFiltersProps = this.getClearAllFiltersProps();
    return (
      <Root render={Flex} gap={2} flexWrap>
        {persistentFilters}
        {VisibleFilteredChildren}
        <AddFilterDropdownMenu {...filtersSelectionDropdown} />
        <ClearAllFilters {...clearAllFiltersProps} />

        <ScreenReaderOnly aria-live='polite' role='status'>
          {this.state.clearFiltersMessage}
        </ScreenReaderOnly>
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
