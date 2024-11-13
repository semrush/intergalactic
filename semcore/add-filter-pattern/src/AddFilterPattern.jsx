import React, { forwardRef } from 'react';
import { Flex } from '@semcore/flex-box';
import Button, { ButtonLink } from '@semcore/button';
import MathPlusM from '@semcore/icon/MathPlus/m';
import createComponent, { Component, sstyled, Root, createBaseComponent } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import CloseM from '@semcore/icon/Close/m';
import { assignProps } from '@semcore/utils/lib/core';

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

const getDefaultVisibleFilters = (props) => {
  const items = props.children
    .flat()
    .map(({ props: { alwaysVisible, name } }) => {
      return alwaysVisible ? name : undefined;
    })
    .filter((v) => v);

  return new Set(items);
};

class RootAddFilterPattern extends Component {
  static displayName = 'AddFilterPattern';

  constructor(props) {
    super(props);

    this.getDefaultAddDropDownItems = () => getDefaultAddDropDownItems(props);
    this.getDefaultVisibleFilters = () => getDefaultVisibleFilters(props);

    this.selectMenuRefs = new Map();

    this.state = {
      visibleFilters: this.getDefaultVisibleFilters(),
      addDropDownItems: this.getDefaultAddDropDownItems(),
      filterData: {},
    };
  }

  getItemProps(props) {
    const { placehoder, name, displayName, alwaysVisible } = props;

    const value = this.state.filterData[name];

    const hideField = () => {
      if (alwaysVisible) {
        return;
      }
      this.toggleFieldVisibility(name, false);
    };

    const onClear = () => {
      const dataTemp = { ...this.state.filterData };
      delete dataTemp[name];

      this.setState({
        filterData: dataTemp,
      });
      hideField();
    };

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
      name,
      placehoder,
      value,
      visible: this.state.visibleFilters.has(name),
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
      visibleFilters: this.getDefaultVisibleFilters(),
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

    return (
      <Root render={Flex}>
        <Children />
        <AddFilterPattern.DropDownMenu />
        <AddFilterPattern.Clear />
      </Root>
    );
  }
}

// todo separate visible from hiddable???
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

  const { Children, visible } = props;
  const itemProps = {
    ...props,
    onVisibleChange,
    shouldAutoFocus: autoFocus,
    selectVisible,
  };

  return (
    visible && (
      <Root render={Flex}>
        {typeof Children.origin === 'function' && Children.origin(itemProps)}
        {/* <Children autoFocus={autoFocus} {...inputProps} /> */}
      </Root>
    )
  );
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
