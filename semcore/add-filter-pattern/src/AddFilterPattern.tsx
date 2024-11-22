import React from 'react';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import MathPlusM from '@semcore/icon/MathPlus/m';
import CloseM from '@semcore/icon/Close/m';
import FilterPatternType, {
  AddFilterPatternSelectProps,
  AddFilterPatternProps,
  AddFilterPatternSearchProps,
  AddFilterPatternItemProps,
  AddFilterPatternDropdownProps,
  AddFilterPatternSearchValueProps,
} from './AddFilterPattern.types';
import AddFilterPatternSelect from './components/AddFilterPatternSelect';
import AddFilterPatternSearch from './components/AddFilterPatternSearch';
import AddFilterPatternDropdown from './components/AddFilterPatternDropdown';
import { findAllComponents } from '@semcore/utils/lib/findComponent';

type AddFilterPatternDropdownOptions = Array<{ label: string; value: string }>;
type AddFilterDropdownMenuProps = {
  options: AddFilterPatternDropdownOptions;
  toggleFieldVisibility: (name: string, status?: boolean) => void;
  visibleFilters: Set<string>;
};

type FilterData = Record<string, any>;
type ClearButtonProps = {
  filterData: FilterData;
  clearAll: () => void;
};

type AddFilterPatternState = {
  visibleFilters: Set<string>;
  addDropdownItems: AddFilterPatternDropdownOptions;
  filterData: FilterData;
};

const getDefaultAddDropdownItems = (
  props: AddFilterPatternProps,
): AddFilterPatternDropdownOptions => {
  const childrenArray: React.ReactNode[] = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return childrenArray
    .flat()
    .map(({ props }: any) => {
      const { alwaysVisible, name, displayName } = props;
      if (alwaysVisible) {
        return;
      }
      const value = name;
      const label = displayName ?? name;

      return { label, value };
    })
    .filter((v) => v);
};

class RootAddFilterPattern extends Component<AddFilterPatternProps, {}, AddFilterPatternState> {
  static displayName = 'AddFilterPattern';
  getDefaultAddDropdownItems: () => AddFilterPatternDropdownOptions;
  selectMenuRefs: Map<string, HTMLElement>;

  constructor(props: AddFilterPatternProps) {
    super(props);
    this.getDefaultAddDropdownItems = () => getDefaultAddDropdownItems(props);
    this.selectMenuRefs = new Map();

    this.state = {
      visibleFilters: new Set(),
      addDropdownItems: this.getDefaultAddDropdownItems(),
      filterData: {},
    };
  }

  setFilterValue(name: string, value: any) {
    this.setState({
      filterData: { ...this.state.filterData, [name]: value },
    });
  }

  getSelectProps(props: AddFilterPatternItemProps): AddFilterPatternSelectProps {
    const { name, displayName, alwaysVisible, ...rest } = props;

    const value = this.state.filterData[name];

    return {
      ...rest,
      value,
      name,
      onClear: () => {
        this.setFilterValue(name, null);
        this.hideFilter(name, alwaysVisible);
      },
      onChange: (v: any) => {
        this.setState({
          filterData: { ...this.state.filterData, [name]: v },
        });
      },
    };
  }

  getSearchProps(props: AddFilterPatternItemProps): AddFilterPatternSearchProps {
    const { name, displayName, alwaysVisible, ...rest } = props;
    const value = this.state.filterData[name];

    let valueProps: AddFilterPatternSearchValueProps = {
      value,
      onChange: (v) => {
        this.setFilterValue(name, v);
      },
    };
    if (!alwaysVisible) {
      valueProps = {
        onBlur: () => {
          if (!value) {
            this.hideFilter(name, alwaysVisible);
          }
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (!value && e.key === 'Escape') {
            this.hideFilter(name, alwaysVisible);
          }
        },
        autoFocus: !alwaysVisible,
        ...valueProps,
      };
    }

    return {
      ...rest,
      onClear: () => {
        this.setFilterValue(name, '');

        this.hideFilter(name, alwaysVisible);
      },
      valueProps,
    };
  }

  getDropdownProps(props: AddFilterPatternItemProps): AddFilterPatternDropdownProps {
    const { name, alwaysVisible, displayName, ...rest } = props;

    const value = this.state.filterData[name];

    return {
      ...rest,
      value,
      name,
      onClear: () => {
        this.setFilterValue(name, null);
        this.hideFilter(name, alwaysVisible);
      },
      onChange: (v: any) => {
        this.setFilterValue(name, v);
      },
    };
  }

  clearAll() {
    const filterData: FilterData = {};
    Object.entries(this.state.filterData).forEach(([key, value]: [string, any]) => {
      filterData[key] = typeof value === 'string' ? '' : value;
    });
    this.setState({
      filterData,
      visibleFilters: new Set(),
    });
  }

  toggleFieldVisibility(name: string, status = true) {
    const visibleFilters = new Set(Array.from(this.state.visibleFilters));
    if (status) {
      visibleFilters.add(name);
    } else {
      visibleFilters.delete(name);
    }

    this.setState({ visibleFilters });
  }

  hideFilter(name: string, alwaysVisible?: boolean) {
    if (alwaysVisible) {
      return;
    }
    this.toggleFieldVisibility(name, false);
  }

  getDropdownMenuProps() {
    return {
      options: this.state.addDropdownItems,
      toggleFieldVisibility: (name: string, status: boolean) =>
        this.toggleFieldVisibility(name, status),
      visibleFilters: this.state.visibleFilters,
    };
  }

  getClearProps() {
    return {
      filterData: this.state.filterData,
      clearAll: this.clearAll.bind(this),
    };
  }

  render() {
    const { Children } = this.asProps;
    const componentsNames = [
      'AddFilterPattern.Search',
      'AddFilterPattern.Select',
      'AddFilterPattern.Dropdown',
    ];

    const AlwaysVisibleFiltersChildren = findAllComponents(Children, componentsNames).filter(
      ({ props }: { props: AddFilterPatternItemProps }) => props.alwaysVisible,
    );

    const AllHideableItems = findAllComponents(Children, componentsNames).filter(
      ({ props }: { props: AddFilterPatternItemProps }) => {
        return !props.alwaysVisible;
      },
    );
    const VisibleFiltersChildren = Array.from(this.state.visibleFilters).map((name) => {
      return AllHideableItems.find(
        ({ props }: { props: AddFilterPatternItemProps }) => props.name === name,
      );
    });

    return (
      <Root render={Flex}>
        {AlwaysVisibleFiltersChildren}
        {VisibleFiltersChildren}
        <AddFilterPattern.DropdownMenu />
        <AddFilterPattern.Clear />
      </Root>
    );
  }
}

function AddFilterDropdown(props: AddFilterDropdownMenuProps) {
  const { options = [], toggleFieldVisibility, visibleFilters } = props;
  const [addFilterVisible, setAddFilterVisible] = React.useState(false);

  const optionsWithourVisible = React.useMemo(() => {
    return options.filter((filter) => {
      return !Array.from(visibleFilters).includes(filter.value);
    });
  }, [options, visibleFilters]);

  return (
    Boolean(optionsWithourVisible.length) && (
      <DropdownMenu visible={addFilterVisible} onVisibleChange={setAddFilterVisible}>
        <DropdownMenu.Trigger tag={Button} use='tertiary' addonLeft={MathPlusM}>
          Add filter
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          {optionsWithourVisible.map(({ label, value }) => (
            <DropdownMenu.Item
              key={value}
              onClick={() => {
                toggleFieldVisibility(value);
                setAddFilterVisible(false);
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

function Clear({ filterData = {}, clearAll }: ClearButtonProps) {
  const hasFilterData = React.useMemo(() => {
    return Object.values(filterData).filter((v) => v).length > 0;
  }, [filterData]);

  return (
    hasFilterData && (
      <Button
        use='tertiary'
        theme='muted'
        addonLeft={CloseM}
        ml='auto'
        title='Clear filters'
        onClick={clearAll}
      >
        Clear filters
      </Button>
    )
  );
}

const AddFilterPattern: typeof FilterPatternType = createComponent(RootAddFilterPattern, {
  Select: AddFilterPatternSelect,
  Search: AddFilterPatternSearch,
  Dropdown: AddFilterPatternDropdown,
  DropdownMenu: AddFilterDropdown,
  Clear,
});

export default AddFilterPattern;
