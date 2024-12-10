import React from 'react';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import createComponent, { Component, Root } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import MathPlusM from '@semcore/icon/MathPlus/m';
import CloseM from '@semcore/icon/Close/m';
import AddFilterPatternType, {
  AddFilterPatternProps,
  AddFilterPatternItemProps,
} from './AddFilterPattern.types';
import AddFilterPatternSelect from './components/AddFilterPatternSelect';
import AddFilterPatternInput from './components/AddFilterPatternInput';
import AddFilterPatternDropdown from './components/AddFilterPatternDropdown';
import { findAllComponents } from '@semcore/utils/lib/findComponent';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

type AddFilterPatternDropdownOption = { label: string; value: string };
type AddFilterDropdownMenuProps = {
  options: AddFilterPatternDropdownOption[];
  toggleFieldVisibility: (name: string, status?: boolean) => void;
  visibleFilters: Set<string>;
  getI18nText: (key: string) => string;
};

type ClearAllFiltersButtonProps = {
  hasFilterData: boolean;
  clearAll: () => void;
  getI18nText: (key: string) => string;
};

type AddFilterPatternState = {
  visibleFilters: Set<string>;
  addDropdownItems: AddFilterPatternDropdownOption[];
};

const componentsNames = [
  'AddFilterPattern.Input',
  'AddFilterPattern.Select',
  'AddFilterPattern.Dropdown',
];

const enhance = [i18nEnhance(localizedMessages)] as const;
class RootAddFilterPattern extends Component<
  AddFilterPatternProps,
  {},
  AddFilterPatternState,
  typeof enhance
> {
  static displayName = 'AddFilterPattern';

  static enhance = enhance;
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  };

  static getFilterPatternItems = (children: React.ReactNode) => {
    return findAllComponents(children, componentsNames).filter(({ props }) => Boolean(props.name));
  };

  static getDefaultAddDropdownOptions = (children: React.ReactNode) => {
    const filters = RootAddFilterPattern.getFilterPatternItems(children);

    return filters.map(({ props }: { props: AddFilterPatternItemProps }) => {
      const { name, displayName } = props;
      return { label: displayName ?? name, value: name };
    });
  };

  constructor(props: AddFilterPatternProps) {
    super(props);

    this.state = {
      visibleFilters: new Set(),
      addDropdownItems: RootAddFilterPattern.getDefaultAddDropdownOptions(props.children),
    };
  }

  getVisibleFilters(allFilters: React.ReactElement<AddFilterPatternItemProps>[]) {
    return Array.from(this.state.visibleFilters).map((name) => {
      return allFilters.find(({ props }) => props.name === name);
    });
  }

  getItemCommonProps(props: AddFilterPatternItemProps) {
    const { name } = props;
    const { filterData } = this.asProps;

    return {
      value: filterData[name],
      onClear: () => {
        this.hideFilter(name);
      },
    };
  }

  getSelectProps(props: AddFilterPatternItemProps) {
    return this.getItemCommonProps(props);
  }

  getInputProps(props: AddFilterPatternItemProps) {
    return this.getItemCommonProps(props);
  }

  getDropdownProps(props: AddFilterPatternItemProps) {
    return this.getItemCommonProps(props);
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
      hasFilterData: Object.values(filterData).filter(Boolean).length > 0,
      clearAll: () => this.clearAll(),
      getI18nText,
    };
  }

  render() {
    const { Children } = this.asProps;
    const allFilters = RootAddFilterPattern.getFilterPatternItems(Children);
    const VisibleFilteredChildren = this.getVisibleFilters(allFilters);

    return (
      <Root render={Flex}>
        {VisibleFilteredChildren}
        <AddFilterPattern.DropdownMenu />
        <AddFilterPattern.ClearAllFilters />
      </Root>
    );
  }
}

function AddFilterDropdownMenu(props: AddFilterDropdownMenuProps) {
  const { options, toggleFieldVisibility, visibleFilters, getI18nText } = props;
  const [visible, setVisible] = React.useState(false);

  const optionsWithoutVisible = React.useMemo(() => {
    return options.filter((filter) => {
      return !Array.from(visibleFilters).includes(filter.value);
    });
  }, [options, visibleFilters]);

  return (
    Boolean(optionsWithoutVisible.length) && (
      <DropdownMenu visible={visible} onVisibleChange={setVisible}>
        <DropdownMenu.Trigger tag={Button} use='tertiary' addonLeft={MathPlusM}>
          {getI18nText('AddFilterPattern.DropdownTrigger.Text')}
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
    )
  );
}

function ClearAllFilters({ hasFilterData, clearAll, getI18nText }: ClearAllFiltersButtonProps) {
  return (
    hasFilterData && (
      <Button use='tertiary' theme='muted' addonLeft={CloseM} ml='auto' onClick={clearAll}>
        {getI18nText('AddFilterPattern.Button.Text')}
      </Button>
    )
  );
}

const AddFilterPattern: typeof AddFilterPatternType = createComponent(RootAddFilterPattern, {
  Select: AddFilterPatternSelect,
  Input: AddFilterPatternInput,
  Dropdown: AddFilterPatternDropdown,
  DropdownMenu: AddFilterDropdownMenu,
  ClearAllFilters,
});

export default AddFilterPattern;
