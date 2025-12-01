import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import type { SelectProps } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type SelectComponentConfigProps = SelectProps & {
  // Main props
  labelText?: string;
  showLabel?: boolean;
  optionCount?: number;

  // Trigger props
  triggerPlaceholder?: string;
  triggerSize?: 'm' | 'l';
  triggerDisabled?: boolean;
  triggerState?: 'normal' | 'valid' | 'invalid';
  triggerLoading?: boolean;

  // Popper props
  popperPlacement?: 'top' | 'bottom' | 'left' | 'right';
  popperFlip?: boolean;
  popperOffset?: number;
  popperArrow?: boolean;
  popperModifiers?: any[];

  // Menu props
  menuSize?: 'm' | 'l';
  menuW?: string | number;
  menuMaxH?: string | number;

  // List props
  listSize?: 'm' | 'l';

  // InputSearch props
  showInputSearch?: boolean;
  inputSearchPlaceholder?: string;
  inputSearchSize?: 'm' | 'l';
};

const Demo = (props: SelectComponentConfigProps) => {
  const {
    labelText = 'Select with component configuration',
    showLabel = true,
    optionCount = 6,

    // Trigger
    triggerPlaceholder = 'Select option',
    triggerSize = 'm',
    triggerDisabled = undefined,
    triggerState = undefined,
    triggerLoading = undefined,

    // Popper
    popperPlacement = undefined,
    popperFlip = undefined,
    popperOffset = undefined,
    popperArrow = undefined,
    popperModifiers = undefined,

    // Menu
    menuSize = 'm',
    menuW = 200,
    menuMaxH = 180,

    // List
    listSize = 'm',

    // InputSearch
    showInputSearch = false,
    inputSearchPlaceholder = 'Search...',
    inputSearchSize = 'm',

    ...restProps
  } = props;

  const [value, setValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');

  const options = Array(optionCount)
    .fill('')
    .map((_, index) => ({
      value: index,
      label: `Option ${index}`,
      children: `Option ${index}`,
    }));

  const filteredOptions = showInputSearch
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : options;

  return (
    <Flex direction='column'>
      {showLabel && (
        <Text tag='label' size={200} htmlFor='component-config-select'>
          {labelText}
        </Text>
      )}
      <Select
        value={value}
        onChange={setValue}
        mt={showLabel ? 2 : 0}
        {...restProps}
      >
        <Select.Trigger
          placeholder={triggerPlaceholder}
          mr='auto'
          size={triggerSize}
          disabled={triggerDisabled}
          state={triggerState}
          loading={triggerLoading}
          id='component-config-select'
        />
        <Select.Popper
          placement={popperPlacement}
          flip={popperFlip}
          offset={popperOffset}
          arrow={popperArrow}
          modifiers={popperModifiers}
        >
          {showInputSearch && (
            <Select.InputSearch
              value={searchValue}
              onChange={setSearchValue}
              size={inputSearchSize}
            >
              <Select.InputSearch.SearchIcon />
              <Select.InputSearch.Value placeholder={inputSearchPlaceholder} />
              {searchValue && <Select.InputSearch.Clear />}
            </Select.InputSearch>
          )}
          <Select.Menu size={menuSize} w={menuW}>
            <Select.List size={listSize} maxH={menuMaxH}>
              {filteredOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.children}
                </Select.Option>
              ))}
              {filteredOptions.length === 0 && (
                <Select.Option value='no-results' disabled>
                  No results found
                </Select.Option>
              )}
            </Select.List>
          </Select.Menu>
        </Select.Popper>
      </Select>
    </Flex>
  );
};

export const defaultProps: SelectComponentConfigProps = {
  labelText: 'Select with component configuration',
  showLabel: true,
  optionCount: 6,

  // Trigger
  triggerPlaceholder: 'Select option',
  triggerSize: 'm',
  triggerDisabled: undefined,
  triggerState: undefined,
  triggerLoading: undefined,

  // Popper
  popperPlacement: undefined,
  popperFlip: undefined,
  popperOffset: undefined,
  popperArrow: undefined,
  popperModifiers: undefined,

  // Menu
  menuSize: 'm',
  menuW: 200,
  menuMaxH: 180,

  // List
  listSize: 'm',

  // InputSearch
  showInputSearch: false,
  inputSearchPlaceholder: 'Search...',
  inputSearchSize: 'm',
};

Demo.defaultProps = defaultProps;

export default Demo;
