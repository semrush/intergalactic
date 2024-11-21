import React from 'react';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import MathPlusM from '@semcore/icon/MathPlus/m';
import CloseM from '@semcore/icon/Close/m';
import FilterPatternType, {
  AddFilterPatternDropdownOptions,
  AddFilterPatternSelectProps,
  AddFilterPatternProps,
  AddFilterPatternState,
  ClearButtonProps,
  AddFilterDropdownMenuProps,
  AddFilterPatternSearchProps,
  AddFilterPatternItemProps,
  AddFilterPatternDropdownProps,
} from './AddFilterPattern.types';
import AddFilterPatternSelect from './components/AddFilterPatternSelect';
import AddFilterPatternSearch from './components/AddFilterPatternSearch';
import AddFilterPatternDropdown from './components/AddFilterPatternDropdown';
import { findAllComponents } from '@semcore/utils/lib/findComponent';

// todo: fix types
const getDefaultAddDropdownItems = (props: AddFilterPatternProps) => {
  return (props.children as any)
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
    .filter((v?: AddFilterPatternDropdownOptions) => v);
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

  getSelectProps(props: AddFilterPatternItemProps): AddFilterPatternSelectProps {
    const { name, displayName, alwaysVisible, ...rest } = props;
    const hideField = () => {
      if (alwaysVisible) {
        return;
      }
      this.toggleFieldVisibility(name, false);
    };

    const onClear = () => {
      this.setState({
        filterData: { ...this.state.filterData, [name]: null },
      });

      hideField();
    };

    const value = this.state.filterData[name];

    return {
      ...rest,
      value,
      name,
      displayName: displayName ?? name,
      onClear,
      onChange: (v: any) => {
        this.setState({
          filterData: { ...this.state.filterData, [name]: v },
        });
      },
    };
  }

  getSearchProps(props: AddFilterPatternItemProps): AddFilterPatternSearchProps {
    const { name, displayName, alwaysVisible, onChange, ...rest } = props;
    const value = this.state.filterData[name];

    const hideField = () => {
      if (alwaysVisible) {
        return;
      }
      this.toggleFieldVisibility(name, false);
    };

    const onClear = () => {
      this.setState({
        filterData: { ...this.state.filterData, [name]: '' },
      });

      hideField();
    };

    let valueProps = {
      value: this.state.filterData[name],
      onChange: (v: any) => {
        this.setState({
          filterData: { ...this.state.filterData, [name]: v },
        });
      },
    };

    if (!alwaysVisible) {
      valueProps = {
        onBlur(e) {
          if (!value) {
            hideField();
          }
        },
        onKeyDown(e) {
          if (e.key === 'Escape') {
            hideField();
          }
        },
        autoFocus: !alwaysVisible,
        ...valueProps,
      };
    }

    return {
      ...rest,
      onClear,
      valueProps,
    };
  }

  getDropdownProps(props: AddFilterPatternItemProps): AddFilterPatternDropdownProps {
    const { name, empty, alwaysVisible, displayName, ...rest } = props;
    const hideField = () => {
      if (alwaysVisible) {
        return;
      }
      this.toggleFieldVisibility(name, false);
    };

    const onClear = () => {
      this.setState({
        filterData: { ...this.state.filterData, [name]: null },
      });

      hideField();
    };

    const value = this.state.filterData[name];

    return {
      ...rest,
      value,
      name,
      empty,
      displayName: displayName ?? name,
      onClear,
      onChange: (v: any) => {
        this.setState({
          filterData: { ...this.state.filterData, [name]: v },
        });
      },
    };
  }

  clearAll() {
    this.setState({
      filterData: {},
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
      <Button use='tertiary' theme='muted' addonLeft={CloseM} ml='auto' onClick={clearAll}>
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
