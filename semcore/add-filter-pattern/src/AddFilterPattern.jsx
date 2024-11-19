import React, { forwardRef } from 'react';
import { Flex } from '@semcore/flex-box';
import Button, { ButtonLink } from '@semcore/button';
import MathPlusM from '@semcore/icon/MathPlus/m';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import CloseM from '@semcore/icon/Close/m';
import { findAllComponents } from '@semcore/utils/lib/findComponent';

const isEscapeKeyDown = (e) => {
  return e.key === 'Escape';
};

const getDefaultAddDropDownItems = (props) => {
  return props.children
    .flat()
    .map(({ props: { alwaysVisible, name, displayName } }) => {
      if (alwaysVisible) {
        return;
      }
      const value = name;
      const label = displayName ?? name;

      return { label, value };
    })
    .filter((v) => v);
};

class RootAddFilterPattern extends Component {
  static displayName = 'AddFilterPattern';

  constructor(props) {
    super(props);

    this.getDefaultAddDropDownItems = () => getDefaultAddDropDownItems(props);
    this.selectMenuRefs = new Map();

    this.state = {
      visibleFilters: new Set(),
      addDropDownItems: this.getDefaultAddDropDownItems(),
      filterData: {},
    };
  }

  getItemProps(props) {
    const { placeholder, name, displayName, alwaysVisible } = props;

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
    const selectProps = {
      onKeyDown: (e) => {
        if (isEscapeKeyDown(e) && !value) {
          onClear();
          hideField();
        }
      },
      onBlur: (e) => {
        const ref = this.selectMenuRefs.get(name);
        if (!ref) {
          return;
        }

        if (
          !value &&
          !this.selectMenuRefs
            .get(name)
            ?.closest('[data-ui-name="DropdownMenu.Popper"]')
            ?.contains(e.relatedTarget)
        ) {
          hideField();
          onClear();
        }
      },
    };

    return {
      key: name,
      name,
      placeholder,
      value,
      displayName: displayName ?? name,
      onClear,
      onChange: (v) => {
        this.setState({
          filterData: { ...this.state.filterData, [name]: v },
        });
      },
      selectMenuRef: (domNode) => {
        this.selectMenuRefs.set(name, domNode);
      },
      selectProps,
    };
  }

  clearAll() {
    this.setState({
      filterData: {},
      visibleFilters: new Set(),
    });
  }

  toggleFieldVisibility(name, status = true) {
    const visibleFilters = new Set(Array.from(this.state.visibleFilters));
    if (status) {
      visibleFilters.add(name);
    } else {
      visibleFilters.delete(name);
    }

    this.setState({ visibleFilters });
  }

  getDropDownMenuProps() {
    return {
      options: this.state.addDropDownItems,
      toggleFieldVisibility: (name, status) => this.toggleFieldVisibility(name, status),
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
    const AlwaysVisibleFiltersChildren = findAllComponents(Children, [
      'AddFilterPattern.Item',
    ]).filter(({ props }) => {
      return props.alwaysVisible;
    });

    const AllHideableItems = findAllComponents(Children, ['AddFilterPattern.Item']).filter(
      ({ props }) => {
        return !props.alwaysVisible;
      },
    );
    const VisibleFiltersChildren = Array.from(this.state.visibleFilters).map((name) => {
      return AllHideableItems.find(({ props }) => props.name === name);
    });

    return (
      <Root render={Flex}>
        {AlwaysVisibleFiltersChildren}
        {VisibleFiltersChildren}
        <AddFilterPattern.DropDownMenu />
        <AddFilterPattern.Clear />
      </Root>
    );
  }
}

function FilterPatternItem(props) {
  const [autoFocus, setAutoFocus] = React.useState();
  React.useEffect(() => {
    setAutoFocus(true);
    setSelectVisible(true);
  }, []);

  const [selectVisible, setSelectVisible] = React.useState(true);
  const onVisibleChange = React.useCallback((visible) => {
    if (visible === false) {
      setAutoFocus(false);
    }
    setSelectVisible(visible);
  }, []);

  const { Children } = props;
  const itemProps = {
    ...props,
    onVisibleChange,
    shouldAutoFocus: autoFocus,
    selectVisible,
  };

  return typeof Children.origin === 'function' && Children.origin(itemProps);
}

function AddFilterDropDown(props) {
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

function Clear({ filterData = {}, clearAll }) {
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

const AddFilterPattern = createComponent(RootAddFilterPattern, {
  Item: FilterPatternItem,
  DropDownMenu: AddFilterDropDown,
  Clear,
});

export default AddFilterPattern;
